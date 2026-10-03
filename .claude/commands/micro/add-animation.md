# Command: /add-animation
> Add or improve one animation on an existing component.

## Load
`.claude/agents/builder.md` (tokens + 3D rules) and `.claude/learning.md`.

## Input
Component/file, element, trigger (hover / click / scroll / load).

## Rules
1. **Motion is for response to user action**, not decoration. One orchestrated hero entrance; no
   fade-up on every section.
2. UI transitions (stepper, sheet, tour, chip expand, tech-card carousel) use `motion` or plain CSS
   `transition` at 0.2-0.3s. No second animation library.
3. 3D motion lives in `src/three`: idle auto-rotate stops on first interaction; `frameloop="demand"`
   when idle; pause when hidden/off-screen.
4. Always honour `prefers-reduced-motion` (disable or replace with an instant state change).
5. Animate `transform`/`opacity` only; never `width`/`height`/`top`/`left`. No layout shift.
6. Nothing animates above the fold on first paint except the single hero entrance, and it must not
   delay LCP.
7. Confirmation micro-interactions (checkmark, progress step) are welcome; they must also work without motion.

## Output
Modified component only. Log any new reusable convention in `.claude/learning.md`.
