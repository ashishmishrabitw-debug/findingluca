# WHPC site map before the Letters redesign

Snapshot of findingluca.com as it stood on 6 October 2026, before the site was
rebuilt around the weekly letter. Nothing listed here has been deleted: pages
and content that leave the navigation stay in the project.

**To get the whole old site back exactly:** git tag `pre-letters-redesign`
(commit `d842aa7`). `git checkout pre-letters-redesign` shows it;
`git checkout pre-letters-redesign -- <path>` restores a single file or folder.

## Pages

| Address | What it is | Code |
|---|---|---|
| `/` | Homepage: carousel of latest posts, "Search and Research Laboratory" text scramble, "Building the Future of Medicine", frontiers slider, community section (Discord, WhatsApp) | `app/page.tsx` |
| `/manifesto` | Core vision. Four principles: Serve life first, Follow evidence relentlessly, Build in the open, Stay adaptable. (Was `/constitution`.) | `app/manifesto/page.tsx` |
| `/frontiers` | Long-term targets, listed below | `app/frontiers/page.tsx`, data in `lib/frontiers.ts` |
| `/projects` and `/projects/[slug]` | Short-term actions, one page per project | `app/projects/`, content in `content/projects/` |
| `/blog` and `/blog/[slug]` | Essays, articles, philosophy | `app/blog/`, content in `content/blog/` |
| `/news` and `/news/[slug]` | Lab updates and medical news | `app/news/`, content in `content/news/` |
| `/contact` | "Join Us": email, join the lab, what we look for in collaborators, Carl Sagan quote | `app/contact/page.tsx` |
| `/publishing` | "How We Publish": what is and is not peer reviewed, how to cite. Linked from the footer only. | `app/publishing/page.tsx` |
| `/research` | Older research-areas page (Precision Diagnostics, Regenerative Medicine, AI-Driven Drug Discovery). Not linked from the navigation. | `app/research/page.tsx` |

## Navigation as it was

Top bar: logo, Manifesto, Frontiers, Projects, Blog, News, Join Us, Discord
icon, search, morse-mode switch.
Footer: Frontiers, Projects, Blog, News, How We Publish, Contact, Discord and
WhatsApp icons.

## Content

Frontiers (`lib/frontiers.ts`):
- Robotics (Active): "Machines that heal."
- Genomics (Active): "Reading the code of life."
- Nutrition Medicine (Active): "Food as the first medicine."
- Prosthetics (Active): "Restoring movement, touch, and independence."
- Pursuit for Immortality (Incoming): "Not just longer life — no death at all."

Projects (`content/projects/`):
- `tobacco-in-nuh.md`: Tobacco in Nuh (2026-09-07)
- `cannabinoids-parkinsons.md`: Cannabinoids in Parkinson's Therapy (2026-05-22)
- `ai-chatbot-healthcare-mapping.md`: Mapping AI Chatbot Integration in Healthcare (2026-05-21)
- `hydration-modulated-proton-tunneling-dna.md`: Hydration-Modulated Proton Tunneling in DNA (2026-05-21)

Blog (`content/blog/`):
- `why-i-started-finding-luca.md`: "Why serve humanity?" (2026-05-21). Keeps the Finding Luca name on purpose; it tells the origin of the name.

News (`content/news/`):
- `lab-launch-2026.md`: Finding Luca Research Lab — Launch (2026-05-21)

## Features and components

- Post carousel on the homepage: `components/NewsCarousel.tsx`
- Frontiers slider: `components/FrontiersSlider.tsx`
- Post cards: `components/PostCard.tsx`
- Search across all posts: `components/SearchModal.tsx`
- Publishing transparency: `components/ReviewStatusBadge.tsx`, `components/CitationBlock.tsx`, `lib/citationMeta.ts` (Google Scholar tags, DOI, authors, review status on every post)
- Morse mode: `components/morse/` (removed in the redesign; recoverable from the tag)
- Visual effects: `components/ui/glowy-waves-backdrop.tsx`, `components/ui/linear-card.tsx`, `components/ui/text-scramble.tsx`

## Other

- Images in `public/`: `whpc-logo.png`, `whpc-hero-logo.png`, `whpc-heart.png`, `whpc-text.png`, `logo.png`, `robotics.png`, `nutrition-medicine.png`, `prosthetics.png`, `dna-proton-tunneling.svg`
- Discord: https://discord.gg/Sm9q5ZnmS8
- WhatsApp: https://chat.whatsapp.com/LcJkWJHMpNR4MwEKUDi38o
- Emails in use: `join@findingluca.com` (real address, do not rename)

## Not part of this site

An older PHP copy lives in `~/My Websites/findingluca/public_html`. It is not
connected to the domain. It holds one news post that never reached this site:
"The Month Medicine Stopped Averaging" (25 August 2026), in its `data.php`.
