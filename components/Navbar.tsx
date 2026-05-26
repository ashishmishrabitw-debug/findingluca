"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import SearchModal from "@/components/SearchModal"
import type { Post } from "@/lib/posts"

const links = [
  { href: "/constitution", label: "Constitution", hoverText: "core vision" },
  { href: "/frontiers", label: "Frontiers", hoverText: "long term targets" },
  { href: "/projects", label: "Projects", hoverText: "short term actions" },
  { href: "/blog", label: "Blog", hoverText: "essays, articles, philosophy" },
  { href: "/news", label: "News", hoverText: "new information" },
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
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/whpc-logo.png"
              alt="White Heart's Placebo Club"
              width={227}
              height={48}
              className="object-contain"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-sm transition-colors ${
                  pathname.startsWith(link.href)
                    ? "text-[#00e5ff]"
                    : "text-[#a0a0a0] hover:text-white"
                }`}
              >
                {link.label}
                {link.hoverText && (
                  <span className="pointer-events-none absolute left-1/2 top-full mt-3 w-max max-w-[13rem] -translate-x-1/2 rounded-md border border-[#1e1e1e] bg-[#0f0f0f] px-3 py-2 text-center text-xs font-medium leading-snug text-[#a0a0a0] opacity-0 shadow-2xl shadow-black/40 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {link.hoverText}
                  </span>
                )}
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
                className="block"
              >
                <span
                  className={`text-sm ${
                    pathname.startsWith(link.href)
                      ? "text-[#00e5ff]"
                      : "text-[#a0a0a0]"
                  }`}
                >
                  {link.label}
                </span>
                {link.hoverText && (
                  <span className="mt-1 block text-xs leading-snug text-[#555]">
                    {link.hoverText}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-x-0 bottom-0 top-16 z-40 bg-transparent md:hidden"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <SearchModal
        posts={posts}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  )
}
