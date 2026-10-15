"use client"

import { useEffect, useRef } from "react"
import { onBeat, startRhythm } from "./rhythm"
import { useReducedMotion } from "./useReducedMotion"

/** Seconds for the trace to sweep once across the bar. */
const SWEEP_SECONDS = 4
/** Width of the blank gap ahead of the sweep, in CSS pixels. */
const GAP = 14

/**
 * One heartbeat on the trace, for u from 0 to 1 across its length:
 * a small P wave, the sharp QRS spike, then a T wave. Returns height as a
 * fraction of the spike.
 */
function waveform(u: number) {
  const bump = (from: number, to: number, height: number) =>
    u >= from && u <= to
      ? height * Math.sin((Math.PI * (u - from)) / (to - from))
      : 0
  const line = (from: number, to: number, a: number, b: number) =>
    u >= from && u <= to ? a + ((b - a) * (u - from)) / (to - from) : null

  if (u < 0 || u > 1) return 0
  return (
    bump(0, 0.12, 0.12) +
    (line(0.2, 0.24, 0, -0.12) ??
      line(0.24, 0.3, -0.12, 1) ??
      line(0.3, 0.36, 1, -0.28) ??
      line(0.36, 0.42, -0.28, 0) ??
      0) +
    bump(0.52, 0.78, 0.24)
  )
}

/**
 * A thin cyan ECG trace along the bottom of the top bar. It sweeps across
 * like a bedside monitor and draws a heartbeat each time the heart beats.
 */
export default function Ecg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx || reduced) return

    let dpr = 1
    let width = 0
    let height = 0
    let x = 0
    let prevY: number | null = null

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.lineWidth = 1.2
      ctx.lineJoin = "round"
      ctx.strokeStyle = "rgb(0 229 255 / 0.85)"
      ctx.shadowColor = "rgb(0 229 255 / 0.9)"
      ctx.shadowBlur = 4
      x = 0
      prevY = null
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    let beatAt = -Infinity
    let beatLength = 0.36
    const stopRhythm = startRhythm()
    const offBeat = onBeat(({ interval }) => {
      beatAt = performance.now()
      beatLength = Math.min(0.36, interval * 0.75)
    })

    let last = performance.now()
    let frame = 0
    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      if (width > 0) {
        const baseline = height * 0.72
        const spike = height * 0.62
        const u = (now - beatAt) / 1000 / beatLength
        const y = baseline - spike * waveform(u)
        let nx = x + (width / SWEEP_SECONDS) * dt

        if (nx > width) {
          nx = 0
          prevY = null
        }
        ctx.clearRect(nx, 0, GAP, height)
        if (prevY !== null && nx > x) {
          ctx.beginPath()
          ctx.moveTo(x, prevY)
          ctx.lineTo(nx, y)
          ctx.stroke()
        }
        x = nx
        prevY = y
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
      className="pointer-events-none absolute inset-x-0 bottom-0 h-4 w-full opacity-70"
    />
  )
}
