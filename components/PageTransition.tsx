"use client"

import { ViewTransition, useEffect, useState, type ReactNode } from "react"

/**
 * Page-change effects. Each name matches a block in app/globals.css scoped
 * under :root[data-page-transition="..."]. The live site uses the default;
 * add ?effects to any URL to get a picker for trying the others.
 */
export const PAGE_TRANSITIONS = [
  { id: "swipe", label: "Swipe" },
  { id: "fade", label: "Fade up" },
  { id: "slide", label: "Slide" },
  { id: "scan", label: "Scan" },
  { id: "heartbeat", label: "Heartbeat" },
  { id: "warp", label: "Warp" },
  { id: "none", label: "None" },
] as const

export const DEFAULT_PAGE_TRANSITION = "swipe"

const STORAGE_KEY = "whpc:page-transition"

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      {/* One wrapper element, so the animation always has exactly one thing
          to name. Without it, the first navigation can briefly hold two
          sibling elements under the same name and the browser cancels it. */}
      {/* Moving to a menu item further left tags the navigation "nav-back"
          (see Navbar), which adds the "back" class so swipes run the other
          way. */}
      <ViewTransition default={{ "nav-back": "page back", default: "page" }}>
        <div>{children}</div>
      </ViewTransition>
      <EffectPicker />
    </>
  )
}

function EffectPicker() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<string>(DEFAULT_PAGE_TRANSITION)

  useEffect(() => {
    let saved: string | null = null
    try {
      if (new URLSearchParams(location.search).has("effects")) {
        localStorage.setItem(`${STORAGE_KEY}:picker`, "on")
      }
      saved = localStorage.getItem(STORAGE_KEY)
      // Reading the browser's storage after the first render is exactly
      // what an effect is for; the server cannot know these values.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(localStorage.getItem(`${STORAGE_KEY}:picker`) === "on")
    } catch {}
    if (saved && PAGE_TRANSITIONS.some((t) => t.id === saved)) {
      document.documentElement.setAttribute("data-page-transition", saved)
      setCurrent(saved)
    }
  }, [])

  if (!open) return null

  const choose = (id: string) => {
    document.documentElement.setAttribute("data-page-transition", id)
    setCurrent(id)
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {}
  }

  const close = () => {
    setOpen(false)
    try {
      localStorage.removeItem(`${STORAGE_KEY}:picker`)
    } catch {}
  }

  return (
    <div
      data-morse-skip
      style={{ viewTransitionName: "effect-picker" }}
      className="fixed bottom-5 right-5 z-[60] w-56 rounded-2xl border border-[#1e1e1e] bg-[#111]/95 p-4 text-sm shadow-2xl backdrop-blur-md"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest text-[#00e5ff]">
          Page effect
        </span>
        <button
          type="button"
          onClick={close}
          aria-label="Hide effect picker"
          className="text-[#555] hover:text-white"
        >
          ✕
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {PAGE_TRANSITIONS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => choose(t.id)}
            className={`rounded-lg px-3 py-1.5 text-left transition-colors ${
              current === t.id
                ? "bg-[#00e5ff] font-semibold text-black"
                : "text-[#a0a0a0] hover:bg-[#1a1a1a] hover:text-white"
            }`}
          >
            {t.label}
            {t.id === DEFAULT_PAGE_TRANSITION && (
              <span className={current === t.id ? "text-black/60" : "text-[#555]"}>
                {" "}· live
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs leading-snug text-[#555]">
        Pick one, then click around the site.
      </p>
    </div>
  )
}
