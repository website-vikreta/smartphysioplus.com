// Usage: pnpm launch-report [baseUrl]   (run against a running build: pnpm start; run `pnpm audit:site` first
// to include Lighthouse and axe). Writes LAUNCH_REPORT.md (promptP2.md section 13).
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { clinic } from "../src/content/clinic.ts";
import { flags } from "../src/content/flags.ts";
import { homeVisit } from "../src/content/homeVisit.ts";
import { routes } from "../src/content/routes.ts";
import {
  allPages,
  isBuilt,
  isLive,
  pagePath,
  reviewState,
} from "../src/lib/content.ts";
import { p2Routes, publishable } from "../src/lib/publishable.ts";
import {
  allResources,
  isResourceLive,
  resourcePath,
} from "../src/lib/resources.ts";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const get = async (p) => {
  const r = await fetch(base + p);
  return { status: r.status, html: r.status === 200 ? await r.text() : "" };
};

// ---- 1. Sitemap completeness -------------------------------------------------------------------
const sitemap = (await get("/sitemap.xml")).html;
const inSitemap = (p) => sitemap.includes(`${p}</loc>`);
const rows = [];
const add = (path, name, state) => rows.push({ path, name, state });
const p2Gate = {
  "/conditions/": "needs 3 reviewed condition pages",
  "/rehabilitation/": "needs 2 reviewed rehab or sports pages",
  "/faqs/": "needs 8 confirmed general answers",
  "/resources/": "needs 1 reviewed guide",
  "/physiotherapy-at-home/": "needs the homeVisits flag and clinical review",
};
for (const r of Object.values(routes)) {
  if (
    [
      "/conditions/",
      "/rehabilitation/",
      "/faqs/",
      "/resources/",
      "/physiotherapy-at-home/",
      "/review/",
      "/review/print/",
    ].includes(r.path)
  )
    continue;
  add(r.path, r.name, "live");
}
for (const p of allPages)
  add(
    pagePath(p.slug),
    p.title,
    isLive(p)
      ? "live"
      : !isBuilt(p)
        ? `waiting for client flag (${p.flag})`
        : "waiting for clinical review",
  );
for (const r of p2Routes) {
  const ok = r.ok;
  add(
    r.path,
    r.name,
    ok
      ? "live"
      : r.path === "/physiotherapy-at-home/" && !flags.homeVisits
        ? "waiting for client flag (homeVisits)"
        : `built as noindex: ${p2Gate[r.path]}`,
  );
}
add("/reviews/", "Reviews", "live");
for (const r of allResources)
  add(
    resourcePath(r.slug),
    r.title,
    isResourceLive(r) ? "live" : "waiting for clinical review",
  );
add("/review/", "Review request tool", "internal: noindex, not in the sitemap");
add(
  "/review/print/",
  "Printable review card",
  "internal: noindex, not in the sitemap",
);

const sitemapIssues = [];
for (const row of rows) {
  const res = await get(row.path);
  const should = row.state === "live";
  if (should && (res.status !== 200 || !inSitemap(row.path)))
    sitemapIssues.push(`${row.path} should be live but is not in the sitemap`);
  if (!should && inSitemap(row.path))
    sitemapIssues.push(`${row.path} is in the sitemap but is not live`);
  row.status = res.status;
  row.html = res.html;
}

