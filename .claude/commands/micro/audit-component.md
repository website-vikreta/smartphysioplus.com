# Command: /audit-component
> Quick design, safety and performance audit on one component.

## Load
`.claude/agents/critic.md` (rubric + automatic fails) and the tokens in `.claude/agents/builder.md`.

## Input
Component path or pasted code.

## Checks
- [ ] Colours via tokens (`--sp-*`), no stray hex; `--sp-signal` only on the 3D spine hotspot
- [ ] Text pairs pass WCAG 2.2 AA (4.5:1)
- [ ] Fonts: Sora (headings) + one body family via `next/font`; no all-caps eyebrows
- [ ] Interactive elements keyboard-operable, visible focus, 44-48px tap targets on mobile
- [ ] Phone/address/hours imported from `src/content/clinic.ts`, nothing hardcoded
- [ ] Unconfirmed facts behind `TODO-CONFIRM` + a flag; no invented claims, prices, ratings
- [ ] Assessment-led wording; clinical pages link to `/disclaimer/`
- [ ] `next/image` with real alt text; placeholders have `data-placeholder="true"` + a `PLACEHOLDERS.md` entry
- [ ] Links are descriptive and not dead; matches §11 link matrix where relevant
- [ ] Motion respects `prefers-reduced-motion`; transform/opacity only
- [ ] No auth code; no secrets or service keys reachable from the client
- [ ] Reads correctly at ~375px (mobile-first)

## Output
Pass/Fail per check, exact lines to fix, and a fixed version.
