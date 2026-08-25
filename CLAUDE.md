# WHPC Website

## Project
- Brand: WHPC (White Heart's Placebo Club) — formerly "Finding Luca"
- Stack: Next.js (App Router), TypeScript, Tailwind CSS
- Deploy: Vercel via GitHub push to `main`
- Repo: git@github.com:ashishmishrabitw-debug/findingluca.git
- Local path: /Users/ashishkrishnamishra/WHPC-vercel

## Key structure
- `app/` — Next.js pages (manifesto, frontiers, projects, blog, news, contact)
- `components/` — Navbar, Footer, PostCard, NewsCarousel, FrontiersSlider
- `content/` — Markdown for blog, news, projects posts
- `lib/` — post loading utilities

## Design conventions
- Dark theme: bg `#0a0a0a`, accent `#00e5ff` (cyan), muted `#a0a0a0`, borders `#1e1e1e`
- Inline SVGs for icons (lucide-react is installed but not used yet)
- Rounded-full buttons, rounded-2xl cards
- Max content width: `max-w-6xl mx-auto px-6`

## Socials
- Discord: https://discord.gg/Sm9q5ZnmS8 (icon in navbar + footer + homepage community section)
- WhatsApp: https://chat.whatsapp.com/LcJkWJHMpNR4MwEKUDi38o (footer + homepage community section)

## Workflow
- Edit files → `git add <files>` → `git commit` → `git push origin main`
- Vercel auto-deploys on push to `main` (~1–2 min)
- Dev server: `npm run dev` (port 3000)

## Notes
- Email addresses like `join@findingluca.com` still use the old domain — do not rename them, they are real addresses
- The blog post `content/blog/why-i-started-finding-luca.md` intentionally keeps "Finding Luca" — it tells the origin story of the name
- Nav route was renamed: `/constitution` → `/manifesto` (folder is `app/manifesto/`)

@AGENTS.md
