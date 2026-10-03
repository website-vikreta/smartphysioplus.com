# Command: /design-page
> Full pipeline for a new page. Do not skip steps, do not jump to code.

Only P0 routes in `promptP0.md` §7 exist. Don't scaffold P1 condition pages or `/blog`.

## Step 0 — Branch
Branch off `release-10-2026`: `feature/<page-name>`. Never work on or push to `main` or `release-10-2026`.

## Step 1 — Load Context
Read the page's spec in `promptP0.md` §10, the facts in §3, flags in §4, and the link matrix in §11.

## Step 2 — Storyteller Pass
Load `.claude/agents/storyteller.md`. Answer its questions, write H1 + meta, and fill the
Storyteller Handoff Block.

## Step 3 — Builder Pass
Load `.claude/agents/builder.md`. Define sections, components, motion, SEO/schema plan, flags needed.
Fill the Builder Handoff Block.

## Step 4 — Critic Pass
Load `.claude/agents/critic.md`. Score, check Automatic Fails, output the verdict.
Revision route Storyteller/Builder → go back. Ship → implement.

## Step 5 — Implement
Write the code. Run `pnpm build`, lint and type-check; stop and summarise for review.
Update `PLACEHOLDERS.md` and `CONTENT_TODO.md` if relevant, and log reusable lessons in `.claude/learning.md`.
