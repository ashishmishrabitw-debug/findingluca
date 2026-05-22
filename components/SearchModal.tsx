"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import Fuse from "fuse.js"
import type { Post } from "@/lib/posts"

type Props = {
  posts: Post[]
  open: boolean
  onClose: () => void
}

export default function SearchModal({ posts, open, onClose }: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Post[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const fuse = useRef(
    new Fuse(posts, {
      keys: ["title", "excerpt", "tag"],
      threshold: 0.4,
    })
  )

  useEffect(() => {
    if (open) {
      setQuery("")
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      return
    }
    const hits = fuse.current.search(query).map((r) => r.item)
    setResults(hits.slice(0, 6))
  }, [query])

  const handleSelect = useCallback(
    (post: Post) => {
      router.push(`/${post.type}/${post.slug}`)
      onClose()
    },
    [router, onClose]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center pt-24 px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-md" />

      {/* Modal box */}
      <div
        className="relative w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-4 border border-[#1e1e1e] bg-[#111] rounded-2xl px-6 py-4">
          <svg
            className="w-5 h-5 text-[#555] shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search posts, projects, news…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-[#555] text-lg outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[#555] hover:text-white transition-colors text-sm"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-2 border border-[#1e1e1e] bg-[#111] rounded-2xl overflow-hidden">
            {results.map((post, i) => (
              <button
                key={post.slug}
                onClick={() => handleSelect(post)}
                className={`w-full text-left px-6 py-4 hover:bg-[#1a1a1a] transition-colors flex items-start gap-4 ${
                  i !== 0 ? "border-t border-[#1e1e1e]" : ""
                }`}
              >
                <span className="text-xs text-[#00e5ff] font-medium tracking-widest uppercase shrink-0 mt-1 w-16">
                  {post.tag}
                </span>
                <div>
                  <p className="text-white font-semibold leading-snug">
                    {post.title}
                  </p>
                  <p className="text-[#a0a0a0] text-sm mt-1 line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="mt-2 border border-[#1e1e1e] bg-[#111] rounded-2xl px-6 py-8 text-center text-[#555]">
            No results for &ldquo;{query}&rdquo;
          </div>
        )}

        <p className="text-center text-[#333] text-xs mt-4">
          Press <span className="text-[#555]">Esc</span> to close
        </p>
      </div>
    </div>
  )
}
