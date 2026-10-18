// Usage: pnpm check-links [baseUrl]   (run against a running build: pnpm start)
// 1. Every required link in the promptP0.md section 11 and promptP1.md section 7 matrices exists in each
//    page's own content (site header, footer and mobile bar are stripped so they cannot satisfy the matrix).
// 2. Every internal link on every page returns 200.
// 3. P1 review gate: live pages never link to unpublished ones, drafts are noindex, flagged-off pages 404,
//    and the sitemap lists exactly the live pages.
import { allPages, isBuilt, isLive, pagePath } from "../src/lib/content.ts";
import { flags } from "../src/content/flags.ts";
import { p2Routes, publishable } from "../src/lib/publishable.ts";
import {
  allResources,
  liveResources,
  resourcePath,
} from "../src/lib/resources.ts";

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
  reviews: "/reviews/",
};

const matrix = {
  [P.home]: [
    P.physio,
    P.local,
    P.services,
    P.ortho,
    P.neuro,
    P.doctor,
    P.book,
    P.reviews,
  ],
  [P.physio]: [P.services, P.ortho, P.neuro, P.doctor, P.book],
  [P.local]: [P.physio, P.contact, P.book, P.ortho, P.neuro],
  [P.services]: [P.ortho, P.neuro, P.physio, P.book],
  [P.ortho]: [P.physio, P.doctor, P.local, P.book],
  [P.neuro]: [P.physio, P.doctor, P.local, P.book],
  [P.doctor]: [P.physio, P.services, P.book, P.reviews],
  [P.about]: [P.doctor, P.services, P.contact, P.reviews],
  [P.reviews]: [P.doctor, P.about, P.book, "/review/"],
};
// P1 matrix (promptP1.md section 7). Only live pages are required, linked or checked against the matrix.
const live = allPages.filter(isLive);
const liveOf = (f) => live.filter(f).map((p) => pagePath(p.slug));
const unpublished = new Set([
  ...allPages.filter((p) => !isLive(p)).map((p) => pagePath(p.slug)),
  ...p2Routes.filter((r) => !r.ok).map((r) => r.path),
  ...allResources
    .filter((r) => !r.clinicallyReviewed)
    .map((r) => resourcePath(r.slug)),
]);
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
    (x) => x.relatedService === "orthopedic", // includes the local ortho page
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

// P2 hubs (promptP2.md section 11). Required only once publishable.
const hubs = { conditions: "/conditions/", rehab: "/rehabilitation/" };
const hubsLive = [
  publishable.conditionsHub && hubs.conditions,
  publishable.rehabHub && hubs.rehab,
].filter(Boolean);
if (publishable.conditionsHub) {
  for (const p of [P.home, P.physio, P.local, P.services])
    matrix[p].push(hubs.conditions);
  matrix[hubs.conditions] = [
    ...liveOf((x) => x.cluster === "condition"),
    P.ortho,
    P.neuro,
    P.book,
  ];
  if (publishable.rehabHub) matrix[hubs.conditions].push(hubs.rehab);
}
if (publishable.rehabHub) {
  for (const p of [P.physio, P.services]) matrix[p].push(hubs.rehab);
  matrix[hubs.rehab] = [
    ...liveOf((x) => x.cluster === "rehab" || x.cluster === "sports"),
    P.neuro,
    P.book,
  ];
}

// FAQs (promptP2.md section 11). Required only once publishable.
if (publishable.faqs)
  matrix["/faqs/"] = [
    P.book,
    P.contact,
    ...liveOf((x) => x.cluster === "condition"),
  ];

// Resources (promptP2.md section 11): each links to its destinations that are live, and condition pages link to
// their live related resources. The first destination is linked early and at the end (checked at build time).
const destLive = (d) => !unpublished.has(d) && d !== "/physiotherapy-at-home/";
for (const r of liveResources)
  matrix[resourcePath(r.slug)] = [...r.destinations.filter(destLive), P.book];
if (liveResources.length)
  matrix["/resources/"] = liveResources.map((r) => resourcePath(r.slug));
for (const p of live)
  matrix[pagePath(p.slug)].push(
    ...p.relatedResources
      .filter((s) => liveResources.some((r) => r.slug === s))
      .map((s) => resourcePath(s)),
  );

