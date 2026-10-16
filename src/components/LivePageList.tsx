import Link from "next/link";
import { livePages, pagePath } from "@/lib/content";

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
