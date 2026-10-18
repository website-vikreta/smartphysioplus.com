import Link from "next/link";
import { routes } from "@/content/routes";
import { livePages, pagePath } from "@/lib/content";
import { publishable } from "@/lib/publishable";

const groups = [
  { title: "Conditions we treat", clusters: ["condition"] },
  { title: "Rehabilitation and sport", clusters: ["rehab", "sports"] },
  { title: "Near you", clusters: ["service-local"] },
];

// Every live P1 page, grouped (promptP1.md section 7). Renders nothing until a page is reviewed.
export function LivePageList() {
  const filled = groups
    .map((g) => ({
      ...g,
      pages: livePages.filter((p) => g.clusters.includes(p.cluster)),
    }))
    .filter((g) => g.pages.length > 0);
  if (!filled.length) return null;
  return (
    <div className="mt-10 grid gap-8 md:grid-cols-3">
      {filled.map((g) => (
        <div key={g.title}>
          <h2 className="text-xl font-semibold text-sp-blue-900">{g.title}</h2>
          <ul className="mt-3 space-y-2">
            {g.pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={pagePath(p.slug)}
                  className="text-sp-blue-700 underline"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Links to the P2 hubs that are publishable. Renders nothing otherwise. */
export function HubLinks() {
  const hubs = [
    publishable.conditionsHub && routes.conditions,
    publishable.rehabHub && routes.rehabilitation,
  ].filter((r) => !!r);
  if (!hubs.length) return null;
  return (
    <p className="mt-8">
      See all:{" "}
      {hubs.map((r, i) => (
        <span key={r.path}>
          {i > 0 && " · "}
          <Link href={r.path} className="text-sp-blue-700 underline">
            {r.name}
          </Link>
        </span>
      ))}
    </p>
  );
}
