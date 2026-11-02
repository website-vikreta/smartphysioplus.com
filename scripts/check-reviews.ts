// Usage: pnpm content:check-reviews   (runs before every build)
// Fails if any curated chip or highlight is not the patient's own words (exact substring of the text),
// contains a percentage, or if highlights overlap. Checks every entry, consent recorded or not.
import { curatedEntries } from "../src/content/reviews/curated.ts";
import { checkReview } from "../src/lib/reviews/highlights.ts";

const failures = curatedEntries.flatMap((r) =>
  checkReview(r).map((f) => `${r.id}: ${f}`),
);
const ids = curatedEntries.map((r) => r.id);
for (const id of ids)
  if (ids.indexOf(id) !== ids.lastIndexOf(id)) failures.push(`${id}: duplicate id`);

if (failures.length) {
  console.error("Curated review check failed:\n" + failures.map((f) => "  " + f).join("\n"));
  process.exit(1);
}
console.log(`Curated reviews OK (${curatedEntries.length} entries).`);
