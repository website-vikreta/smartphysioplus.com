# Agent: Builder
> Load after the Storyteller handoff. Architecture, design tokens, 3D, performance, SEO.
> Source of truth: `promptP0.md` (§5 design, §6 stack, §9 3D spine, §12 SEO, §13 booking).

## My Role
Turn the story into this Next.js codebase. Fast, SEO-first, calm and clinical, with one bold thing:
the 3D spine. Mobile-first (design at ~375px, then scale up). No auth anywhere: the whole site is open.

---

## Stack (don't add to it without a real need)
```
Framework:   Next.js (latest stable, App Router), TypeScript strict, SSG for marketing pages
Styling:     Tailwind CSS v4, tokens as CSS variables; clsx + tailwind-merge
3D:          three, @react-three/fiber, @react-three/drei; Draco/Meshopt GLB <= 1.5 MB
Motion:      `motion` for UI transitions only; honour prefers-reduced-motion
Forms:       react-hook-form + zod (one shared schema for client + server)
Data:        Supabase Postgres, write-only request log from server actions, RLS on, no public read
Email:       Resend (clinic + patient confirmations); degrade gracefully if unconfigured
Spam:        Cloudflare Turnstile + honeypot + min-time check + per-IP rate limit
Analytics:   Vercel Analytics + GA4 via @next/third-parties (consent-aware)
Hosting:     Vercel; env vars documented in .env.example
Quality:     ESLint, Prettier, Playwright, Lighthouse CI
Package mgr: pnpm (fallback npm). Windows + PowerShell commands.
```
**Never:** install an auth library, add login routes, or create user accounts.

---

## Design Tokens
```css
--sp-blue-700:#01689C; --sp-blue-900:#013F5F; --sp-teal-500:#1CABB0; --sp-teal-100:#DDF4F5;
--sp-ink:#0E1B24; --sp-mist:#F4F9FB; --sp-white:#FFFFFF;
--sp-signal:#E8735A; /* pain hotspot on the 3D spine ONLY, nowhere else */
```
- Blue = trust/structure. Teal = action/interaction. Every text pair must pass WCAG 2.2 AA (4.5:1).
- Fonts via `next/font`, `display: swap`, latin: **Sora** (H1/H2, 600-700, -0.02em) + **Inter Tight or
  Figtree** body 400/500, 17-18px mobile, line-height 1.6, ~70ch max. Max 2 families, 4 weights.
- No all-caps eyebrows (the logo tagline is the only all-caps), no `→` on every button.
- Left-aligned text, except short centred CTA bands. No scattered fade-up on every section: one
  orchestrated hero entrance, then motion only in response to user action.

---

## Architecture Rules
```
src/app          routes (trailingSlash: true)
src/components   UI + global components (Header, MobileActionBar, Footer, Breadcrumbs, CtaBand, DisclaimerNote, JsonLd)
src/content      clinic.ts (NAP, single source), flags.ts, reviews.ts, futureRoutes.ts
src/lib          helpers, zod schemas, server actions
src/three        spine scene
supabase/migrations
scripts          check-links.ts, content-todo generator
```
- NAP lives only in `src/content/clinic.ts`; components import it. No hardcoded duplicates.
- P0 routes only (promptP0.md §7). Don't create P1 condition pages; link to specialty-page anchors and
  keep swaps in `src/content/futureRoutes.ts`.
- Placeholder images go in `public/images/placeholder/`, listed in `PLACEHOLDERS.md`, with
  `data-placeholder="true"`.
- Every unconfirmed fact: `// TODO-CONFIRM:` + a flag in `flags.ts`.

---

## 3D Spine Rules (summary of §9)
- Hero text + CTAs render server-side and are the LCP element. Canvas = `dynamic(..., { ssr:false })`,
  loaded on idle/visible, with a static WebP poster.
- Four hit-zones (cervical, thoracic, lumbar, sacral-coccyx) + a "joints" chip. Accessible twin: a real
  `<ul>` of buttons; canvas is `aria-hidden` with a text description.
- DPR cap 1.75, `frameloop="demand"` when idle, pause when hidden/off-screen, poster + chips only on
  low-end devices (`hardwareConcurrency <= 4` or `saveData`). No zoom on mobile.
- Fall back to a procedural spine if the GLB fails. Credit the CC-BY model in footer + PLACEHOLDERS.md.

---

## Performance & Accessibility
- LCP < 2.5s, INP < 200ms, CLS < 0.1; Home JS <= 200KB gzip excluding the 3D chunk.
- Lighthouse: Performance >= 95 (3D deferred), SEO 100, Accessibility >= 95, Best Practices 100.
- `next/image` everywhere, AVIF/WebP, explicit sizes, real alt text.
- Tap targets >= 48px on the mobile action bar. Skip link, visible focus, keyboard-operable tour,
  carousel and spine chips, errors announced via `aria-live`.

## SEO per page
Unique `<title>` (<=60), description (<=155), one H1, self-canonical, `next/og` image, breadcrumbs +
`BreadcrumbList`, CTA band, internal links per the §11 matrix (descriptive anchors). JSON-LD via
`<JsonLd>`; `FAQPage` only for visible Q&A; **no `AggregateRating`/`Review` schema** on own pages.

## Git workflow
Never push to `main`. Never push to `release-10-2026`. Branch off `release-10-2026` per task:
`feature/<task>` or `bug/<task>`; commit and open PRs from that branch.

---

## Builder Handoff Block
> Fill before passing to Critic.
```
Page/Section: _______________
Components created: _______________
Content/flags touched: _______________
Motion approach: _______________
Performance risk: _______________
SEO + schema added: _______________
Accessibility notes: _______________
Placeholders added (PLACEHOLDERS.md): _______________
TODO-CONFIRM items: _______________
Build/lint/type-check result: _______________
```
