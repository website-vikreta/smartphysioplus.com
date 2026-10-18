import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { DraftBanner } from "@/components/DraftBanner";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { clinic } from "@/content/clinic";
import { flags } from "@/content/flags";
import { homeVisit } from "@/content/homeVisit";
import { routes } from "@/content/routes";
import { publishable } from "@/lib/publishable";
import { CLINIC_ID } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const path = routes.homeVisit.path;

export const metadata = pageMetadata({
  title: homeVisit.metaTitle,
  description: homeVisit.metaDescription,
  path,
  noindex: !publishable.homeVisit,
});

// With the flag off this route is a 404 and nothing links to it. With it on but unreviewed it is a noindex draft.
export default function HomeVisitPage() {
  // TODO-CONFIRM: home visits are offered only when the clinic confirms (flag: homeVisits).
  if (!flags.homeVisits) notFound();
  const area = clinic.homeVisitArea;
  return (
    <PageShell
      crumbs={[routes.physiotherapy, { name: routes.homeVisit.name, path }]}
      concern="home_visit"
    >
      {!publishable.homeVisit && (
        <DraftBanner>
          Draft: pending clinical review. Not indexed and not linked from the
          site.
        </DraftBanner>
      )}
      <PageHeading
        title="Physiotherapy at home"
        intro={
          <p className="text-base">
            Some people cannot easily travel to a clinic. For them, we can
            arrange a physiotherapy visit at home.
          </p>
        }
      />
      <Section title="Who it is for">
        <ul className="grid max-w-3xl list-disc gap-2 pl-5">
          <li>People recovering after surgery who cannot travel yet</li>
          <li>Older adults</li>
          <li>People with limited mobility</li>
        </ul>
      </Section>
      {area && (
        <Section title="Where we visit" tint>
          <p className="max-w-2xl">{area}</p>
        </Section>
      )}
      <Section title="What can and cannot be done at home" tint={!area}>
        <p className="max-w-2xl">
          {/* TODO-CONFIRM: what the clinic offers at a home visit, beyond assessment and exercises. */}
          A home visit can include an assessment, advice and an exercise plan
          that suits your home. Machines such as robotic spine decompression,
          shockwave, TECAR, laser and EMFT are used at the clinic only. If your
          plan needs them, we will tell you and arrange a clinic visit.
        </p>
      </Section>
      <Section title="How to request a visit">
        <p className="max-w-2xl">
          Use the booking form and choose physiotherapy at home. It asks for the
          address for the visit. We confirm the day and time with you by call or
          WhatsApp.
        </p>
        <ButtonLink
          href={`${routes.book.path}?concern=home_visit`}
          icon="calendar"
          className="mt-6"
        >
          Request a home visit
        </ButtonLink>
      </Section>
      <Section title="Practical details" tint>
        <ul className="grid max-w-3xl list-disc gap-2 pl-5">
          {/* TODO-CONFIRM: how a home visit works, as the clinic runs it. */}
          <li>Keep your reports, scans or discharge summary ready</li>
          <li>Keep a list of your medicines ready</li>
          <li>Clear a space where you can move safely</li>
        </ul>
      </Section>
      <Section id="faq" title="Common questions">
        <Faq items={homeVisit.faqs} />
        <p className="mt-6 max-w-2xl">
          Prefer to come to us? See{" "}
          <Link
            href={routes.physiotherapy.path}
            className="text-sp-blue-700 underline"
          >
            physiotherapy at Smart Physio+
          </Link>{" "}
          or our{" "}
          <Link href={routes.local.path} className="text-sp-blue-700 underline">
            clinic for Baner and Balewadi
          </Link>
          .
        </p>
        <div className="mt-6">
          <DisclaimerNote />
        </div>
      </Section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${absoluteUrl(path)}#service`,
          url: absoluteUrl(path),
          name: "Physiotherapy at home",
          serviceType: "Home physiotherapy",
          provider: { "@id": CLINIC_ID },
          ...(area && { areaServed: area }),
        }}
      />
    </PageShell>
  );
}
