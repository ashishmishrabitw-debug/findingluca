"use client"

import { useState, useCallback, useRef, useEffect } from "react"

const CHARS = "ATGCATGCATGC"

interface TextScrambleProps {
  text: string
  className?: string
}

export function TextScramble({ text, className = "" }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const frameRef = useRef(0)

  const scramble = useCallback(() => {
    setIsScrambling(true)
    frameRef.current = 0
    const duration = text.length * 6

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      frameRef.current++

      const progress = frameRef.current / duration
      const revealedLength = Math.floor(progress * text.length)

      const newText = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " "
          if (i < revealedLength) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join("")

      setDisplayText(newText)

      if (frameRef.current >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 50)
  }, [text])

  const handleMouseEnter = () => {
    setIsHovering(true)
    scramble()
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div
      className={`group relative inline-flex flex-col cursor-pointer select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative font-mono text-sm tracking-[0.2em] uppercase">
        {displayText.split("").map((char, i) =>
          char === " " ? (
            <span key={i}>&nbsp;</span>
          ) : (
            <span
              key={i}
              className={`inline-block transition-all duration-150 ${
                isScrambling && char !== text[i]
                  ? "text-[#00e5ff] scale-110"
                  : "text-white"
              }`}
              style={{
                transitionDelay: `${i * 10}ms`,
              }}
            >
              {char}
            </span>
          )
        )}
      </span>

      {/* Animated underline */}
      <span className="relative h-px w-full mt-2 overflow-hidden">
        <span
          className={`absolute inset-0 bg-white transition-transform duration-500 ease-out origin-left ${
            isHovering ? "scale-x-100" : "scale-x-0"
          }`}
        />
        <span className="absolute inset-0 bg-[#1e1e1e]" />
      </span>

      {/* Subtle glow on hover */}
      <span
        className={`absolute -inset-4 rounded-lg bg-[#00e5ff]/5 transition-opacity duration-300 -z-10 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}
