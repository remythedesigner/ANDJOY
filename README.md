# &JOY — Homepage

Production-ready homepage built from the Figma design ([node-id=5-4156](https://www.figma.com/design/R4sKuGKbl7XkmKlP5iQqXm/-JOY?node-id=5-4156)).

## Stack

- **React 18** + **TypeScript** — functional components with hooks
- **Vite** — fast dev server and production build
- **Tailwind CSS v3** — utility-first styling with custom design tokens

## Setup

```bash
npm install
npm run dev       # → http://localhost:5173
npm run build     # production bundle → dist/
npm run preview   # preview production build locally
```

## Project structure

```
src/
├── components/
│   ├── atoms/        SectionHeader
│   ├── molecules/    VCard, ReviewCard
│   └── organisms/    AppHeader, GreetingSection, HeroCarousel,
│                     EventsSection, CommunitySection, GeoBlock, AppFooter
├── pages/            Home.tsx
└── utils/
    ├── types.ts      TypeScript interfaces
    └── data.ts       Static content + asset URLs
```

## Design tokens (Tailwind)

| Token | Value | Usage |
|---|---|---|
| `primary` | `#ff6366` | Brand coral — CTAs, category labels, active nav |
| `primary-light` | `#ffecea` | Soft fill — geo block, icon backgrounds |
| `cream` | `#faf4f1` | Page background |
| `dark` | `#1a1a24` | Primary body text |
| `dark-warm` | `#2b211c` | Headings, greeting |
| `muted` | `#9090a0` | Secondary text, timestamps |
| `community` | `#fff4f2` | Review card backgrounds |
| `badge-cream` | `#fbeee8` | Location badge background |

## Fonts

Loaded via Google Fonts:
- **Bodoni Moda** — serif display (headings, greeting, quote text)
- **Outfit** — sans-serif UI (labels, buttons, nav, card titles)
- **DM Sans** — small metadata (timestamps, distances)

## Accessibility

- WCAG 2.1 AA colour contrast on all text
- Semantic HTML5: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`
- `aria-label` on all landmark and interactive elements
- `aria-current="page"` on active nav item
- `focus-visible` ring on all interactive elements
- `prefers-reduced-motion` support via `@layer base` CSS

## Production notes

- **Figma asset URLs** (photos, icons) are hosted on Figma's CDN and expire after ~7 days. Replace with your own CDN assets before shipping.
- The **&JOY logo** is an inline SVG text approximation. Swap in the actual exported SVG from Figma for pixel-perfect fidelity.
- The **geolocation button** wires up to the browser Geolocation API — connect success/error handlers to your real data layer.
