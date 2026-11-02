// Run: pnpm test:reviews
import assert from "node:assert/strict";
import { test } from "node:test";
import { checkReview, renderWithHighlights } from "./highlights.ts";

const join = (s: { text: string }[]) => s.map((x) => x.text).join("");

test("wraps a phrase and keeps every character", () => {
  const text = "Dr. Nileema is very polite. Really happy.";
  const segs = renderWithHighlights(text, ["very polite"]);
  assert.equal(join(segs), text);
  assert.deepEqual(
    segs.filter((s) => s.strong).map((s) => s.text),
    ["very polite"],
  );
});

test("handles emoji and line breaks", () => {
  const text = "Great care 😊\nLoved it 🙏 truly";
  const segs = renderWithHighlights(text, ["😊\nLoved", "truly"]);
  assert.equal(join(segs), text);
  assert.equal(segs.filter((s) => s.strong).length, 2);
});

test("repeated phrase: only the first match is bold", () => {
  const text = "good staff, good clinic";
  const segs = renderWithHighlights(text, ["good"]);
  assert.equal(join(segs), text);
  assert.equal(segs.filter((s) => s.strong).length, 1);
  assert.equal(segs[0].strong, true);
});

test("highlights given out of order still render in text order", () => {
  const segs = renderWithHighlights("one two three", ["three", "one"]);
  assert.deepEqual(
    segs.map((s) => s.text),
    ["one", " two ", "three"],
  );
});

test("no highlights returns the text untouched", () => {
  assert.deepEqual(renderWithHighlights("hello"), [
    { text: "hello", strong: false },
  ]);
});

test("a missing substring throws", () => {
  assert.throws(() => renderWithHighlights("hello", ["bye"]), /not found/);
});

test("overlapping highlights throw", () => {
  assert.throws(
    () => renderWithHighlights("very polite doctor", ["very polite", "polite doctor"]),
    /overlaps/,
  );
});

test("checkReview flags a fake chip, fake highlight and a percentage", () => {
  const base = {
    id: "x",
    source: "google" as const,
    authorName: "A",
    rating: 5 as const,
    text: "Felt 95% better after a week.",
    publishedAt: "2026-06-01",
  };
  assert.deepEqual(checkReview({ ...base, chip: "after a week" }), []);
  assert.ok(checkReview({ ...base, chip: "painless" }).length > 0);
  assert.ok(checkReview({ ...base, highlights: ["made up"] }).length > 0);
  assert.ok(checkReview({ ...base, highlights: ["95% better"] }).length > 0);
});
