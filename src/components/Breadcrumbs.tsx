import Link from "next/link";
import { routes } from "@/content/routes";
import { absoluteUrl } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

type Crumb = { name: string; path: string };

// Pass the trail after Home; the last item is the current page.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: routes.home.name, path: routes.home.path }, ...items];
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-6xl px-4 py-3 text-sm"
      >
        <ol className="flex flex-wrap items-center gap-x-2">
          {trail.map((c, i) => (
            <li key={c.path} className="flex items-center gap-x-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === trail.length - 1 ? (
                <span aria-current="page">{c.name}</span>
              ) : (
                <Link href={c.path} className="text-sp-blue-700 underline">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: absoluteUrl(c.path),
          })),
        }}
      />
    </>
  );
}
