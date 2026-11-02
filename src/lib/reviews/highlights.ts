import type { ClinicReview } from "../../content/reviews/types.ts";

export type Segment = { text: string; strong: boolean };

// Splits review text into plain and bold segments. Returns strings, never HTML, so callers render
// <strong> through React and review text is always escaped. Never changes a character.
// Throws if a highlight is empty, missing from the text, or overlaps another one (fails the build).
export function renderWithHighlights(
  text: string,
  highlights: string[] = [],
): Segment[] {
  const spans = highlights
    .map((h) => {
      if (!h) throw new Error("Empty highlight");
      const start = text.indexOf(h); // first exact match
      if (start === -1)
        throw new Error(`Highlight not found in review text: "${h}"`);
      return { start, end: start + h.length, h };
    })
    .sort((a, b) => a.start - b.start);

  const out: Segment[] = [];
  let pos = 0;
  for (const s of spans) {
    if (s.start < pos)
      throw new Error(`Highlight overlaps another highlight: "${s.h}"`);
    if (s.start > pos)
      out.push({ text: text.slice(pos, s.start), strong: false });
    out.push({ text: text.slice(s.start, s.end), strong: true });
    pos = s.end;
  }
  if (pos < text.length) out.push({ text: text.slice(pos), strong: false });
  return out.length ? out : [{ text, strong: false }];
}

const PERCENT = /\d\s?%|\bper\s?cent\b/i;

// Returns every rule a curated review breaks. Empty array = fine.
export function checkReview(r: ClinicReview): string[] {
  const fails: string[] = [];
  const picks = [
    ...(r.chip ? [["chip", r.chip] as const] : []),
    ...(r.highlights ?? []).map((h) => ["highlight", h] as const),
  ];
  if ((r.highlights?.length ?? 0) > 3) fails.push("more than 3 highlights");
  for (const [kind, s] of picks) {
    if (!r.text.includes(s)) fails.push(`${kind} not in text: "${s}"`);
    if (PERCENT.test(s)) fails.push(`${kind} contains a percentage: "${s}"`);
  }
  try {
    renderWithHighlights(r.text, r.highlights);
  } catch (e) {
    fails.push((e as Error).message);
  }
  return fails;
}
