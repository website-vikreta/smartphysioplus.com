import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { ServiceGrid } from "@/components/ServiceGrid";
import { routes } from "@/content/routes";
import { serviceGroups, services } from "@/content/services";
import { CLINIC_ID } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const path = routes.services.path;

export const metadata = pageMetadata({
  title: "Physiotherapy Services in Balewadi, Pune | Smart Physio+",
  description:
    "Spine care, joint and muscle pain, neuro and balance, rehabilitation, manual therapy and advanced technology at Smart Physio+ in Balewadi, Pune.",
  path,
});

export default function ServicesPage() {
  return (
    <PageShell crumbs={[{ name: routes.services.name, path }]}>
      <PageHeading
        title="Our physiotherapy services"
        intro="Every service starts with an assessment, so your plan fits you. Filter by area to find what you need."
      />
      <Section>
        <ServiceGrid services={services} groups={serviceGroups} />
        <p className="mt-8 max-w-2xl">
          Read more about{" "}
          <Link href={routes.ortho.path} className="text-sp-blue-700 underline">
            orthopedic physiotherapy
          </Link>
          ,{" "}
          <Link href={routes.neuro.path} className="text-sp-blue-700 underline">
            neuro physiotherapy
          </Link>{" "}
          or{" "}
          <Link
            href={routes.physiotherapy.path}
            className="text-sp-blue-700 underline"
          >
            how physiotherapy works
          </Link>
          . Not sure what you need?{" "}
          <Link href={routes.book.path} className="text-sp-blue-700 underline">
            Book an assessment
          </Link>
          .
        </p>
      </Section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.name,
              description: s.blurb,
              url: absoluteUrl(s.href),
              provider: { "@id": CLINIC_ID },
            },
          })),
        }}
      />
    </PageShell>
  );
}
