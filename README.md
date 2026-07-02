# SARGA Rally

A high-fidelity, production-quality marketing site for **SARGA Rally** — a
premium motorsport ecosystem and rally-experience platform. Cinematic,
dark-luxury, race-week atmosphere; built to drive event registrations and ticket
sales.

> Structurally and emotionally inspired by premium race-destination sites
> (F1-style race-weekend storytelling), fully re-imagined as an original SARGA
> Rally experience. No source code was cloned.

## Stack

| Concern    | Choice                          |
| ---------- | ------------------------------- |
| Framework  | React 18 + TypeScript           |
| Build      | Vite 6                          |
| Styling    | Tailwind CSS v4 (`@theme`)      |
| State      | Zustand                         |
| Animation  | Framer Motion                   |
| Sliders    | Swiper                          |
| Icons      | Lucide React                    |
| Video      | React Player                    |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build → dist/
npm run preview  # preview the production build
```

## Sections

A single immersive landing page (`src/pages/HomePage.tsx`) composed of:

1. **Hero** — fullscreen video/parallax background, mega title, live countdown, CTAs
2. **About** — editorial storytelling, animated stats, interactive history timeline
3. **Race Weekend** — four-day F1-style schedule cards (practice → final)
4. **Experiences** — alternating editorial rows for each experience zone
5. **Drivers** — Swiper showcase with number-forward driver cards
6. **Leaderboard** — animated driver/team championship standings
7. **Media** — filterable media hub with a React-Player lightbox
8. **Tickets** — five tiers + a slide-over checkout drawer (Zustand)
9. **Sponsors** — title spotlight + animated partner marquees
10. **FAQ** — accordion, categorised
11. **Join CTA** — final conversion band with countdown

Plus a scroll-aware **Navbar** (transparent → dark) with a full-screen mobile
menu, and a rich **Footer** with newsletter capture.

## Architecture

```
src/
  components/
    layout/      Navbar, Footer, TicketDrawer
    ui/          Reusable primitives (Button, Countdown, SmartImage, …)
  sections/      One file per page section
  pages/         HomePage
  hooks/         useCountdown, useScrollProgress, useCountUp
  store/         Zustand UI store
  data/          Typed dummy data (swap for API calls later)
  types/         Domain types (API-shaped)
  utils/         cn, formatting, asset resolution
```

### Data & assets

All content lives as typed dummy data in `src/data/`, shaped to resemble a
future REST/GraphQL contract — components never hard-code content. Media
resolves through `src/utils/assets.ts`, which prefers real files under
`/public/assets/**` and otherwise serves deterministic, subject-matched
placeholders with a branded gradient fallback. See
[`public/assets/README.md`](public/assets/README.md).

To wire a real backend, replace the imports in `src/data/*` with fetches — the
types and component props stay identical.

## Design system

Defined in `src/index.css` via Tailwind v4 `@theme`. Near-black layered
surfaces + the official SARGA Pantone palette:

| Token       | Pantone   | Hex       | Role                         |
| ----------- | --------- | --------- | ---------------------------- |
| `crimson`   | 485 C     | `#da291c` | Apex Crimson — primary accent |
| `ignition`  | 1505 C    | `#ff6a13` | Ignition Orange — hot accent  |
| `yellow`    | 116 C     | `#ffcd00` | Electric Yellow               |
| `teal`      | 3115 C    | `#00a9ce` | Slipstream Teal               |
| `blue`      | 286 C     | `#0033a0` | Draftline Blue                |

Each section carries its own accent-tinted dark surface (`oxblood`, `abyss`,
`teal-night`, `void`) plus a layered decorative treatment via
`<SectionDecor/>` — technical grids/dots/diagonals, accent glows, and SVG
ornaments (racing chevrons, timing rings, checkered flag, contour lines).
Type is an editorial Archivo / Sora pairing. Motion is subtle and intentional
(masked headline reveals, scroll parallax, count-ups) and respects
`prefers-reduced-motion`.
# sarga-rallycross
