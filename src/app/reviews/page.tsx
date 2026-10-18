import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { JsonLd } from "@/components/JsonLd";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { ReviewQuotes } from "@/components/ReviewQuotes";
import { clinic } from "@/content/clinic";
import { reviews } from "@/content/reviews";
import { routes } from "@/content/routes";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const title = "Patient Reviews | Smart Physio+ Balewadi, Pune";
const description =
  "Read what patients say about Smart Physio+ in Balewadi, Pune. Full reviews are on Google, where you can also share your own experience.";

export const metadata = pageMetadata({
  title,
  description,
  path: routes.reviews.path,
});

// WebPage + BreadcrumbList only. Never Review or AggregateRating (promptP0.md rule 5).
export default function ReviewsPage() {
  const external = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <PageShell
      crumbs={[{ name: routes.reviews.name, path: routes.reviews.path }]}
    >
      <PageHeading
        title="What patients say"
        intro={
          <p className="text-base">
            We collect reviews on Google so you can read them in full.
          </p>
        }
      />
      <Section>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={clinic.google.reviewsUrl} icon="star" {...external}>
            Read all our reviews on Google
          </ButtonLink>
          <ButtonLink href={routes.review.path} variant="secondary">
            Leave a review
          </ButtonLink>
        </div>

        {reviews.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-sp-blue-900">
              In patients&apos; own words
            </h2>
            <p className="mt-2 max-w-2xl text-sm">
              Shared with each patient&apos;s permission, as they wrote them.
            </p>
            <div className="mt-4">
              <ReviewQuotes reviews={reviews} />
            </div>
          </div>
        )}

        <p className="mt-10 max-w-2xl">
          Meet{" "}
          <Link
            href={routes.doctor.path}
            className="text-sp-blue-700 underline"
          >
            Dr. Nileema Chaudhary
          </Link>
          , read{" "}
          <Link href={routes.about.path} className="text-sp-blue-700 underline">
            about the clinic
          </Link>{" "}
          or{" "}
          <Link href={routes.book.path} className="text-sp-blue-700 underline">
            request an appointment
          </Link>
          .
        </p>
      </Section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${absoluteUrl(routes.reviews.path)}#webpage`,
          url: absoluteUrl(routes.reviews.path),
          name: title,
          description,
          inLanguage: "en-IN",
          isPartOf: { "@id": `${clinic.domain}/#website` },
        }}
      />
    </PageShell>
  );
}
