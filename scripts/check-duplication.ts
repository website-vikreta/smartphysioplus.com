// Usage: pnpm content:check-duplication   (runs before every build)
// Fails when two P1 pages share more than 30% of their body text (5-word shingles, Jaccard),
// or when any paragraph, summary or FAQ answer appears on two pages (promptP1.md rules 4 and 5).
import { allPages } from "../src/lib/content.ts";

const LIMIT = 0.3;
const K = 5;

const words = (s: string) =>
  s
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ") // MDX comments
    .replace(/<[^>]+>/g, " ") // JSX tags (shared components)
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // markdown links -> text
    .toLowerCase()
    .replace(/[^a-z0-9' ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const shingles = (s: string) => {
  const w = words(s);
  return new Set(
    w.slice(0, w.length - K + 1).map((_, i) => w.slice(i, i + K).join(" ")),
  );
};

const failures: string[] = [];

const sets = allPages.map((p) => ({ slug: p.slug, set: shingles(p.body) }));
for (let i = 0; i < sets.length; i++)
  for (let j = i + 1; j < sets.length; j++) {
    const a = sets[i].set;
    const b = sets[j].set;
    const shared = [...a].filter((s) => b.has(s)).length;
    const score = shared / (a.size + b.size - shared || 1);
    if (score > LIMIT)
      failures.push(
        `${sets[i].slug} and ${sets[j].slug} overlap ${(score * 100).toFixed(1)}%`,
      );
  }

// Paragraph-level: anything 8+ words long may live on one page only.
const seen = new Map<string, string>();
for (const p of allPages) {
  const chunks = [
    ...p.body.split(/\r?\n\s*\r?\n/),
    p.summary,
    ...p.faqs.map((f) => f.a),
  ];
  for (const c of chunks) {
    const key = words(c).join(" ");
    if (key.split(" ").length < 8) continue;
    const owner = seen.get(key);
    // The summary shows on the specialty page, so it must not repeat the page's own body either.
    if (owner)
      failures.push(
        `Same paragraph twice (${owner}, ${p.slug}): "${key.slice(0, 60)}..."`,
      );
    seen.set(key, p.slug);
  }
}

if (failures.length) {
  console.error(
    `check-duplication FAILED (${failures.length}):\n${failures.join("\n")}`,
  );
  process.exit(1);
}
console.log(
  `check-duplication OK: ${allPages.length} pages, max overlap under ${LIMIT * 100}%.`,
);
