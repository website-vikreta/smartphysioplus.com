// Usage: pnpm audit:site [baseUrl]   (run against a running build: pnpm start)
// Lighthouse (mobile and desktop) and axe on one page per template. Writes .audit/results.json,
// which scripts/launch-report.mjs turns into LAUNCH_REPORT.md. Needs Google Chrome installed.
// Budgets (promptP2.md section 12): SEO 100 on indexable pages, accessibility >= 95, LCP < 2.5s, CLS < 0.1,
// and zero serious or critical axe issues. Lab runs on localhost are a floor check, not field data.
import { mkdirSync, writeFileSync } from "node:fs";
import { existsSync } from "node:fs";
import axe from "axe-core";
import lighthouse from "lighthouse";
import desktop from "lighthouse/core/config/desktop-config.js";
import puppeteer from "puppeteer-core";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const chrome = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((p) => p && existsSync(p));
if (!chrome) throw new Error("Chrome not found. Set CHROME_PATH.");

// One page per template. `index: false` pages are noindex by design, so SEO is not scored.
const templates = [
  ["Home", "/"],
  ["Physiotherapy", "/physiotherapy/"],
  ["Services", "/services/"],
  ["Local", "/physiotherapy-baner-balewadi-pune/"],
  ["Ortho", "/orthopedic-physiotherapy/"],
  ["Neuro", "/neuro-physiotherapy/"],
  ["About", "/about/"],
  ["Doctor", "/dr-nileema-chaudhary/"],
  ["Contact", "/contact/"],
  ["Booking", "/book-appointment/"],
  ["Conditions hub", "/conditions/"],
  ["Rehabilitation hub", "/rehabilitation/"],
  ["Condition page", "/back-pain-physiotherapy/"],
  ["Rehab page", "/post-surgery-rehabilitation/"],
  ["Reviews", "/reviews/"],
  ["FAQs", "/faqs/"],
  ["Resources index", "/resources/"],
  ["Resource article", "/resources/first-physiotherapy-assessment/"],
  ["Privacy", "/privacy-policy/"],
  ["Review tool", "/review/", { index: false }],
];

// Every host except the production apex sends X-Robots-Tag: noindex and Disallow: / on purpose (src/app/robots.ts),
// so is-crawlable and robots-txt always fail on localhost. Score SEO from the other audits.
const SKIP = ["is-crawlable", "robots-txt"];
function seoScore(lhr) {
  const refs = lhr.categories.seo.auditRefs.filter(
    (a) =>
      a.weight > 0 && !SKIP.includes(a.id) && lhr.audits[a.id].score !== null,
  );
  const total = refs.reduce((n, a) => n + a.weight, 0);
  return Math.round(
    (100 * refs.reduce((n, a) => n + lhr.audits[a.id].score * a.weight, 0)) /
      total,
  );
}

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--remote-debugging-port=9222", "--no-sandbox"],
});

const results = [];
for (const [name, path, opts = {}] of templates) {
  const url = base + path;
  const row = { name, path, index: opts.index !== false };
  for (const mode of ["mobile", "desktop"]) {
    const run = await lighthouse(
      url,
      { port: 9222, output: "json", logLevel: "error" },
      mode === "desktop" ? desktop : undefined,
    );
    const { categories, audits } = run.lhr;
    row[mode] = {
      performance: Math.round((categories.performance?.score ?? 0) * 100),
      accessibility: Math.round((categories.accessibility?.score ?? 0) * 100),
      seo: seoScore(run.lhr),
      lcp: audits["largest-contentful-paint"]?.numericValue,
      cls: audits["cumulative-layout-shift"]?.numericValue,
      tbt: audits["total-blocking-time"]?.numericValue,
    };
  }
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(axe.source);
  const { violations } = await page.evaluate(() => window.axe.run());
  row.axe = violations
    .filter((v) => v.impact === "serious" || v.impact === "critical")
    .map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }));
  await page.close();
  results.push(row);
  console.log(
    `${name}: mobile perf ${row.mobile.performance} a11y ${row.mobile.accessibility} seo ${row.mobile.seo}, axe ${row.axe.length} serious/critical`,
  );
}
await browser.close();

mkdirSync(".audit", { recursive: true });
writeFileSync(
  ".audit/results.json",
  JSON.stringify({ note: process.env.AUDIT_NOTE ?? "", results }, null, 2),
);
const bad = results.flatMap((r) => [
  ...r.axe.map((a) => `${r.path} axe ${a.id} (${a.impact})`),
  ...["mobile", "desktop"].flatMap((m) => [
    ...(r.index && r[m].seo < 100 ? [`${r.path} ${m} SEO ${r[m].seo}`] : []),
    ...(r[m].accessibility < 95
      ? [`${r.path} ${m} a11y ${r[m].accessibility}`]
      : []),
    ...(r[m].cls >= 0.1 ? [`${r.path} ${m} CLS ${r[m].cls.toFixed(2)}`] : []),
    ...(m === "mobile" && r[m].lcp >= 2500
      ? [`${r.path} mobile LCP ${Math.round(r[m].lcp)}ms`]
      : []),
  ]),
]);
if (bad.length) {
  console.error(`audit: ${bad.length} budget misses:\n${bad.join("\n")}`);
  process.exit(1);
}
console.log("audit OK: all templates within budget.");
