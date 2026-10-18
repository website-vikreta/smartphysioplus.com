import Link from "next/link";
import { ConditionsExplorer } from "@/components/ConditionsExplorer";
import { DraftBanner } from "@/components/DraftBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { routes } from "@/content/routes";
import { livePages, pagePath } from "@/lib/content";
import { publishable } from "@/lib/publishable";
import { collectionSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "Conditions We Treat | Smart Physio+ Balewadi, Pune";
const description =
  "Back, neck, knee, shoulder and joint conditions we assess and treat at Smart Physio+ in Balewadi, Pune. Every plan starts with an assessment.";

export const metadata = pageMetadata({
  title,
  description,
  path: routes.conditions.path,
  noindex: !publishable.conditionsHub,
});

// Lists live condition pages only; never a draft (promptP2.md rule 5).
export default function ConditionsHub() {
  const conditions = livePages.filter((p) => p.cluster === "condition");
  return (
    <PageShell
      crumbs={[{ name: routes.conditions.name, path: routes.conditions.path }]}
      concern="not_sure"
    >
      {!publishable.conditionsHub && (
        <DraftBanner>
          Draft: needs at least 3 clinically reviewed condition pages. Not
          indexed and not linked from the site.
        </DraftBanner>
      )}
      <PageHeading
        title="Conditions we treat"
        intro={
          <p className="text-base">
            Pain in one area often comes from somewhere else. That is why every
            plan starts with an assessment. Pick the area that hurts to see the
            conditions we see most, or book an assessment if you are not sure.
          </p>
        }
      />
      <Section>
        <ConditionsExplorer
          cards={conditions.map((p) => ({
            slug: p.slug,
            title: p.title,
            summary: p.summary,
            area: p.bodyArea!,
            href: pagePath(p.slug),
          }))}
        />
        <nav aria-label="Also see" className="mt-10">
          <h2 className="text-xl font-semibold text-sp-blue-900">Also see</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {[routes.ortho, routes.neuro, routes.rehabilitation].map((r) => (
              <li key={r.path}>
                <Link
                  href={r.path}
                  className="sp-tag sp-btn-line inline-flex min-h-11 items-center px-5 text-sm"
                >
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-6 text-sm">
          General information, not a diagnosis. Read our{" "}
          <Link href={routes.disclaimer.path} className="underline">
            disclaimer
          </Link>
          .
        </p>
      </Section>
      <JsonLd
        data={collectionSchema(
          "Conditions we treat",
          description,
          routes.conditions.path,
          conditions.map((p) => ({ name: p.title, path: pagePath(p.slug) })),
        )}
      />
    </PageShell>
  );
}