// ---- 2. NAP consistency ------------------------------------------------------------------------
const digits = (s) => s.replace(/\D/g, "");
const ownPhone = digits(clinic.phone.e164).slice(-10);
const napIssues = [];
for (const row of rows.filter((r) => r.html)) {
  const body = row.html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " "); // visible text only: attributes and SVG paths hold digit runs that are not phone numbers
  for (const m of body.matchAll(/(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}/g))
    if (digits(m[0]).slice(-10) !== ownPhone)
      napIssues.push(`${row.path}: phone "${m[0]}" is not the clinic number`);
  for (const m of body.matchAll(/\b41\d{4}\b/g))
    if (m[0] !== clinic.address.postalCode)
      napIssues.push(`${row.path}: PIN code ${m[0]} differs from clinic.ts`);
  for (const m of body.matchAll(/\b\d{1,2}(?::\d{2})?\s?(?:am|pm)\b/gi))
    if (!/^(10|8)\s?(am|pm)$/i.test(m[0]) && !/^10:00/.test(m[0]))
      napIssues.push(`${row.path}: time "${m[0]}" is not in clinic.ts hours`);
}
// Source check: NAP strings live only in clinic.ts (and docs, which are not shipped).
const srcHits = [];
const walk = (dir) => {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (
      /\.(tsx?|mdx)$/.test(n) &&
      !p.replaceAll("\\", "/").endsWith("src/content/clinic.ts")
    ) {
      const t = readFileSync(p, "utf8");
      if (
        t.includes(ownPhone) ||
        t.includes("Sopan Baug") ||
        t.includes(clinic.address.postalCode)
      )
        srcHits.push(p.replaceAll("\\", "/"));
    }
  }
};
walk("src");
for (const f of srcHits)
  napIssues.push(
    `${f}: hardcodes a phone, street or PIN that belongs in clinic.ts`,
  );

// ---- 3. Schema inventory -----------------------------------------------------------------------
const schemaRows = [];
const types = (n) => (Array.isArray(n["@type"]) ? n["@type"] : [n["@type"]]);
for (const row of rows.filter((r) => r.html)) {
  const found = new Set();
  const problems = [];
  for (const m of row.html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    let d;
    try {
      d = JSON.parse(m[1].replace(/\\u003c/g, "<"));
    } catch {
      problems.push("invalid JSON-LD");
      continue;
    }
    for (const n of Array.isArray(d) ? d : [d]) {
      for (const t of types(n)) found.add(t);
      if (types(n).some((t) => t === "Review" || t === "AggregateRating"))
        problems.push("Review or AggregateRating");
      if (
        types(n).includes("FAQPage") &&
        !(n.mainEntity ?? []).every((q) => q.acceptedAnswer?.text)
      )
        problems.push("FAQPage question without answer");
      if (
        types(n).includes("BreadcrumbList") &&
        !(n.itemListElement ?? []).every((i) => i.position && i.name && i.item)
      )
        problems.push("BreadcrumbList item incomplete");
      if (
        types(n).includes("Article") &&
        !(n.headline && n.datePublished && n.author)
      )
        problems.push("Article missing headline, date or author");
      if (types(n).includes("Service") && !(n.serviceType && n.provider))
        problems.push("Service missing serviceType or provider");
    }
  }
  schemaRows.push({ path: row.path, types: [...found], problems });
}

// ---- 4. Link graph -----------------------------------------------------------------------------
const norm = (h) => h.split("#")[0].split("?")[0];
const live = rows.filter((r) => r.state === "live" && r.html);
const out = new Map(
  live.map((r) => [
    r.path,
    new Set(
      [...r.html.matchAll(/<a [^>]*?href="(\/[^"]*)"/g)].map((m) => norm(m[1])),
    ),
  ]),
);
const inbound = new Map(live.map((r) => [r.path, 0]));
for (const [from, set] of out)
  for (const to of set)
    if (to !== from && inbound.has(to)) inbound.set(to, inbound.get(to) + 1);
const depth = new Map([["/", 0]]);
for (const q = ["/"]; q.length;) {
  const f = q.shift();
  for (const t of out.get(f) ?? [])
    if (out.has(t) && !depth.has(t))
      (depth.set(t, depth.get(f) + 1), q.push(t));
}

// ---- 7. Placeholders ---------------------------------------------------------------------------
const placeholders = rows
  .map((r) => ({
    path: r.path,
    n: (r.html.match(/data-placeholder="true"/g) ?? []).length,
  }))
  .filter((r) => r.n);

// ---- 8 and 9. Lighthouse and axe ---------------------------------------------------------------
const auditFile = existsSync(".audit/results.json")
  ? JSON.parse(readFileSync(".audit/results.json", "utf8"))
  : null;
const audit = auditFile?.results ?? null;

