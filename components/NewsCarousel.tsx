"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/lib/posts"

const bgImages: Record<string, string> = {
  blog: "https://images.unsplash.com/photo-1532094349884-543559059e6b?w=1920&q=80",
  news: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1920&q=80",
  projects: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&q=80",
}

const fallbackImages = [
  "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1920&q=80",
  "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1920&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80",
  "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1920&q=80",
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
  const bgSrc = post.image ?? bgImages[post.type] ?? fallbackImages[current % fallbackImages.length]

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: visible ? 1 : 0.4 }}
      >
        <Image
          src={bgSrc}
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-[#0a0a0a]/75" />
        {/* Bottom fade to site background */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00e5ff] opacity-[0.04] blur-3xl pointer-events-none z-10" />

      {/* Progress bar */}
      <div className="absolute top-16 left-0 right-0 h-px bg-white/10 z-20">
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
      <div className="relative z-20 flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-6 py-32 pt-40">
        <div
          className="transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs text-[#00e5ff] font-medium tracking-[0.3em] uppercase">
              {post.tag}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-white/40 font-mono">{post.date}</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-8 max-w-4xl">
            {post.title}
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
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
              href={`/${post.type}`}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              All {post.type.charAt(0).toUpperCase() + post.type.slice(1)} →
            </Link>
          </div>
        </div>

        {/* Dots + counter */}
        {posts.length > 1 && (
          <div className="absolute bottom-12 left-6 right-6 flex items-center justify-between">
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
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-white/30">
              {String(current + 1).padStart(2, "0")} / {String(posts.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 z-20">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/20" />
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </div>
    </div>
  )
}
