"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import {
  beatNow,
  excite,
  onBeat,
  startRhythm,
  startTachycardia,
} from "./rhythm"
import { useReducedMotion } from "./useReducedMotion"

/** Taps inside this window count towards tachycardia. */
const TAP_WINDOW_MS = 2500
const TAPS_FOR_TACHYCARDIA = 5

function beatKeyframes(tachycardia: boolean): Keyframe[] {
  const glow = (alpha: number, blur: number) =>
    `drop-shadow(0 0 ${blur}px rgb(0 229 255 / ${alpha}))`
  const peak = tachycardia ? 0.85 : 0.55
  return [
    { offset: 0, transform: "scale(1)", filter: glow(0, 0) },
    { offset: 0.23, transform: "scale(1.08)", filter: glow(peak, 5) },
    { offset: 0.46, transform: "scale(1)", filter: glow(0, 0) },
    { offset: 0.69, transform: "scale(1.05)", filter: glow(peak - 0.05, 5) },
    { offset: 1, transform: "scale(1)", filter: glow(0, 0) },
  ]
}

/**
 * The heart half of the navbar logo. It beats on the shared rhythm and
 * speeds up when tapped; tap it fast enough and it goes into tachycardia.
 * Tapping the heart does not navigate; the words beside it still go home.
 */
export default function BeatingHeart() {
  const ref = useRef<HTMLImageElement>(null)
  const reduced = useReducedMotion()
  const taps = useRef<number[]>([])

  useEffect(() => {
    const stop = startRhythm()
    const off = onBeat(({ interval, tachycardia }) => {
      if (reduced) return
      ref.current?.animate(beatKeyframes(tachycardia), {
        duration: Math.min(900, interval * 1000 * 0.9),
        easing: "ease-in-out",
      })
    })
    return () => {
      off()
      stop()
    }
  }, [reduced])

  return (
    <Image
      ref={ref}
      src="/whpc-logo.png"
      alt=""
      aria-hidden
      width={227}
      height={48}
      title="Tap the heart."
      draggable={false}
      className="whpc-heartbeat absolute inset-0 object-contain cursor-pointer select-none [clip-path:inset(0_84.8%_0_0)]"
      onClick={(e) => {
        // The heart is a toy, not a link: keep the reader on this page.
        e.preventDefault()
        const now = performance.now()
        taps.current = [...taps.current, now].filter(
          (t) => now - t < TAP_WINDOW_MS
        )
        if (taps.current.length >= TAPS_FOR_TACHYCARDIA) {
          taps.current = []
          startTachycardia(4000)
        } else {
          excite(0.3)
          beatNow()
        }
      }}
    />
  )
}
