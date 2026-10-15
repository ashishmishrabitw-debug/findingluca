"use client"

import { useEffect, useRef, useState } from "react"
import { exciteTo, onBeat, onTachycardia, setNight, startRhythm } from "./rhythm"
import { useReducedMotion } from "./useReducedMotion"

/** Scroll speed, in pixels a second, that counts as fully excited. */
const FAST_SCROLL = 3000

/** Local hours when the site sleeps: 22:00 to 06:00. */
function isNightHour(date = new Date()) {
  const h = date.getHours()
  return h >= 22 || h < 6
}

/** ?night forces night on, ?night=off forces it off, for trying it out. */
function nightOverride(): boolean | null {
  const value = new URLSearchParams(window.location.search).get("night")
  if (value === null) return null
  return value !== "off"
}

/**
 * Page-wide effects that follow the heart: the pulse quickens while the
 * reader scrolls fast, the site dims and the heart slows at night, and a
 * tachycardia episode pulses the screen edges with a calming note.
 * Rendered outside the top bar so its full-screen layers cover the page.
 */
export default function HeartEffects() {
  const reduced = useReducedMotion()
  const [night, setNightState] = useState(false)
  const [tachy, setTachy] = useState(false)
  const pulseRef = useRef<HTMLDivElement>(null)

  useEffect(() => startRhythm(), [])

  // Reading pulse.
  useEffect(() => {
    let lastY = window.scrollY
    let lastT = performance.now()
    const onScroll = () => {
      const now = performance.now()
      const dt = (now - lastT) / 1000
      if (dt > 0.016) {
        const speed = Math.abs(window.scrollY - lastY) / dt
        exciteTo((Math.min(speed, FAST_SCROLL) / FAST_SCROLL) * 0.85)
        lastY = window.scrollY
        lastT = now
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Night.
  useEffect(() => {
    const update = () => {
      const on = nightOverride() ?? isNightHour()
      setNight(on)
      setNightState(on)
      document.documentElement.toggleAttribute("data-night", on)
    }
    update()
    const timer = window.setInterval(update, 5 * 60 * 1000)
    return () => window.clearInterval(timer)
  }, [])

  // Tachycardia.
  useEffect(() => onTachycardia(setTachy), [])
  useEffect(() => {
    if (!tachy || reduced) return
    return onBeat(({ interval }) => {
      pulseRef.current?.animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }], {
        duration: Math.min(300, interval * 1000 * 0.8),
        easing: "ease-out",
      })
    })
  }, [tachy, reduced])

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-40 bg-black transition-opacity duration-[1500ms] ${
          night ? "opacity-[0.18]" : "opacity-0"
        }`}
      />
      <div
        ref={pulseRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[45] opacity-0 shadow-[inset_0_0_140px_rgb(0_229_255_/_0.45)]"
      />
      <div
        role="status"
        className={`pointer-events-none fixed left-1/2 top-20 z-[55] -translate-x-1/2 rounded-full border border-[#00e5ff]/40 bg-[#0a0a0a]/90 px-5 py-2 text-sm text-[#00e5ff] backdrop-blur-md transition-all duration-500 ${
          tachy ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        {tachy ? "easy, breathe" : ""}
      </div>
    </>
  )
}
