import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Reviews } from "@/components/Reviews";
import { Section } from "@/components/PageShell";
import { MapFacade } from "@/components/MapFacade";
import { SpinePanel } from "@/components/SpinePanel";
import { TechCarousel } from "@/components/TechCarousel";
import { Tour } from "@/components/Tour";
import { clinic } from "@/content/clinic";
import { flags } from "@/content/flags";
import { routes } from "@/content/routes";
import { formatHours } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Physiotherapy in Balewadi, Pune | ${clinic.brandName}`,
  description:
    "Advanced robotic physiotherapy in Balewadi, Pune for back, neck and joint pain. Assessment-led plans with Dr. Nileema Chaudhary. Book or call today.",
  path: "/",
});

const ortho = routes.ortho.path;
const neuro = routes.neuro.path;

const steps = [
  {
    title: "Assessment",
    body: "Dr. Nileema Chaudhary asks about your pain and history, reviews any scans or reports you bring, and examines how you move. She explains what she finds in plain words.",
  },
  {
    title: "Treatment",
    body: "Your plan is personal. It can combine manual therapy with advanced machines such as robotic spine decompression, TECAR, shockwave and laser, when your assessment supports them.",
  },
  {
    title: "Rehabilitation",
    body: "Therapeutic exercise and a personalised exercise plan help you rebuild strength and movement. We check your progress and give you exercises to do at home.",
  },
];

const chips = [
  {
    group: "Spine",
    items: [
      { name: "Lower back pain", href: `${ortho}#back-pain` },
      { name: "Disc bulge", href: `${ortho}#disc-bulge` },
      { name: "Sciatica", href: `${ortho}#sciatica` },
      { name: "Neck pain", href: `${ortho}#neck-pain` },
      { name: "Tailbone pain", href: `${ortho}#tailbone-pain` },
      { name: "Posture problems", href: `${ortho}#posture` },
    ],
  },
  {
    group: "Joints",
    items: [
      { name: "Knee pain", href: `${ortho}#knee-pain` },
      { name: "Shoulder pain", href: `${ortho}#shoulder-pain` },
      { name: "Tennis elbow", href: `${ortho}#tennis-elbow` },
      { name: "Knee-replacement rehab", href: `${ortho}#post-surgery-rehab` },
      { name: "Sports injuries", href: `${ortho}#sports-injury` },
    ],
  },
  {
    group: "Neuro and balance",
    items: [
      { name: "Vertigo and balance", href: `${neuro}#vertigo-balance` },
      {
        name: "Neurological rehabilitation",
        href: `${neuro}#neurological-rehab`,
      },
      // TODO-CONFIRM: cerebral palsy programme (flag: neuroCP).
      ...(flags.neuroCP
        ? [
            {
              name: "Cerebral palsy",
              href: `${neuro}#pediatric-cerebral-palsy`,
            },
          ]
        : []),
    ],
  },
];

export default function Home() {
  return (
    <>
      <main id="main" className="flex-1">
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-2 md:items-center md:py-14">
          <div>
            <h1 className="text-4xl font-bold text-sp-blue-900 md:text-5xl">
              Back, neck or joint pain? Get a clear treatment plan in Balewadi.
            </h1>
            <p className="mt-4 text-lg">
              Advanced robotic physiotherapy and rehabilitation, without surgery
              where possible.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={routes.book.path}>Book appointment</ButtonLink>
              <ButtonLink href={clinic.phone.tel} variant="secondary">
                Call {clinic.phone.display}
              </ButtonLink>
            </div>
            <ul className="mt-6 space-y-1 text-sm">
              <li>{formatHours()}</li>
              <li>
                {clinic.address.locality}, {clinic.address.city}{" "}
                {clinic.address.postalCode}
              </li>
              <li>
                <a
                  href={clinic.google.reviewsUrl}
                  className="text-sp-blue-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Rated on Google
                </a>
              </li>
              {/* TODO-CONFIRM: "10+ years clinical experience" (flag: exp10y). */}
              {flags.exp10y && <li>10+ years of clinical experience</li>}
            </ul>
          </div>
          <SpinePanel />
        </section>

        <Section id="journey" title="How it works" tint>
          <ol className="grid max-w-3xl gap-3">
            {steps.map((s, i) => (
              <li key={s.title}>
                <details
                  className="border border-sp-teal-100 bg-sp-mist p-4"
                  open={i === 0}
                >
                  <summary className="cursor-pointer list-none font-semibold text-sp-blue-900">
                    {i + 1}. {s.title}
                  </summary>
                  <p className="mt-2">{s.body}</p>
                </details>
              </li>
            ))}
          </ol>
          <p className="mt-4">
            <Link
              href={routes.physiotherapy.path}
              className="text-sp-blue-700 underline"
            >
              Read how physiotherapy works at Smart Physio+
            </Link>
          </p>
        </Section>

        <Section title="What we treat">
          <div className="grid gap-6 md:grid-cols-3">
            {chips.map((g) => (
              <div key={g.group}>
                <h3 className="mb-2 font-semibold text-sp-blue-900">
                  {g.group}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((c) => (
                    <li key={c.name}>
                      <Link
                        href={c.href}
                        className="inline-flex min-h-11 items-center border border-sp-blue-700 bg-sp-white px-3 text-sm text-sp-blue-900 hover:bg-sp-teal-100"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6">
            See every service on our{" "}
            <Link
              href={routes.services.path}
              className="text-sp-blue-700 underline"
            >
              physiotherapy services page
            </Link>
            , or read about{" "}
            <Link
              href={routes.local.path}
              className="text-sp-blue-700 underline"
            >
              our physiotherapy clinic for Baner and Balewadi
            </Link>
            .
          </p>
        </Section>

        <Section id="technology" title="Technology at the clinic" tint>
          <TechCarousel />
        </Section>

        <Section title="Meet Dr. Nileema Chaudhary">
          <div className="grid items-center gap-6 md:grid-cols-[16rem_1fr]">
            <PlaceholderImage
              name="portrait"
              alt="Placeholder portrait of Dr. Nileema Chaudhary"
              className="w-64"
            />
            <div>
              <p className="max-w-xl">
                Dr. Nileema Chaudhary is a physiotherapist and the founder and
                lead clinician at {clinic.brandName}. She reviews your reports,
                assesses you thoroughly and explains the plan clearly before
                treatment starts.
              </p>
              <Link
                href={routes.doctor.path}
                className="mt-3 inline-flex min-h-12 items-center text-sp-blue-700 underline"
              >
                Read Dr. Nileema&apos;s profile
              </Link>
            </div>
          </div>
        </Section>

        <Section title="Patient reviews" tint>
          <Reviews />
        </Section>

        <Section title="Visit us">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <address className="not-italic">
                {clinic.address.street}
                <br />
                {clinic.address.locality}, {clinic.address.city},{" "}
                {clinic.address.region} {clinic.address.postalCode}
              </address>
              <p className="mt-2">{formatHours()}</p>
              {/* TODO-CONFIRM: parking availability (flag: parking). */}
              {flags.parking && (
                <p className="mt-2">Parking is available near the clinic.</p>
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
                  Contact details
                </ButtonLink>
              </div>
            </div>
            <MapFacade />
          </div>
        </Section>
      </main>
      <CtaBand />
      <Tour />
    </>
  );
}
