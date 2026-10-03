@AGENTS.md

# Smart Physio+ (smartphysioplus.com)

Robotic physiotherapy clinic in Balewadi, Pune. Spec: `promptP0.md`. Agents and commands: `.claude/`.

## Git

Never push to `main` or `release-10-2026`. Branch off `release-10-2026` per task: `feature/<task>` or `bug/<task>`; PRs target `release-10-2026`.

## Ground rules

1. Facts only (`promptP0.md` section 3). Unconfirmed facts (section 4) go behind `// TODO-CONFIRM:` + a flag in `src/content/flags.ts`.
2. Medical copy is assessment-led: "may help", no cure/guarantee/"painless"/"best in Pune", no prices. Clinical pages link to `/disclaimer/`.
3. No fabricated reviews; no `AggregateRating`/`Review` schema on our own pages.
4. NAP lives only in `src/content/clinic.ts`.
5. No auth, login routes or user accounts. Booking is an open request form.
6. Placeholder images: `public/images/placeholder/`, listed in `PLACEHOLDERS.md`, with `data-placeholder="true"`.
7. Plain, active, sentence-case copy. No AI filler.

## Layout

`src/app` routes (`trailingSlash: true`) | `src/components` | `src/content` | `src/lib` | `src/three` | `supabase/migrations` | `scripts`

## Commands (PowerShell, pnpm)

`pnpm dev` | `pnpm build` | `pnpm lint` | `pnpm typecheck` | `pnpm format`
