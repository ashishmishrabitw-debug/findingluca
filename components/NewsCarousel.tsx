"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Post } from "@/lib/posts"

type Props = {
  posts: Post[]
}

export default function NewsCarousel({ posts }: Props) {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (posts.length <= 1) return
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % posts.length)
        setFading(false)
      }, 400)
    }, 5000)
    return () => clearInterval(interval)
  }, [posts.length])

  if (posts.length === 0) {
    return (
      <div className="border border-[#1e1e1e] rounded-2xl p-10 text-center text-[#555]">
        <p>News coming soon</p>
      </div>
    )
  }

  const post = posts[current]

  return (
    <div className="border border-[#1e1e1e] rounded-2xl bg-[#111] overflow-hidden">
      {/* Progress bar */}
      <div className="h-px w-full bg-[#1e1e1e] relative overflow-hidden">
        <div
          key={current}
          className="absolute inset-y-0 left-0 bg-[#00e5ff]"
          style={{
            animation: "progress 5s linear forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>

      {/* Content */}
      <Link href={`/news/${post.slug}`} className="block p-10 group">
        <div
          className="transition-opacity duration-400"
          style={{ opacity: fading ? 0 : 1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-[#00e5ff] font-medium tracking-widest uppercase">
              {post.tag}
            </span>
            <span className="text-xs text-[#555]">{post.date}</span>
          </div>

          <h3 className="text-2xl font-bold mb-4 group-hover:text-[#00e5ff] transition-colors leading-snug">
            {post.title}
          </h3>

          <p className="text-[#a0a0a0] leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#00e5ff]/60 group-hover:text-[#00e5ff] transition-colors">
              Read more →
            </span>

            {/* Dot indicators */}
            {posts.length > 1 && (
              <div className="flex gap-2">
                {posts.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault()
                      setFading(true)
                      setTimeout(() => {
                        setCurrent(i)
                        setFading(false)
                      }, 400)
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === current ? "bg-[#00e5ff]" : "bg-[#333]"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
