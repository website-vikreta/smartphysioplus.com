import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { DraftBanner } from "@/components/DraftBanner";
import { JsonLd } from "@/components/JsonLd";
import { mdxComponents } from "@/components/Mdx";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { TrackView } from "@/components/TrackView";
import { routes } from "@/content/routes";
import { allResources, isResourceLive, resourcePath } from "@/lib/resources";
import { CLINIC_ID, DOCTOR_ID } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

// Every article builds; only reviewed ones are indexed, listed and linked (promptP2.md rule 3).
export const dynamicParams = false;
export const generateStaticParams = () =>
  allResources.map((r) => ({ slug: r.slug }));

const find = (slug: string) => allResources.find((r) => r.slug === slug);
const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { dateStyle: "long" });

export async function generateMetadata({
  params,
}: PageProps<"/resources/[slug]">) {
  const r = find((await params).slug);
  if (!r) notFound();
  return pageMetadata({
    title: r.metaTitle,
    description: r.metaDescription,
    path: resourcePath(r.slug),
    noindex: !isResourceLive(r),
  });
}

export default async function ResourcePage({
  params,
}: PageProps<"/resources/[slug]">) {
  const r = find((await params).slug);
  if (!r) notFound();
  const path = resourcePath(r.slug);
  const live = isResourceLive(r);
  const doctor = (
    <Link href={routes.doctor.path} className="text-sp-blue-700 underline">
      Dr. Nileema Chaudhary, Physiotherapist
    </Link>
  );

  return (
    <PageShell
      crumbs={[
        { name: routes.resources.name, path: routes.resources.path },
        { name: r.title, path },
      ]}
    >
      {!live && (
        <DraftBanner>
          Draft: pending clinical review. Not indexed and not linked from the
          site.
        </DraftBanner>
      )}
      <PageHeading
        title={r.h1}
        intro={
          <p className="text-base">
            {live && r.reviewedAt ? (
              <>
                Reviewed by {doctor} — last reviewed {longDate(r.reviewedAt)}.
              </>
            ) : (
              <>Clinical review by {doctor} is pending.</>
            )}{" "}
            {r.readingMinutes} minute read.
          </p>
        }
      />
      <Section>
        <article className="max-w-3xl">
          <MDXRemote source={r.body} components={mdxComponents} />
        </article>
        <div className="mt-8">
          <DisclaimerNote />
        </div>
      </Section>
      <TrackView event="resource_view" params={{ slug: r.slug }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["Article", "MedicalWebPage"],
          "@id": `${absoluteUrl(path)}#article`,
          url: absoluteUrl(path),
          headline: r.title,
          name: r.metaTitle,
          description: r.metaDescription,
          inLanguage: "en-IN",
          about: { "@type": "Thing", name: r.about },
          author: { "@id": CLINIC_ID },
          publisher: { "@id": CLINIC_ID },
          datePublished: r.datePublished,
          dateModified: r.updatedAt,
          ...(live &&
            r.reviewedAt && {
              lastReviewed: r.reviewedAt,
              reviewedBy: { "@id": DOCTOR_ID },
            }),
        }}
      />
    </PageShell>
  );
}
