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

            {/* Discord */}
            <a
              href="https://discord.gg/Sm9q5ZnmS8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="text-[#a0a0a0] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>

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
            <a
              href="https://discord.gg/Sm9q5ZnmS8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#a0a0a0]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Discord
            </a>
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
