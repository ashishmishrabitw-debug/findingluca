"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import SearchModal from "@/components/SearchModal"
import type { Post } from "@/lib/posts"

const links = [
  { href: "/constitution", label: "Constitution" },
  { href: "/frontiers", label: "Frontiers" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Join Us" },
]

type Props = {
  posts: Post[]
}

export default function Navbar({ posts }: Props) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e1e1e] bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-sm font-bold tracking-[0.18em] text-white uppercase hover:text-[#00e5ff] transition-colors"
          >
            Finding Luca
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  link.href === "/constitution"
                    ? `rounded-full border px-4 py-2 font-semibold ${
                        pathname.startsWith(link.href)
                          ? "border-[#00e5ff] bg-[#00e5ff] text-black"
                          : "border-[#00e5ff]/35 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black"
                      }`
                    : pathname.startsWith(link.href)
                      ? "text-[#00e5ff]"
                      : "text-[#a0a0a0] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[#a0a0a0] hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg
                className="w-4 h-4"
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
            </button>
          </div>

          {/* Mobile: search + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[#a0a0a0] hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
            <button
              className="text-[#a0a0a0] hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-px bg-current mb-1.5" />
              <div className="w-5 h-px bg-current mb-1.5" />
              <div className="w-5 h-px bg-current" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#1e1e1e] bg-[#0a0a0a] px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm ${
                  link.href === "/constitution"
                    ? `w-fit rounded-full border px-4 py-2 font-semibold ${
                        pathname.startsWith(link.href)
                          ? "border-[#00e5ff] bg-[#00e5ff] text-black"
                          : "border-[#00e5ff]/35 text-[#00e5ff]"
                      }`
                    : pathname.startsWith(link.href)
                      ? "text-[#00e5ff]"
                      : "text-[#a0a0a0]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <SearchModal
        posts={posts}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  )
}
