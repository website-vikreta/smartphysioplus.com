import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { Faq } from "@/components/Faq";
import { MapFacade } from "@/components/MapFacade";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { clinic } from "@/content/clinic";
import { localFaq } from "@/content/faq";
import { flags } from "@/content/flags";
import { routes } from "@/content/routes";
import { formatHours } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

const path = routes.local.path;

export const metadata = pageMetadata({
  title: "Physiotherapy Clinic in Baner & Balewadi, Pune | Smart Physio+",
  description:
    "Smart Physio+ is a physiotherapy clinic on Sopan Baug Road, Balewadi, serving Baner, Pashan, Aundh and nearby areas. See hours, directions and how to book.",
  path,
});

export default function LocalPage() {
  const a = clinic.address;
  return (
    <PageShell crumbs={[{ name: routes.local.name, path }]}>
      <PageHeading
        title="Physiotherapy clinic for Baner and Balewadi, Pune"
        intro="Smart Physio+ is on Sopan Baug Road in Balewadi, close to Baner. We help people with pain, injuries and recovery after surgery."
      />

      <Section title="Who we see nearby">
        <ul className="grid max-w-3xl list-disc gap-2 pl-5">
          <li>
            Desk workers with back and neck pain from long hours at a computer
          </li>
          <li>Runners and other athletes with sports injuries</li>
          <li>Older adults who want to stay active and steady on their feet</li>
          <li>People recovering from surgery, such as a knee replacement</li>
        </ul>
        <p className="mt-4 max-w-2xl">
          Patients also come to us from Pashan, Aundh, Sus, Wakad, Hinjawadi and
          Ravet.
        </p>
      </Section>

      <Section title="How to reach us" tint>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <address className="not-italic">
              {a.street}
              <br />
              {a.locality}, {a.city}, {a.region} {a.postalCode}
            </address>
            <p className="mt-2">{formatHours()}</p>
            {/* TODO-CONFIRM: nearby landmarks and travel notes (flag: landmarks). */}
            {flags.landmarks && (
              <p className="mt-2">Landmarks and travel notes go here.</p>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
              <ButtonLink
                href={clinic.google.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
              </ButtonLink>
              <ButtonLink href={routes.contact.path} variant="secondary">
                Contact us
              </ButtonLink>
            </div>
          </div>
          <MapFacade />
        </div>
      </Section>

      <Section title="Local questions">
        <Faq items={localFaq()} />
        <p className="mt-6 max-w-2xl">
          Learn{" "}
          <Link
            href={routes.physiotherapy.path}
            className="text-sp-blue-700 underline"
          >
            how physiotherapy works at Smart Physio+
          </Link>
          , or read about{" "}
          <Link href={routes.ortho.path} className="text-sp-blue-700 underline">
            orthopedic physiotherapy
          </Link>{" "}
          and{" "}
          <Link href={routes.neuro.path} className="text-sp-blue-700 underline">
            neuro physiotherapy
          </Link>
          . Ready?{" "}
          <Link href={routes.book.path} className="text-sp-blue-700 underline">
            Book an appointment
          </Link>
          .
        </p>
      </Section>
    </PageShell>
  );
}
