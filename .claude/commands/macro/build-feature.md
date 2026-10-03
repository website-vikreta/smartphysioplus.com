# Command: /build-feature
> Build one feature or component (spine, tour, booking stepper, filterable services grid, etc.).

## Step 0 — Branch
Branch off `release-10-2026` first: `feature/<task>` (or `bug/<task>` for a fix). Never push to `main`
or `release-10-2026`.

## Step 1 — Scope
- Find the feature's spec in `promptP0.md` (§8 global components, §9 spine, §13 booking, §10 pages).
- Check what already exists in `src/components`, `src/lib`, `src/content` and reuse it.
- State the acceptance check from §14 for the current phase.

## Step 2 — Build
Follow `.claude/agents/builder.md`. Rules that bite:
- No auth, no new dependency a few lines cover, NAP only from `src/content/clinic.ts`.
- Unconfirmed facts behind `TODO-CONFIRM` + a flag in `flags.ts`.
- Validation with a shared zod schema; secrets (Supabase service key, Resend) server-side only.
- Accessible twin for anything interactive in 3D; honour `prefers-reduced-motion`.

## Step 3 — Verify
`pnpm build`, lint, type-check, plus the relevant Playwright/`check-links` check. Run `/audit-component`
on new UI. Report results honestly, including failures.

## Step 4 — Wrap up
Update `PLACEHOLDERS.md` / `CONTENT_TODO.md` as needed, log any new convention in `.claude/learning.md`,
commit on the task branch and open a PR targeting `release-10-2026` (only when asked).
