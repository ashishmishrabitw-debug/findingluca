"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "@/components/heart/useReducedMotion"

const BASES = "ATGC"
const TICK_MS = 40

/**
 * A page title that resolves out of DNA letters, left to right, when the
 * page opens. The real title is what the server sends, so search engines
 * and the first paint see it; the scramble only runs in the browser.
 * Each placeholder letter sits over the real one, so lines never reflow.
 */
export default function ScrambleTitle({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const reduced = useReducedMotion()
  const [frame, setFrame] = useState<number | null>(null)
  const total = Math.min(28, Math.max(14, Math.round(text.length * 0.9)))

  useEffect(() => {
    if (reduced) return
    let f = 0
    // Starting the animation is a reaction to mounting in the browser,
    // which is what an effect is for.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFrame(0)
    const timer = window.setInterval(() => {
      f++
      if (f >= total) {
        window.clearInterval(timer)
        setFrame(null)
      } else {
        setFrame(f)
      }
    }, TICK_MS)
    return () => window.clearInterval(timer)
  }, [text, total, reduced])

  if (frame === null) return <h1 className={className}>{text}</h1>

  const revealed = Math.floor((frame / total) * text.length)
  return (
    <h1 className={className} aria-label={text}>
      {text.split("").map((ch, i) => {
        if (i < revealed || ch === " ") return ch
        const base = BASES[(i * 7 + frame * 3 + ((i * frame) % 5)) % 4]
        return (
          <span key={i} aria-hidden className="relative">
            <span className="invisible">{ch}</span>
            <span className="absolute left-0 top-0 text-[#00e5ff]">{base}</span>
          </span>
        )
      })}
    </h1>
  )
}
