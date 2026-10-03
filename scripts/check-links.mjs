// Usage: node scripts/check-links.mjs [baseUrl]   (run against a running build: pnpm start)
// 1. Every required link in the promptP0.md section 11 matrix exists in each page's own content
//    (site header, footer and mobile bar are stripped so they cannot satisfy the matrix).
// 2. Every internal link on every page returns 200.
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
// CTA band (Contact / Booking) is on every indexable page.
const all = [
  ...Object.values(P),
  "/privacy-policy/",
  "/terms-and-conditions/",
  "/disclaimer/",
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
    if (p && (await status(p)) !== 200)
      failures.push(`${page} links to ${p} (${checked.get(p)})`);
  }
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
