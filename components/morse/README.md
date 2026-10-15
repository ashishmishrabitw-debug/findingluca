# Morse mode

A novelty toggle in the navbar that rewrites the site's visible text into
neon morse code. Deliberately built to be thrown away without trace.

## Files

Everything lives in this folder:

- `MorseMode.tsx` — the toggle button and the DOM transform engine
- `MorseWordmark.tsx` — the navbar logo swap (heart + morse wordmark)
- `store.ts` — shared on/off state for the two toggle instances
- `morse.ts` — the encoder (pure, no DOM)
- `morse.css` — neon styling, entirely scoped under `[data-morse="on"]`

## How it is wired in

Two imports and three elements in `components/Navbar.tsx`: `<MorseMode />`
in the desktop and mobile clusters, and `<MorseWordmark />` beside the logo.
The `<nav>` carries `data-morse-skip` so the top bar stays legible and the
toggle stays reachable, and the logo `<Image>` carries `data-morse-logo` so
it can be swapped out.

Nothing else in the codebase references the feature. No page, layout, or
content file was modified, and no field was added to the `Post` type.

The logo is a single PNG with the wordmark baked in, so the text engine
cannot reach it. `MorseWordmark` swaps in `public/whpc-heart.png` — which
already existed — beside the name encoded as morse. Below the `lg`
breakpoint only the heart shows, because the real logo scales down
responsively and a fixed-width morse wordmark would overflow the bar.

## How it works

The site's components are never touched. When the mode is on, the engine
walks visible text nodes and rewrites them in place, keeping the original
in a `WeakMap` so it can be restored exactly. A `MutationObserver`
re-applies the transform after React re-renders or a route change swaps out
the DOM. The choice is remembered in `localStorage`.

Elements marked `data-morse-skip` — currently the whole `<nav>`, which
includes the toggle — are left alone, so the site stays navigable and you
can always find the switch to turn it off.

## To remove it

1. Delete this folder.
2. In `components/Navbar.tsx`, delete both `@/components/morse/...` imports,
   the two `<MorseMode />` usages, the `<MorseWordmark />` usage, and the
   `data-morse-skip` and `data-morse-logo` attributes.

Nothing else. There is no stored state to migrate and no content to rewrite;
a stale `whpc:morse-mode` key may linger in visitors' `localStorage` and is
harmless.
