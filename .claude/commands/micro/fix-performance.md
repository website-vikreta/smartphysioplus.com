# Command: /fix-performance
> Diagnose and fix a performance issue on a page or component.

## Load
Performance section of `.claude/agents/builder.md` and `promptP0.md` §9 + §12.

## Input
Route/component, failing metric (LCP / CLS / INP / TTFB / bundle), Lighthouse score if known.

## Budget
LCP < 2.5s, INP < 200ms, CLS < 0.1, Home JS <= 200KB gzip excluding the lazy 3D chunk, Lighthouse
Performance >= 95 with 3D deferred.

## Diagnosis
**LCP:** is the LCP the server-rendered hero text (not the canvas)? Is the 3D chunk `dynamic` with
`ssr:false`, loaded on idle/visible with a WebP poster? Is the logo `priority`? Are fonts via `next/font`?
**CLS:** images with explicit size or `fill` in a sized box; canvas/poster reserve their space; map is a
click-to-load facade; sticky bar doesn't shift content.
**INP:** heavy handlers on scroll/pointer; spine hover work per frame; animating layout properties.
**3D cost:** GLB <= 1.5 MB (Draco/Meshopt, <= 60k triangles), DPR cap 1.75, `frameloop="demand"`, pause
off-screen/hidden, poster + chips only when `hardwareConcurrency <= 4` or `saveData`.
**Bundle:** run `pnpm build`, inspect output; look for accidental heavy imports (three on non-3D pages,
analytics before consent) and unused deps.

## Output
Root cause, code fix on a `bug/<task>` branch off `release-10-2026`, expected Lighthouse delta.