// ---- Write -------------------------------------------------------------------------------------
const md = [];
const table = (head, body) =>
  [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...body.map((r) => `| ${r.join(" | ")} |`),
  ].join("\n");
const date = new Date().toISOString().slice(0, 10);
md.push(
  `# Launch report\n\nGenerated ${date} by \`pnpm launch-report\` against ${base}. Facts only: every number below was measured from the build or the source.\n`,
);

md.push(
  `## 1. Sitemap completeness\n\nChecked against the route lists in promptP0.md, promptP1.md and promptP2.md (the sitemap PDF itself was not available to the build). ${sitemapIssues.length ? `**${sitemapIssues.length} issues:**\n${sitemapIssues.map((i) => `- ${i}`).join("\n")}` : "The sitemap lists exactly the live pages."}\n`,
);
md.push(
  table(
    ["URL", "Page", "State"],
    rows.map((r) => [`\`${r.path}\``, r.name, r.state]),
  ) + "\n",
);
const counts = rows.reduce(
  (a, r) => (
    (a[r.state.split(" (")[0].split(":")[0]] =
      (a[r.state.split(" (")[0].split(":")[0]] ?? 0) + 1),
    a
  ),
  {},
);
md.push(
  `Summary: ${Object.entries(counts)
    .map(([k, v]) => `${v} ${k}`)
    .join(", ")}.\n`,
);

md.push(
  `## 2. NAP consistency\n\n${napIssues.length ? `**${napIssues.length} issues:**\n${napIssues.map((i) => `- ${i}`).join("\n")}` : `No phone, PIN code or opening time in the built HTML of ${rows.filter((r) => r.html).length} pages differs from \`clinic.ts\`, and no source file outside \`clinic.ts\` hardcodes them.`}\n`,
);

md.push(
  `## 3. Schema inventory\n\nStructural checks only (valid JSON, required properties, no Review or AggregateRating). Google's Rich Results Test is a web tool and was not run here: paste each live URL into https://search.google.com/test/rich-results after deploy.\n`,
);
md.push(
  table(
    ["URL", "JSON-LD types", "Structural check"],
    schemaRows.map((r) => [
      `\`${r.path}\``,
      r.types.join(", ") || "none",
      r.problems.length
        ? `FAIL: ${[...new Set(r.problems)].join("; ")}`
        : "pass",
    ]),
  ) + "\n",
);

md.push(
  `## 4. Link graph\n\nLive pages only. Links counted from the full page, header and footer included. Click depth is from Home.\n`,
);
md.push(
  table(
    ["URL", "Links out", "Links in", "Click depth"],
    live.map((r) => [
      `\`${r.path}\``,
      out.get(r.path).size,
      inbound.get(r.path),
      depth.get(r.path) ?? "orphan",
    ]),
  ) + "\n",
);
const orphans = live.filter((r) => !depth.has(r.path));
const deep = live.filter((r) => depth.get(r.path) > 3);
md.push(
  `Orphans: ${orphans.length ? orphans.map((r) => `\`${r.path}\``).join(", ") : "none"}. Deeper than 3 clicks: ${deep.length ? deep.map((r) => `\`${r.path}\``).join(", ") : "none"}.\n`,
);

md.push(
  `## 5. Content state: waiting for Dr. Nileema Chaudhary\n\nA page goes live when its flag (if any) is on and its frontmatter has \`clinicallyReviewed: true\` and a \`reviewedAt\` date. \`pnpm content:review-status\` prints the same list for P1.\n`,
);
const review = [
  ...allPages.map((p) => [pagePath(p.slug), p.title, "P1", reviewState(p)]),
  ...allResources.map((r) => [
    resourcePath(r.slug),
    r.title,
    "P2 guide",
    isResourceLive(r) ? "live" : "draft",
  ]),
  [
    "/physiotherapy-at-home/",
    "Physiotherapy at home",
    "P2",
    !flags.homeVisits
      ? "off (flag: homeVisits)"
      : homeVisit.clinicallyReviewed
        ? "live"
        : "draft",
  ],
];
md.push(
  `### Sign-off checklist (print this)\n\nRead each draft, including the red-flag box and the FAQs, then tick, sign and date.\n`,
);
md.push(
  table(
    ["Reviewed", "Page", "URL", "State now", "Signature and date"],
    review
      .filter((r) => r[3] !== "live")
      .map((r) => ["[ ]", r[1], `\`${r[0]}\``, r[3], "&nbsp;"]),
  ) + "\n",
);

