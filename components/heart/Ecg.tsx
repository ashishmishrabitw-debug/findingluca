"use client"

import { useEffect, useRef } from "react"
import { onBeat, startRhythm } from "./rhythm"
import { useReducedMotion } from "./useReducedMotion"

/** Seconds for the pen to sweep once across the bar. */
const SWEEP_SECONDS = 4

/**
 * The trace shows the signal this many seconds late. Two reasons: the P wave
 * starts about 0.2 s before the R spike, so a beat has to be known before
 * its P wave can be drawn; and in a real heart the electrical spike comes
 * first and the squeeze follows, so the R wave lands as the navbar heart
 * reaches its first swell.
 */
const DELAY = 0.22

/** Corrected QT interval (Bazett), seconds. 0.40 s is a typical normal. */
const QTC = 0.4

type Wave = { at: number; height: number; rise: number; fall: number }

/**
 * One lead II heartbeat, as a sum of smooth bumps (the approach of
 * McSharry et al., 2003). Times are seconds from the R peak, heights are
 * relative to R. At 60 a minute this gives:
 * - P wave: 0.1 s wide, about 0.15 of R, ending in a flat PR segment
 *   (PR interval about 0.16 s)
 * - QRS: about 0.09 s, a small Q dip, tall R, short S below the line
 * - ST segment flat, then an asymmetric T wave (slow rise, quicker fall)
 *   ending about 0.4 s after the QRS began
 * Faster rates shorten the QT by √RR (Bazett), so at speed the T wave
 * crowds towards the next P, as it does on a real monitor.
 */
function beatWaves(rr: number): Wave[] {
  const qtScale = Math.sqrt(rr)
  const prScale = 0.85 + 0.15 * Math.min(1, rr)
  const t = (QTC * qtScale) / 0.4
  return [
    { at: -0.165 * prScale, height: 0.15, rise: 0.024, fall: 0.024 },
    { at: -0.026, height: -0.12, rise: 0.008, fall: 0.007 },
    { at: 0, height: 1, rise: 0.0095, fall: 0.0105 },
    { at: 0.026, height: -0.24, rise: 0.008, fall: 0.011 },
    { at: 0.27 * t, height: 0.3, rise: 0.06 * t, fall: 0.034 * t },
  ]
}

function waveAt(dt: number, w: Wave) {
  const width = dt < w.at ? w.rise : w.fall
  const z = (dt - w.at) / width
  return z * z > 40 ? 0 : w.height * Math.exp(-0.5 * z * z)
}

/**
 * A thin cyan ECG trace along the bottom of the top bar. Like a bedside
 * monitor, an invisible pen sweeps left to right writing the new trace over
 * the old one, so the line is always unbroken: behind the pen is this
 * sweep, ahead of it is the last one.
 */
export default function Ecg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx || reduced) return

    let width = 0
    let height = 0
    /** The trace, one value per CSS pixel column, as a fraction of R. */
    let trace = new Float32Array(0)
    /** Where the pen is, in CSS pixels from the left. */
    let pen = 0
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.lineJoin = "round"
      ctx.lineCap = "round"
      const next = new Float32Array(Math.max(1, Math.ceil(width)))
      next.set(trace.subarray(0, next.length))
      trace = next
      pen = Math.min(pen, width)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    // Recent beats: when the R peak falls (seconds) and that beat's waves.
    let beats: { r: number; waves: Wave[] }[] = []
    const stopRhythm = startRhythm()
    const offBeat = onBeat(({ interval }) => {
      const rr = Math.min(1.2, Math.max(0.3, interval))
      beats.push({ r: performance.now() / 1000, waves: beatWaves(rr) })
    })

    const signal = (time: number) => {
      let v = 0
      for (const beat of beats) {
        const dt = time - beat.r
        if (dt < -0.3 || dt > 0.8) continue
        for (const w of beat.waves) v += waveAt(dt, w)
      }
      return v
    }

    let frame = 0
    let last = performance.now() / 1000
    const draw = () => {
      const clock = performance.now() / 1000
      const dt = Math.min(clock - last, 0.1)
      last = clock
      const now = clock - DELAY
      const columns = trace.length

      if (width > 0) {
        const speed = width / SWEEP_SECONDS
        beats = beats.filter((b) => b.r > now - 2)

        // Write every column the pen passed this frame, each at the moment
        // the pen crossed it, wrapping back to the left edge.
        const from = Math.floor(pen)
        pen += speed * dt
        const to = Math.floor(pen)
        for (let c = from + 1; c <= to; c++) {
          trace[c % columns] = signal(now - (pen - c) / speed)
        }
        pen %= columns

        ctx.clearRect(0, 0, width, height)
        const baseline = height * 0.72
        const scale = height * 0.6
        ctx.beginPath()
        for (let c = 0; c < columns; c++) {
          const y = baseline - scale * trace[c]
          if (c === 0) ctx.moveTo(c, y)
          else ctx.lineTo(c, y)
        }
        // A wide faint stroke under a thin bright one reads as phosphor
        // glow, and is much cheaper than a canvas shadow every frame.
        ctx.strokeStyle = "rgb(0 229 255 / 0.22)"
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.strokeStyle = "rgb(0 229 255 / 0.9)"
        ctx.lineWidth = 1.1
        ctx.stroke()
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      offBeat()
      stopRhythm()
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-5 w-full opacity-70"
    />
  )
}
