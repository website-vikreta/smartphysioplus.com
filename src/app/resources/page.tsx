import Link from "next/link";
import { DraftBanner } from "@/components/DraftBanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { ResourcesExplorer } from "@/components/ResourcesExplorer";
import { routes } from "@/content/routes";
import { publishable } from "@/lib/publishable";
import { liveResources, resourcePath } from "@/lib/resources";
import { collectionSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "Physiotherapy Guides for Patients | Smart Physio+";
const description =
  "Plain guides from Smart Physio+ in Balewadi, Pune: your first visit, pain, recovery after surgery and exercises at home. Reviewed by our physiotherapist.";

export const metadata = pageMetadata({
  title,
  description,
  path: routes.resources.path,
  noindex: !publishable.resourcesIndex,
});

const topics = [
  { id: "first-visit", label: "First visit" },
  { id: "pain", label: "Pain" },
  { id: "recovery", label: "Recovery" },
  { id: "at-home", label: "At home" },
];

export default function ResourcesIndex() {
  return (
    <PageShell
      crumbs={[{ name: routes.resources.name, path: routes.resources.path }]}
    >
      {!publishable.resourcesIndex && (
        <DraftBanner>
          Draft: needs at least 1 clinically reviewed guide. Not indexed and not
          linked from the site.
        </DraftBanner>
      )}
      <PageHeading
        title="Guides for patients"
        intro={
          <p className="text-base">
            General guidance to help you prepare for care. These guides support
            your assessment. They do not replace it.
          </p>
        }
      />
      <Section>
        <ResourcesExplorer
          topics={topics}
          cards={liveResources.map((r) => ({
            slug: r.slug,
            title: r.title,
            summary: r.summary,
            topic: r.topic,
            readingMinutes: r.readingMinutes,
            href: resourcePath(r.slug),
          }))}
        />
        <p className="mt-8 max-w-2xl">
          Ready for an assessment?{" "}
          <Link href={routes.book.path} className="text-sp-blue-700 underline">
            Request an appointment
          </Link>
          , or browse{" "}
          <Link
            href={routes.physiotherapy.path}
            className="text-sp-blue-700 underline"
          >
            physiotherapy at Smart Physio+
          </Link>
          . General information, not a diagnosis. Read our{" "}
          <Link href={routes.disclaimer.path} className="underline">
            disclaimer
          </Link>
          .
        </p>
      </Section>
      <JsonLd
        data={collectionSchema(
          "Guides for patients",
          description,
          routes.resources.path,
          liveResources.map((r) => ({
            name: r.title,
            path: resourcePath(r.slug),
          })),
        )}
      />
    </PageShell>
  );
}