const todo = existsSync("CONTENT_TODO.md")
  ? readFileSync("CONTENT_TODO.md", "utf8")
  : "";
md.push(
  `## 6. Client confirmations\n\nRegenerate with \`pnpm content-todo\` before reading. Items by group, each needing the clinic's confirmation before its flag in \`src/content/flags.ts\` is switched on. Flags now on: ${
    Object.entries(flags)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(", ") || "none"
  }.\n`,
);
md.push(
  todo
    .split("\n")
    .filter((l) => l.startsWith("## ") || l.startsWith("- `"))
    .map((l) => (l.startsWith("## ") ? `\n#${l}` : l))
    .join("\n") + "\n",
);

md.push(
  `## 7. Placeholders\n\nImages still marked \`data-placeholder="true"\`. Details and replacements are in PLACEHOLDERS.md.\n`,
);
md.push(
  placeholders.length
    ? table(
        ["URL", "Placeholder images"],
        placeholders.map((r) => [`\`${r.path}\``, r.n]),
      ) + "\n"
    : "None.\n",
);

md.push(`## 8. Performance (Lighthouse)\n`);
if (audit) {
  md.push(
    `${auditFile.note ? `${auditFile.note}\n\n` : ""}Lab runs on a local production build, one page per template. LCP and CLS are lab values; INP is a field metric and needs real-user data after launch (Total Blocking Time is shown instead). Budgets: LCP under 2.5s on mobile, CLS under 0.1, SEO 100 on indexable pages.\n`,
  );
  const f = (x, d = 0) => (x == null ? "-" : x.toFixed(d));
  md.push(
    table(
      [
        "Template",
        "URL",
        "Mobile perf",
        "Mobile LCP (s)",
        "CLS",
        "TBT (ms)",
        "Desktop perf",
        "SEO",
        "A11y",
      ],
      audit.map((r) => [
        r.name,
        `\`${r.path}\``,
        r.mobile.performance,
        f(r.mobile.lcp / 1000, 1),
        f(r.mobile.cls, 3),
        f(r.mobile.tbt),
        r.desktop.performance,
        r.index ? Math.min(r.mobile.seo, r.desktop.seo) : "noindex",
        Math.min(r.mobile.accessibility, r.desktop.accessibility),
      ]),
    ) + "\n",
  );
} else
  md.push("Not run. Run `pnpm audit:site`, then regenerate this report.\n");

md.push(`## 9. Accessibility (axe)\n`);
if (audit) {
  const bad = audit.filter((r) => r.axe.length);
  md.push(
    bad.length
      ? `**Serious or critical issues:**\n${bad.map((r) => `- \`${r.path}\`: ${r.axe.map((a) => `${a.id} (${a.impact}, ${a.nodes} nodes)`).join(", ")}`).join("\n")}\n`
      : `Zero serious or critical issues on all ${audit.length} templates.\n`,
  );
} else
  md.push("Not run. Run `pnpm audit:site`, then regenerate this report.\n");

md.push(
  `## 10. Go-live operations\n\nSee DEPLOY.md, section "Go-live checklist": Search Console resubmission, requesting indexing, Google Business Profile links, retiring the Grexa microsite, the .in to .com redirect and the weekly review rhythm.\n`,
);
writeFileSync("LAUNCH_REPORT.md", md.join("\n"));
console.log(
  `LAUNCH_REPORT.md written. Sitemap issues: ${sitemapIssues.length}, NAP issues: ${napIssues.length}, orphans: ${orphans.length}.`,
);
if (
  sitemapIssues.length ||
  napIssues.length ||
  orphans.length ||
  deep.length ||
  schemaRows.some((r) => r.problems.length)
)
  process.exit(1);
