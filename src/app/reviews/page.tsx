import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { ReviewCards } from "@/components/ReviewCards";
import { clinic } from "@/content/clinic";
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
        <ReviewCards />

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
