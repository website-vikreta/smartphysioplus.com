// Usage: pnpm content:check-faqs   (runs before every build)
// Fails on a repeated FAQ id, or on near-duplicate questions across /faqs/, the P0 FAQ file and every P1 page
// (one canonical home per question, promptP2.md rule 4).
import { faqs, liveFaqs } from "../src/content/faqs.ts";
import { neuroFaq, physioFaq } from "../src/content/faq.ts";
import { homeVisit } from "../src/content/homeVisit.ts";
import { allPages } from "../src/lib/content.ts";

const words = (s: string) =>
  new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9' ]+/g, " ")
      .split(/\s+/)
      .filter(Boolean),
  );

const similar = (a: string, b: string) => {
  const x = words(a);
  const y = words(b);
  const shared = [...x].filter((w) => y.has(w)).length;
  return shared / (x.size + y.size - shared || 1) >= 0.7;
};

const failures: string[] = [];
const ids = new Set<string>();
for (const f of faqs) {
  if (ids.has(f.id)) failures.push(`Duplicate FAQ id "${f.id}"`);
  ids.add(f.id);
}

const others = [
  ...physioFaq.map((f) => ({ q: f.q, where: "physiotherapy" })),
  ...neuroFaq.map((f) => ({ q: f.q, where: "neuro-physiotherapy" })),
  ...homeVisit.faqs.map((f) => ({ q: f.q, where: "physiotherapy-at-home" })),
  ...allPages.flatMap((p) => p.faqs.map((f) => ({ q: f.q, where: p.slug }))),
];
for (const f of faqs) {
  if (f.home === "faqs" && !f.answer)
    failures.push(`"${f.id}" lives on /faqs/ but has no answer`);
  if (f.home !== "faqs" && !f.href)
    failures.push(`"${f.id}" is owned by ${f.home} but has no href`);
}
for (const f of liveFaqs)
  if (f.answer?.startsWith("TODO-CONFIRM"))
    failures.push(`"${f.id}" is live but its answer is still unconfirmed`);
faqs.forEach((f, i) => {
  for (const g of faqs.slice(i + 1))
    if (similar(f.question, g.question))
      failures.push(`"${f.question}" and "${g.question}" are near-duplicates`);
  for (const o of others)
    if (o.where !== f.home && similar(f.question, o.q))
      failures.push(`"${f.question}" repeats a question owned by ${o.where}`);
});

if (failures.length) {
  console.error(
    `check-faqs FAILED (${failures.length}):\n${failures.join("\n")}`,
  );
  process.exit(1);
}
console.log(`check-faqs OK: ${faqs.length} FAQs.`);
