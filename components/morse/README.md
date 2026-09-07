# Morse mode

A novelty toggle in the navbar that rewrites the site's visible text into
neon morse code. Deliberately built to be thrown away without trace.

## Files

Everything lives in this folder:

- `MorseMode.tsx` — the toggle button and the DOM transform engine
- `morse.ts` — the encoder (pure, no DOM)
- `morse.css` — neon styling, entirely scoped under `[data-morse="on"]`

## How it is wired in

One import and one element in `components/Navbar.tsx`, in both the desktop
and mobile clusters. Nothing else in the codebase references it. No page,
layout, or content file was modified to support it, and no field was added
to the `Post` type.

## How it works

The site's components are never touched. When the mode is on, the engine
walks visible text nodes and rewrites them in place, keeping the original
in a `WeakMap` so it can be restored exactly. A `MutationObserver`
re-applies the transform after React re-renders or a route change swaps out
the DOM. The choice is remembered in `localStorage`.

Elements marked `data-morse-skip` — currently just the toggle itself — are
left alone, so you can always find the switch to turn it off.

## To remove it

1. Delete this folder.
2. Delete the `MorseMode` import and its two `<MorseMode />` usages in
   `components/Navbar.tsx`.

Nothing else. There is no stored state to migrate and no content to rewrite;
a stale `whpc:morse-mode` key may linger in visitors' `localStorage` and is
harmless.
