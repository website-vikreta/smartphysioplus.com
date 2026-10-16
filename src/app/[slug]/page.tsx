import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { Faq } from "@/components/Faq";
import { JointDiagram } from "@/components/JointDiagram";
import { JsonLd } from "@/components/JsonLd";
import { mdxComponents } from "@/components/Mdx";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { RelatedLinks } from "@/components/RelatedLinks";
import { SpinePoster } from "@/components/SpinePoster";
import { TrackView } from "@/components/TrackView";
import { crumbParent } from "@/content/breadcrumbs";
import { clinic } from "@/content/clinic";
import { flags } from "@/content/flags";
import { routes } from "@/content/routes";
import { technology } from "@/content/technology";
import { builtPages, isLive, pagePath } from "@/lib/content";
import { CLINIC_ID, DOCTOR_ID } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

// One flat route for every P1 MDX page. Pages behind an off flag are not generated (404).
export const dynamicParams = false;
export const generateStaticParams = () =>
  builtPages.map((p) => ({ slug: p.slug }));

const page = (slug: string) => builtPages.find((p) => p.slug === slug);

// Draft banner on dev and Netlify previews only, never on the production deploy.
const preview =
  process.env.NODE_ENV !== "production" ||
  (process.env.CONTEXT ?? "production") !== "production";

const anatomy = {
  cervical: "Cervical spine",
  thoracic: "Thoracic spine",
  lumbar: "Lumbar spine",
  sacral: "Sacrum and coccyx",
};

const longDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { dateStyle: "long" });

export async function generateMetadata({ params }: PageProps<"/[slug]">) {
  const p = page((await params).slug);
  if (!p) notFound();
  return pageMetadata({
    title: p.metaTitle,
    description: p.metaDescription,
    path: pagePath(p.slug),
    noindex: !isLive(p),
  });
}

export default async function ContentPage({ params }: PageProps<"/[slug]">) {
  const p = page((await params).slug);
  if (!p) notFound();
  const path = pagePath(p.slug);
  const live = isLive(p);
  const tech = flags.technologyByCondition
    ? technology.filter((t) => p.technology.includes(t.name))
    : [];

  // TODO-CONFIRM: machines named per page come from `technology` frontmatter (flag: technologyByCondition).
  const PlanTechnology = () =>
    tech.length > 0 && (
      <div className="sp-card mt-6">
        <p className="font-semibold text-sp-blue-900">
          Technology your plan may include, if your assessment supports it
        </p>
        <ul className="mt-3 space-y-2">
          {tech.map((t) => (
            <li key={t.name}>
              <strong className="text-sp-blue-900">{t.name}:</strong> {t.what}
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <PageShell
      crumbs={[crumbParent[p.cluster](p), { name: p.title, path }]}
      concern={p.spineRegion ?? "not_sure"}
    >
      {!live && preview && (
        <p className="bg-sp-blue-900 px-4 py-2 text-center text-sm text-sp-white">
          Draft: pending clinical review. Not indexed and not linked from the
          site.
        </p>
      )}
      <PageHeading
        title={p.h1}
        intro={
          <p className="text-base">
            {live && p.reviewedAt ? (
              <>
                Reviewed by{" "}
                <Link
                  href={routes.doctor.path}
                  className="text-sp-blue-700 underline"
                >
                  Dr. Nileema Chaudhary, Physiotherapist
                </Link>
                . Last reviewed {longDate(p.reviewedAt)}.
              </>
            ) : (
              <>
                Clinical review by{" "}
                <Link
                  href={routes.doctor.path}
                  className="text-sp-blue-700 underline"
                >
                  Dr. Nileema Chaudhary, Physiotherapist
                </Link>{" "}
                is pending.
              </>
            )}
          </p>
        }
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[minmax(0,1fr)_18rem] md:py-16">
        <article className="max-w-3xl">
          <MDXRemote
            source={p.body}
            components={{ ...mdxComponents, PlanTechnology }}
          />
        </article>
        <aside className="space-y-6 md:sticky md:top-28 md:self-start">
          {p.spineRegion && p.spineRegion !== "joints" ? (
            <figure className="sp-card bg-sp-mist">
              <div className="mx-auto h-64 w-32">
                <SpinePoster selected={p.spineRegion} />
              </div>
              <figcaption className="mt-3 text-center text-sm">
                Side view of the spine. The highlighted part is the area this
                page covers.
              </figcaption>
            </figure>
          ) : p.spineRegion === "joints" ? (
            <JointDiagram label={p.title.replace(/ physiotherapy$/i, "")} />
          ) : null}
          <Image
            src={p.heroImage}
            alt={p.heroAlt}
            width={800}
            height={600}
            sizes="18rem"
            className="w-full rounded-2xl"
            {...(p.heroImage.includes("/placeholder/") && {
              "data-placeholder": "true",
            })}
          />
        </aside>
      </div>

      <Section id="faq" title="Common questions" tint>
        <Faq items={p.faqs} />
      </Section>

      <Section>
        <RelatedLinks page={p} />
        <div className="mt-8">
          <DisclaimerNote />
        </div>
      </Section>

      <TrackView event="condition_view" params={{ slug: p.slug }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "@id": `${absoluteUrl(path)}#webpage`,
          url: absoluteUrl(path),
          name: p.metaTitle,
          description: p.metaDescription,
          inLanguage: "en-IN",
          isPartOf: { "@id": `${clinic.domain}/#website` },
          sourceOrganization: { "@id": CLINIC_ID },
          about: {
            "@type": "MedicalCondition",
            name: p.condition,
            ...(p.spineRegion &&
              p.spineRegion !== "joints" && {
                associatedAnatomy: {
                  "@type": "AnatomicalStructure",
                  name: anatomy[p.spineRegion],
                },
              }),
          },
          dateModified: p.updatedAt,
          ...(live &&
            p.reviewedAt && {
              lastReviewed: p.reviewedAt,
              reviewedBy: { "@id": DOCTOR_ID },
            }),
        }}
      />
    </PageShell>
  );
}
