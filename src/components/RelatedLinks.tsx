import Link from "next/link";
import { specialtyRoute } from "@/content/breadcrumbs";
import { routes } from "@/content/routes";
import { liveResources, resourcePath } from "@/lib/resources";
import { type ContentPage, getPage, isLive, pagePath } from "@/lib/content";

// Related links for P1 pages (promptP1.md section 7). Unpublished pages are never linked.
export function RelatedLinks({ page }: { page: ContentPage }) {
  const related = [...page.relatedConditions, ...page.relatedRehab]
    .map((s) => getPage(s)!)
    .filter(isLive)
    .map((p) => ({ href: pagePath(p.slug), label: p.title }));

  const guides = page.relatedResources
    .map((s) => liveResources.find((r) => r.slug === s))
    .filter((r) => !!r)
    .map((r) => ({ href: resourcePath(r.slug), label: r.title }));

  const specialty = specialtyRoute(page);
  const links = [
    ...related,
    ...guides,
    page.cluster === "condition"
      ? {
          href: specialty.path,
          label: `More on ${specialty.name.toLowerCase()}`,
        }
      : {
          href: routes.physiotherapy.path,
          label: "How physiotherapy works at Smart Physio+",
        },
    page.cluster === "condition" && {
      href: routes.local.path,
      label: "Our clinic for Baner and Balewadi",
    },
    { href: routes.doctor.path, label: "About Dr. Nileema Chaudhary" },
    { href: routes.book.path, label: "Request an appointment" },
  ].filter((l) => !!l);

  return (
    <nav aria-label="Related pages" data-related>
      <h2 className="text-xl font-semibold text-sp-blue-900">Related pages</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="sp-tag sp-btn-line inline-flex min-h-11 items-center px-5 text-sm"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
