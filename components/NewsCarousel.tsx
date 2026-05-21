"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Post } from "@/lib/posts"

const gradients = [
  "from-[#001a2e] via-[#0a0a0a] to-[#0a0a0a]",
  "from-[#001a1a] via-[#0a0a0a] to-[#0a0a0a]",
  "from-[#0d001a] via-[#0a0a0a] to-[#0a0a0a]",
  "from-[#1a1000] via-[#0a0a0a] to-[#0a0a0a]",
]

type Props = {
  posts: Post[]
}

export default function NewsCarousel({ posts }: Props) {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (posts.length <= 1) return
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % posts.length)
        setVisible(true)
      }, 500)
    }, 12000)
    return () => clearInterval(interval)
  }, [posts.length])

  if (posts.length === 0) return null

  const post = posts[current]
  const gradient = gradients[current % gradients.length]

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-all duration-1000`}
      />

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00e5ff] opacity-[0.03] blur-3xl pointer-events-none" />

      {/* Progress bar */}
      <div className="absolute top-16 left-0 right-0 h-px bg-[#1e1e1e] z-10">
        <div
          key={`${current}-progress`}
          className="h-full bg-[#00e5ff]"
          style={{ animation: "progress 12s linear forwards" }}
        />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-6 py-32 pt-40">
        <div
          className="transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs text-[#00e5ff] font-medium tracking-[0.3em] uppercase">
              {post.tag}
            </span>
            <span className="text-[#333]">·</span>
            <span className="text-xs text-[#555] font-mono">{post.date}</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-8 max-w-5xl">
            {post.title}
          </h1>

          <p className="text-[#a0a0a0] text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            {post.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href={`/${post.type}/${post.slug}`}
              className="px-8 py-3.5 bg-[#00e5ff] text-black font-semibold rounded-full hover:bg-[#00b8cc] transition-colors text-sm"
            >
              Read More →
            </Link>
            <Link
              href="/news"
              className="text-sm text-[#a0a0a0] hover:text-white transition-colors"
            >
              All News
            </Link>
          </div>
        </div>

        {/* Dot indicators + counter */}
        {posts.length > 1 && (
          <div className="absolute bottom-12 left-6 right-6 max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex gap-3">
              {posts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setVisible(false)
                    setTimeout(() => { setCurrent(i); setVisible(true) }, 500)
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-8 h-1.5 bg-[#00e5ff]"
                      : "w-1.5 h-1.5 bg-[#333] hover:bg-[#555]"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-[#555]">
              {String(current + 1).padStart(2, "0")} / {String(posts.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#333] z-10">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#333]" />
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </div>
    </div>
  )
}
