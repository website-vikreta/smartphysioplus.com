// Usage: pnpm check-links [baseUrl]   (run against a running build: pnpm start)
// 1. Every required link in the promptP0.md section 11 and promptP1.md section 7 matrices exists in each
//    page's own content (site header, footer and mobile bar are stripped so they cannot satisfy the matrix).
// 2. Every internal link on every page returns 200.
// 3. P1 review gate: live pages never link to unpublished ones, drafts are noindex, flagged-off pages 404,
//    and the sitemap lists exactly the live pages.
import { allPages, isBuilt, isLive, pagePath } from "../src/lib/content.ts";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

const P = {
  home: "/",
  physio: "/physiotherapy/",
  local: "/physiotherapy-baner-balewadi-pune/",
  services: "/services/",
  ortho: "/orthopedic-physiotherapy/",
  neuro: "/neuro-physiotherapy/",
  doctor: "/dr-nileema-chaudhary/",
  about: "/about/",
  contact: "/contact/",
  book: "/book-appointment/",
};

const matrix = {
  [P.home]: [P.physio, P.local, P.services, P.ortho, P.neuro, P.doctor, P.book],
  [P.physio]: [P.services, P.ortho, P.neuro, P.doctor, P.book],
  [P.local]: [P.physio, P.contact, P.book, P.ortho, P.neuro],
  [P.services]: [P.ortho, P.neuro, P.physio, P.book],
  [P.ortho]: [P.physio, P.doctor, P.local, P.book],
  [P.neuro]: [P.physio, P.doctor, P.local, P.book],
  [P.doctor]: [P.physio, P.services, P.book],
  [P.about]: [P.doctor, P.services, P.contact],
};
// P1 matrix (promptP1.md section 7). Only live pages are required, linked or checked against the matrix.
const live = allPages.filter(isLive);
const liveOf = (f) => live.filter(f).map((p) => pagePath(p.slug));
const unpublished = new Set(
  allPages.filter((p) => !isLive(p)).map((p) => pagePath(p.slug)),
);
const relatedLive = (p) =>
  [...p.relatedConditions, ...p.relatedRehab]
    .map(pagePath)
    .filter((x) => !unpublished.has(x));
const specialty = {
  orthopedic: P.ortho,
  neuro: P.neuro,
  physiotherapy: P.physio,
};

for (const p of live) {
  const own = pagePath(p.slug);
  matrix[own] =
    p.cluster === "condition"
      ? [
          specialty[p.relatedService],
          P.local,
          P.book,
          P.doctor,
          ...relatedLive(p),
        ]
      : p.cluster === "service-local"
        ? [
            P.ortho,
            P.local,
            P.contact,
            P.book,
            ...liveOf(
              (x) =>
                x.relatedService === "orthopedic" &&
                x.cluster !== "service-local",
            ),
          ]
        : [P.physio, P.doctor, P.book, ...relatedLive(p)];
}
const allLive = liveOf(() => true);
matrix[P.physio].push(...allLive);
matrix[P.services].push(...allLive);
matrix[P.ortho].push(
  ...liveOf(
    (x) => x.relatedService === "orthopedic" && x.cluster !== "service-local",
  ),
);
matrix[P.neuro].push(...liveOf((x) => x.relatedService === "neuro"));
matrix[P.home].push(
  ...[
    "back-pain-physiotherapy",
    "neck-pain-physiotherapy",
    "knee-pain-physiotherapy",
  ]
    .map(pagePath)
    .filter((x) => allLive.includes(x)),
);

// CTA band (Contact / Booking) is on every indexable page.
const all = [
  ...Object.values(P),
  "/privacy-policy/",
  "/terms-and-conditions/",
  "/disclaimer/",
  ...allLive,
];

const hrefs = (html) =>
  [...html.matchAll(/<a [^>]*?href="([^"]+)"/g)].map((m) => m[1]);
const strip = (html) =>
  html
    .replace(/<header[\s\S]*?<\/header>/g, "")
    .replace(/<footer[\s\S]*?<\/footer>/g, "")
    .replace(/<nav aria-label="Quick actions"[\s\S]*?<\/nav>/g, "");
const path = (h) => h.split("#")[0].split("?")[0];

const failures = [];
const checked = new Map();
const status = async (p) => {
  if (!checked.has(p))
    checked.set(p, (await fetch(base + p, { redirect: "manual" })).status);
  return checked.get(p);
};

for (const page of all) {
  const res = await fetch(base + page);
  if (res.status !== 200) {
    failures.push(`${page} returned ${res.status}`);
    continue;
  }
  const html = await res.text();
  const own = new Set(hrefs(strip(html)).map(path));
  const required = new Set([...(matrix[page] ?? [])]);
  if (
    page !== P.home &&
    !page.includes("policy") &&
    !page.includes("terms") &&
    !page.includes("disclaimer")
  ) {
    required.add(P.book); // CTA band
  }
  for (const r of required)
    if (!own.has(r)) failures.push(`${page} is missing a link to ${r}`);

  for (const h of hrefs(html)) {
    if (!h.startsWith("/") || h.startsWith("//")) continue;
    const p = path(h);
    if (unpublished.has(p))
      failures.push(`${page} links to unpublished page ${p}`);
    if (p && (await status(p)) !== 200)
      failures.push(`${page} links to ${p} (${checked.get(p)})`);
  }
}

// Review gate: drafts render noindex, flagged-off pages are not generated, sitemap = live pages.
for (const p of allPages.filter((x) => !isLive(x))) {
  const res = await fetch(base + pagePath(p.slug));
  if (!isBuilt(p)) {
    if (res.status !== 404)
      failures.push(
        `${pagePath(p.slug)} is flagged off but returned ${res.status}`,
      );
  } else if (!/<meta name="robots" content="noindex/.test(await res.text()))
    failures.push(`${pagePath(p.slug)} is a draft but is not noindex`);
}
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
for (const p of allPages) {
  const listed = sitemap.includes(`${pagePath(p.slug)}</loc>`);
  if (listed !== isLive(p))
    failures.push(
      `sitemap ${listed ? "lists unpublished" : "is missing live"} page ${pagePath(p.slug)}`,
    );
}

if (failures.length) {
  console.error(
    `check-links FAILED (${failures.length}):\n` + failures.join("\n"),
  );
  process.exit(1);
}
console.log(
  `check-links OK: ${all.length} pages, ${checked.size} unique internal links.`,
);