const HOME_VISIT = "/physiotherapy-at-home/";
if (publishable.homeVisit) matrix[HOME_VISIT] = [P.physio, P.book];

// CTA band (Contact / Booking) is on every indexable page.
const all = [
  ...Object.values(P),
  "/privacy-policy/",
  "/terms-and-conditions/",
  "/disclaimer/",
  ...allLive,
  ...hubsLive,
  ...(publishable.homeVisit ? [HOME_VISIT] : []),
  ...(publishable.faqs ? ["/faqs/"] : []),
  ...(publishable.resourcesIndex ? ["/resources/"] : []),
  ...liveResources.map((r) => resourcePath(r.slug)),
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
// Every internal link on every live page, header and footer included, for the orphan and click-depth checks.
const graph = new Map();
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
  // No Review or AggregateRating schema on any page (promptP0.md rule 5).
  if (/"@type":"(Review|AggregateRating)"/.test(html))
    failures.push(`${page} emits Review or AggregateRating schema`);
  graph.set(
    page,
    new Set(
      hrefs(html)
        .filter((h) => h.startsWith("/") && !h.startsWith("//"))
        .map(path),
    ),
  );
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
// An unpublishable hub still builds, but as noindex.
for (const r of p2Routes.filter(
  (x) => !x.ok && Object.values(hubs).includes(x.path),
)) {
  const res = await fetch(base + r.path);
  if (
    res.status === 200 &&
    !/<meta name="robots" content="noindex/.test(await res.text())
  )
    failures.push(`${r.path} is not publishable but is not noindex`);
}
// Home visit page: 404 with the flag off, a noindex draft until reviewed.
{
  const res = await fetch(base + HOME_VISIT);
  if (!flags.homeVisits && res.status !== 404)
    failures.push(
      `${HOME_VISIT} should be 404 with homeVisits off, got ${res.status}`,
    );
  if (
    flags.homeVisits &&
    !publishable.homeVisit &&
    !/name="robots" content="noindex/.test(await res.text())
  )
    failures.push(`${HOME_VISIT} is an unreviewed draft but is not noindex`);
}
// Internal review tool: reachable, noindex and nofollow, and never in the sitemap.
for (const r of ["/review/", "/review/print/"]) {
  const res = await fetch(base + r);
  const html = await res.text();
  if (res.status !== 200) failures.push(`${r} returned ${res.status}`);
  else if (!/name="robots" content="noindex, nofollow/.test(html))
    failures.push(`${r} must be noindex, nofollow`);
}
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
for (const p of allPages) {
  const listed = sitemap.includes(`${pagePath(p.slug)}</loc>`);
  if (listed !== isLive(p))
    failures.push(
      `sitemap ${listed ? "lists unpublished" : "is missing live"} page ${pagePath(p.slug)}`,
    );
}

// The review tool must never be listed.
if (sitemap.includes("/review/"))
  failures.push("sitemap lists the review tool");

// P2: the sitemap lists a P2 hub or resource exactly when src/lib/publishable.ts and the review gate say it is live.
for (const r of p2Routes)
  if (sitemap.includes(`${r.path}</loc>`) !== r.ok)
    failures.push(`sitemap and publishable.ts disagree on ${r.path}`);
for (const r of allResources)
  if (
    sitemap.includes(`${resourcePath(r.slug)}</loc>`) !== r.clinicallyReviewed
  )
    failures.push(
      `sitemap and review state disagree on ${resourcePath(r.slug)}`,
    );

// Orphans and click depth (promptP2.md section 11): every live page needs an inbound link and must be
// at most 3 clicks from Home.
const depth = new Map([[P.home, 0]]);
for (const queue = [P.home]; queue.length;) {
  const from = queue.shift();
  for (const to of graph.get(from) ?? [])
    if (graph.has(to) && !depth.has(to)) {
      depth.set(to, depth.get(from) + 1);
      queue.push(to);
    }
}
for (const page of graph.keys()) {
  if (!depth.has(page))
    failures.push(`${page} is an orphan: no link reaches it from Home`);
  else if (depth.get(page) > 3)
    failures.push(`${page} is ${depth.get(page)} clicks from Home (max 3)`);
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
