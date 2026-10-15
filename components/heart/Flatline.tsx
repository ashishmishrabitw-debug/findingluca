"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { excite, beatNow } from "./rhythm"
import { useReducedMotion } from "./useReducedMotion"

type Stage = "flat" | "charging" | "alive"

/** Four heartbeats across a 600 × 120 trace, baseline at y = 70. */
const RHYTHM = (() => {
  const beat = (x: number) =>
    [
      `L${x} 70`,
      `Q${x + 8} 62 ${x + 16} 70`,
      `L${x + 26} 70`,
      `L${x + 30} 76`,
      `L${x + 36} 14`,
      `L${x + 42} 92`,
      `L${x + 48} 70`,
      `L${x + 60} 70`,
      `Q${x + 74} 50 ${x + 88} 70`,
    ].join(" ")
  return `M0 70 ${[40, 190, 340, 490].map(beat).join(" ")} L600 70`
})()

/**
 * The 404 page: a flat line and a Defibrillate button. Pressing it charges,
 * shocks the screen, brings the trace back into rhythm and takes the reader
 * to the homepage.
 */
export default function Flatline() {
  const router = useRouter()
  const reduced = useReducedMotion()
  const [stage, setStage] = useState<Stage>("flat")
  const [flash, setFlash] = useState(false)

  const defibrillate = () => {
    if (stage !== "flat") return
    setStage("charging")
    window.setTimeout(
      () => {
        if (!reduced) {
          setFlash(true)
          window.setTimeout(() => setFlash(false), 320)
          document.querySelector("main")?.animate(
            [
              { transform: "translate(0, 0)" },
              { transform: "translate(-10px, 4px)" },
              { transform: "translate(9px, -5px)" },
              { transform: "translate(-6px, -3px)" },
              { transform: "translate(5px, 4px)" },
              { transform: "translate(-2px, 1px)" },
              { transform: "translate(0, 0)" },
            ],
            { duration: 450, easing: "ease-out" }
          )
        }
        setStage("alive")
        excite(1)
        beatNow()
        window.setTimeout(() => router.push("/"), reduced ? 700 : 1600)
      },
      reduced ? 0 : 750
    )
  }

  return (
    <div className="pt-16">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
        <p className="text-[#00e5ff] text-sm font-medium tracking-[0.2em] uppercase mb-10">
          404 · No pulse
        </p>

        <svg
          viewBox="0 0 600 120"
          className="w-full h-auto mb-12 overflow-visible"
          aria-hidden
        >
          <defs>
            <filter id="flatline-glow" x="-10%" y="-50%" width="120%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {stage === "alive" ? (
            <path
              d={RHYTHM}
              fill="none"
              stroke="#00e5ff"
              strokeWidth="2.5"
              strokeLinejoin="round"
              filter="url(#flatline-glow)"
              pathLength={1}
              className="flatline-revive"
            />
          ) : (
            <>
              <line
                x1="0"
                y1="70"
                x2="600"
                y2="70"
                stroke={stage === "charging" ? "#00e5ff" : "#3a3a3a"}
                strokeWidth="2"
                className="transition-colors duration-500"
              />
              {!reduced && (
                <circle
                  cy="70"
                  r="4"
                  fill="#00e5ff"
                  filter="url(#flatline-glow)"
                  className="flatline-blip"
                />
              )}
            </>
          )}
        </svg>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {stage === "alive" ? "We have a pulse." : "This page has flatlined."}
        </h1>
        <p className="text-[#a0a0a0] text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto">
          {stage === "alive"
            ? "Taking you to the homepage."
            : "There is no pulse at this address. The page may have moved, or it never existed."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={defibrillate}
            disabled={stage !== "flat"}
            className={`px-10 py-4 rounded-full font-bold text-black bg-[#00e5ff] transition-all duration-300 hover:shadow-[0_0_40px_rgb(0_229_255_/_0.6)] disabled:cursor-default ${
              stage === "charging" ? "animate-pulse shadow-[0_0_50px_rgb(0_229_255_/_0.8)]" : ""
            }`}
          >
            {stage === "flat" && "⚡ Defibrillate"}
            {stage === "charging" && "Charging… stand clear"}
            {stage === "alive" && "Clear!"}
          </button>
          <Link
            href="/"
            className="text-sm text-[#a0a0a0] hover:text-white transition-colors"
          >
            or just go home →
          </Link>
        </div>
      </div>

      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-[70] bg-[#00e5ff] transition-opacity ${
          flash ? "opacity-60 duration-75" : "opacity-0 duration-300"
        }`}
      />
    </div>
  )
}
