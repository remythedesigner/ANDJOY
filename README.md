# &JOY — ANDJOY

A React/TypeScript/Tailwind mobile web app for discovering and booking local activities in Paris. Originally built from the Figma design ([node-id=5-4156](https://www.figma.com/design/R4sKuGKbl7XkmKlP5iQqXm/-JOY?node-id=5-4156), then covering only the Home screen); that file is being extended to cover the full app below.

## Stack

- **React 19** + **TypeScript** — functional components with hooks
- **Vite** — fast dev server and production build
- **Tailwind CSS v3** — utility-first styling with custom design tokens
- **React Leaflet** — the Map screen

## Setup

```bash
npm install
npm run dev       # → http://localhost:5173
npm run build     # production bundle → dist/
npm run preview   # preview production build locally
```

Live build: deployed to GitHub Pages on every push to `main` (see `.github/workflows/`).

## Project structure

```
src/
├── components/
│   ├── atoms/        BackButton, CategoryButton, Pill, PrimaryButton,
│   │                  SafeAreaSpacer, SectionHeader, StepperButton
│   ├── molecules/     ReviewCard, VCard
│   └── organisms/     AppHeader, AppFooter, CommunitySection, EventsSection,
│                       GeoBlock, GreetingSection, HeroCarousel, MemberProfileSheet
│   Each folder has an index.ts barrel — import from '../components/atoms' etc.
├── pages/             SplashScreen, WelcomeScreen, OnboardingSlides,
│                       AuthProviderScreen, AuthEmailScreen, ProfileSetup,
│                       Home, Map, EventDetail, BookingPage, PaymentPage,
│                       ConfirmationPage, Billets, Profile, ProfileSubPages,
│                       SuggestActivity
└── utils/
    ├── types.ts       TypeScript interfaces
    ├── data.ts         Static content + asset URLs
    ├── categories.ts   Activity category list (id, emoji, tint color)
    └── theme.ts        JS-side mirror of a few color tokens, for contexts
                         Tailwind classes can't reach (Leaflet marker HTML,
                         confetti colors) — keep in sync with tailwind.config.js
```

`App.tsx` is a single-file state machine that switches between the screens above (no router).

## Design tokens (Tailwind)

Defined in `tailwind.config.js`, extended from Tailwind's defaults — always prefer a token class (`bg-primary`, `shadow-card`, `rounded-4xl`) over an arbitrary value (`bg-[#5170ff]`).

| Token | Value | Usage |
|---|---|---|
| `primary` | `#5170ff` | Brand blue — CTAs, active nav, map markers |
| `primary-light` | `#eef1ff` | Soft fill — selected category chips, icon backgrounds |
| `dark` | `#1a1a24` | Primary body text |
| `dark-warm` | `#2b211c` | Warm heading variant |
| `muted` | `#9090a0` | Secondary text, timestamps |
| `cream` | `#faf4f1` | Page background |
| `surface` | `#fdfaf9` | Card / pill background (near-white) |
| `badge-cream` | `#fbeee8` | Location badge background |
| `community` | `#fff4f2` | Review card backgrounds |
| `accent.yellow` | `#f4c841` | Star ratings |
| `accent.purple` | `#8b5cf6` | Category accent |
| `accent.orange` | `#f5a623` | Category accent, splash logo |
| `accent.coral` | `#ff6366` | Category accent, confetti |
| `accent.pink` | `#d9547a` | Alert-tone pills (e.g. "places restantes") |
| `success` | `#22c55e` | Confirmation states |
| `error` | `#ef4444` | Form validation errors |

Shadows: `shadow-card`, `shadow-hero`, `shadow-pill`, `shadow-review`, `shadow-geo`, `shadow-sheet` (bottom sheets), `shadow-chip` (small floating controls).

Radius: standard Tailwind scale plus `rounded-4xl` (32px) for bottom-sheet corners.

## Typography

`src/index.css` defines an 8-style type scale as `@layer components` classes — the intended source of truth for new work:

| Class | Family / weight / size |
|---|---|
| `.typo-h1` | Bodoni Moda, semibold, 34px |
| `.typo-h2` | Outfit, extrabold, 20px |
| `.typo-h3` | Outfit, extrabold, 18px |
| `.typo-title` | Outfit, bold, 14px |
| `.typo-body` | Outfit, regular, 14px |
| `.typo-caption` | DM Sans, 12px |
| `.typo-label` | Outfit, bold, 10px, uppercase |
| `.typo-quote` | Bodoni Moda, 12px |

Note: most existing pages predate this scale and use one-off `font-{family} font-{weight} text-[Npx]` combinations instead. Use the `typo-*` classes for all new work; migrating existing pages is a deliberate follow-up (not done mechanically, since none of the current usages share the token's exact line-height — a blind find/replace would silently change layout).

Loaded via Google Fonts:
- **Bodoni Moda** — serif display (headings, greeting, quote text)
- **Outfit** — sans-serif UI (labels, buttons, nav, card titles)
- **DM Sans** — small metadata (timestamps, distances)

## Shared components

Prefer these atoms over re-implementing inline markup:
- `PrimaryButton` — full-width primary CTA
- `BackButton` — plain chevron back button (header context, not the floating overlay variant used on `EventDetail`'s hero)
- `SafeAreaSpacer` (`size="sm" | "lg"`) — top safe-area inset spacer
- `Pill` (`tone="default" | "alert"`) — icon + label chip
- `StepperButton` (`variant="increment" | "decrement"`) — quantity +/− control

## Accessibility

- WCAG 2.1 AA colour contrast on all text
- Semantic HTML5: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`
- `aria-label` on all landmark and interactive elements
- `aria-current="page"` on active nav item
- `focus-visible` ring on all interactive elements
- `prefers-reduced-motion` support via `@layer base` CSS

## Production notes

- Some photo URLs are hosted on Unsplash/Figma CDNs — replace with owned CDN assets before final launch.
- The geolocation button wires up to the browser Geolocation API — connect success/error handlers to your real data layer.
- The Map screen's Leaflet marker HTML strings and the confirmation confetti colors read from `src/utils/theme.ts` rather than Tailwind classes (Leaflet markers are raw DOM, not React-rendered) — update that file if the primary brand color changes.
