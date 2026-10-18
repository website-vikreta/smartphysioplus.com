import Link from "next/link";
import { DraftBanner } from "@/components/DraftBanner";
import { JourneySteps } from "@/components/JourneySteps";
import { JsonLd } from "@/components/JsonLd";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { flags } from "@/content/flags";
import { routes } from "@/content/routes";
import { livePages, pagePath } from "@/lib/content";
import { publishable } from "@/lib/publishable";
import { collectionSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const title = "Rehabilitation Physiotherapy in Balewadi | Smart Physio+";
const description =
  "Rehabilitation after surgery, injury or a neurological event at Smart Physio+ in Balewadi, Pune. Assessment first, then a plan built around your recovery.";

export const metadata = pageMetadata({
  title,
  description,
  path: routes.rehabilitation.path,
  noindex: !publishable.rehabHub,
});

const neuro = routes.neuro.path;
// Neuro rehab sections that exist on the neuro page. Anchors behind an off flag are not listed.
const neuroCards = [
  {
    title: "Neurological rehabilitation",
    summary:
      "Work on movement, strength and everyday function after a nervous system problem.",
    href: `${neuro}#neurological-rehab`,
  },
  // TODO-CONFIRM: stroke rehabilitation programme (flag: neuroStroke).
  ...(flags.neuroStroke
    ? [
        {
          title: "Stroke rehabilitation",
          summary: "Rehabilitation after a stroke.",
          href: `${neuro}#stroke-rehab`,
        },
      ]
    : []),
  // TODO-CONFIRM: pediatric and cerebral palsy programme (flag: neuroCP).
  ...(flags.neuroCP
    ? [
        {
          title: "Children and cerebral palsy",
          summary: "Pediatric and cerebral palsy rehabilitation.",
          href: `${neuro}#pediatric-cerebral-palsy`,
        },
      ]
    : []),
];

export default function RehabilitationHub() {
  const rehab = livePages.filter(
    (p) => p.cluster === "rehab" || p.cluster === "sports",
  );
  const cards = [
    ...rehab.map((p) => ({
      title: p.title,
      summary: p.summary,
      href: pagePath(p.slug),
    })),
    ...neuroCards,
  ];
  return (
    <PageShell
      crumbs={[
        { name: routes.rehabilitation.name, path: routes.rehabilitation.path },
      ]}
      concern="not_sure"
    >
      {!publishable.rehabHub && (
        <DraftBanner>
          Draft: needs at least 2 clinically reviewed rehabilitation or sports
          pages. Not indexed and not linked from the site.
        </DraftBanner>
      )}
      <PageHeading
        title="Rehabilitation and recovery"
        intro={
          <p className="text-base">
            Rehabilitation helps you restore movement, strength and confidence
            after surgery, an injury or a neurological event. It starts with an
            assessment, then a plan built around your recovery.
          </p>
        }
      />
      <Section
        title="How rehabilitation works here"
        intro="The same three steps apply to every plan."
      >
        <JourneySteps />
      </Section>
      <Section title="Rehabilitation we offer" tint>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <li key={c.href} className="sp-card sp-card-link flex flex-col">
              <h3 className="text-lg font-semibold text-sp-blue-900">
                {c.title}
              </h3>
              <p className="mt-1 flex-1 text-sm">{c.summary}</p>
              <Link
                href={c.href}
                className="mt-4 inline-flex min-h-12 items-center text-sp-blue-700 underline"
              >
                Read about {c.title.toLowerCase()}
              </Link>
            </li>
          ))}
        </ul>
        {/* TODO-CONFIRM: first-visit checklist for rehabilitation (flag: firstVisitChecklist). */}
        {flags.firstVisitChecklist && (
          <div className="sp-card mt-8 bg-sp-mist">
            <h3 className="text-lg font-semibold text-sp-blue-900">
              Bring these to your first visit
            </h3>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Discharge summary</li>
              <li>Surgeon&apos;s notes</li>
              <li>Scan reports</li>
              <li>A list of your current medicines</li>
            </ul>
          </div>
        )}
        <p className="mt-6 text-sm">
          Also see our{" "}
          <Link href={routes.conditions.path} className="underline">
            conditions we treat
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
          "Rehabilitation and recovery",
          description,
          routes.rehabilitation.path,
          cards.map((c) => ({ name: c.title, path: c.href })),
        )}
      />
    </PageShell>
  );
}
