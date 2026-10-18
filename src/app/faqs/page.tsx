import Link from "next/link";
import { DraftBanner } from "@/components/DraftBanner";
import { FaqExplorer } from "@/components/FaqExplorer";
import { JsonLd } from "@/components/JsonLd";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { clinic } from "@/content/clinic";
import { liveFaqs } from "@/content/faqs";
import { routes } from "@/content/routes";
import { livePages, pagePath } from "@/lib/content";
import { formatHours } from "@/lib/format";
import { publishable } from "@/lib/publishable";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const title = "Physiotherapy FAQs | Smart Physio+ Balewadi, Pune";
const description =
  "Answers to common questions about booking, your first visit, physiotherapy, timings and location at Smart Physio+ in Balewadi, Pune.";

export const metadata = pageMetadata({
  title,
  description,
  path: routes.faqs.path,
  noindex: !publishable.faqs,
});

const a = clinic.address;
const fill = (s: string) =>
  s
    .replace("{hours}", formatHours())
    .replace(
      "{address}",
      `${a.street}, ${a.locality}, ${a.city}, ${a.region} ${a.postalCode}`,
    );

export default function FaqsPage() {
  const rows = liveFaqs.map((f) => ({
    id: f.id,
    question: f.question,
    group: f.group,
    answer: f.answer && fill(f.answer),
    href: f.href,
  }));
  const conditions = livePages.filter((p) => p.cluster === "condition");
  return (
    <PageShell crumbs={[{ name: routes.faqs.name, path: routes.faqs.path }]}>
      {!publishable.faqs && (
        <DraftBanner>
          Draft: needs at least 8 confirmed general answers. Not indexed and not
          linked from the site.
        </DraftBanner>
      )}
      <PageHeading title="Questions patients ask us" />
      <Section>
        <FaqExplorer rows={rows} />
        {conditions.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-sp-blue-900">
              Questions about a specific condition
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {conditions.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`${pagePath(p.slug)}#faq`}
                    className="sp-tag sp-btn-line inline-flex min-h-11 items-center px-5 text-sm"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="mt-10 max-w-2xl">
          Still unsure? Call us or{" "}
          <Link
            href={routes.contact.path}
            className="text-sp-blue-700 underline"
          >
            contact the clinic
          </Link>
          , or{" "}
          <Link href={routes.book.path} className="text-sp-blue-700 underline">
            request an appointment
          </Link>
          . General information, not a diagnosis. Read our{" "}
          <Link href={routes.disclaimer.path} className="underline">
            disclaimer
          </Link>
          .
        </p>
      </Section>
      {/* FAQPage for the questions answered on this page only. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${absoluteUrl(routes.faqs.path)}#webpage`,
          url: absoluteUrl(routes.faqs.path),
          mainEntity: rows
            .filter((r) => r.answer)
            .map((r) => ({
              "@type": "Question",
              name: r.question,
              acceptedAnswer: { "@type": "Answer", text: r.answer },
            })),
        }}
      />
    </PageShell>
  );
}
