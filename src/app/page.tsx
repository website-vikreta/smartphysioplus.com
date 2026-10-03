import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Icon, IconBadge, type IconName } from "@/components/Icon";
import { MapFacade } from "@/components/MapFacade";
import { Section } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Reviews } from "@/components/Reviews";
import { SpinePanel } from "@/components/SpinePanel";
import { TechTabs } from "@/components/TechTabs";
import { Tour } from "@/components/Tour";
import { clinic } from "@/content/clinic";
import { localFaq } from "@/content/faq";
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
    icon: "user" as IconName,
    title: "Assessment",
    body: "Dr. Nileema Chaudhary asks about your pain and history, reviews any scans or reports you bring, and examines how you move. She explains what she finds in plain words.",
  },
  {
    icon: "hands" as IconName,
    title: "Treatment",
    body: "Your plan is personal. It can combine manual therapy with advanced machines such as robotic spine decompression, TECAR, shockwave and laser, when your assessment supports them.",
  },
  {
    icon: "rehab" as IconName,
    title: "Rehabilitation",
    body: "Therapeutic exercise and a personalised exercise plan help you rebuild strength and movement. We check your progress and give you exercises to do at home.",
  },
];

const care: {
  icon: IconName;
  title: string;
  blurb: string;
  items: { name: string; href: string }[];
}[] = [
  {
    icon: "spine",
    title: "Spine care",
    blurb: "Back and neck pain, assessed and treated with a clear plan.",
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
    icon: "joint",
    title: "Joints and muscles",
    blurb: "Pain, injuries and recovery after surgery.",
    items: [
      { name: "Knee pain", href: `${ortho}#knee-pain` },
      { name: "Shoulder pain", href: `${ortho}#shoulder-pain` },
      { name: "Tennis elbow", href: `${ortho}#tennis-elbow` },
      { name: "Knee-replacement rehab", href: `${ortho}#post-surgery-rehab` },
      { name: "Sports injuries", href: `${ortho}#sports-injury` },
    ],
  },
  {
    icon: "brain",
    title: "Neuro and balance",
    blurb: "Help with dizziness, balance and movement.",
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
  {
    icon: "hands",
    title: "Manual therapy",
    blurb: "Skilled hands-on treatment, used when your assessment supports it.",
    items: [
      {
        name: "Manual therapy",
        href: `${routes.physiotherapy.path}#approaches`,
      },
      {
        name: "Myofascial release",
        href: `${routes.physiotherapy.path}#approaches`,
      },
      {
        name: "Kinesio taping",
        href: `${routes.physiotherapy.path}#approaches`,
      },
    ],
  },
];

// All drawn from confirmed facts in promptP0.md section 3.
const why = [
  "A thorough assessment before any treatment",
  "Your reports are reviewed before planning",
  "The plan is explained clearly, in plain words",
  "Manual therapy combined with advanced machines",
  "A personalised exercise plan you can follow at home",
  "Robotic spine decompression, TECAR, shockwave and laser at one clinic",
];

export default function Home() {
  const a = clinic.address;
  return (
    <>
      <main id="main" className="flex-1">
        <section className="sp-band">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2 md:items-center md:py-16">
            <div>
              <h1 className="text-4xl font-bold text-sp-blue-900 md:text-5xl">
                Back, neck or joint pain? Get a clear treatment plan in
                Balewadi.
              </h1>
              <p className="mt-4 max-w-xl text-lg">
                Advanced robotic physiotherapy and rehabilitation, without
                surgery where possible.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={routes.book.path} icon="calendar">
                  Book appointment
                </ButtonLink>
                <ButtonLink
                  href={clinic.phone.tel}
                  variant="secondary"
                  icon="phone"
                >
                  Call {clinic.phone.display}
                </ButtonLink>
              </div>
              <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
                <li className="flex items-center gap-3">
                  <IconBadge name="clock" className="!size-10" />
                  {formatHours()}
                </li>
                <li className="flex items-center gap-3">
                  <IconBadge name="pin" className="!size-10" />
                  {a.locality}, {a.city} {a.postalCode}
                </li>
                <li className="flex items-center gap-3">
                  <IconBadge name="star" className="!size-10" />
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
                {flags.exp10y && (
                  <li className="flex items-center gap-3">
                    <IconBadge name="shield" className="!size-10" />
                    10+ years of clinical experience
                  </li>
                )}
              </ul>
            </div>
            <div className="sp-card !rounded-3xl !p-4 md:!p-6">
              <SpinePanel />
            </div>
          </div>
        </section>

        <Section
          title="What we treat"
          intro="Pick your area to see how we approach it."
          tint
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {care.map((c) => (
              <div key={c.title} className="sp-card sp-card-link bg-sp-mist">
                <IconBadge name={c.icon} />
                <h3 className="mt-4 text-lg font-semibold text-sp-blue-900">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm">{c.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.items.map((i) => (
                    <li key={i.name}>
                      <Link
                        href={i.href}
                        className="inline-flex min-h-11 items-center rounded-full border border-sp-blue-700/30 bg-sp-white px-3 text-sm text-sp-blue-900 hover:bg-sp-teal-100"
                      >
                        {i.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8">
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

        <Section
          id="journey"
          title="How it works"
          intro="Three steps from first visit to recovery. Tap a step to read more."
        >
          <ol className="grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title}>
                <details className="sp-card group h-full" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center gap-4">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-sp-blue-700 font-display text-lg font-semibold text-sp-white">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-lg font-semibold text-sp-blue-900">
                      {s.title}
                    </span>
                    <Icon name={s.icon} className="size-6 text-sp-teal-500" />
                  </summary>
                  <p className="mt-4">{s.body}</p>
                </details>
              </li>
            ))}
          </ol>
          <p className="mt-6">
            <Link
              href={routes.physiotherapy.path}
              className="text-sp-blue-700 underline"
            >
              Read how physiotherapy works at Smart Physio+
            </Link>
          </p>
        </Section>

        <Section title="Why patients choose us" tint>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {why.map((w) => (
              <li
                key={w}
                className="flex items-start gap-3 rounded-2xl bg-sp-mist p-5"
              >
                <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-sp-blue-700 text-sp-white">
                  <Icon name="check" className="size-4" />
                </span>
                {w}
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="technology"
          title="Technology at the clinic"
          intro="Machines are used only when your assessment supports them."
        >
          <TechTabs />
        </Section>

        <Section tint>
          <div className="sp-card grid items-center gap-8 bg-sp-mist md:grid-cols-[18rem_1fr]">
            <PlaceholderImage
              name="portrait"
              alt="Placeholder portrait of Dr. Nileema Chaudhary"
              className="w-full max-w-72 rounded-2xl"
            />
            <div>
              <h2 className="text-2xl font-semibold text-sp-blue-900 md:text-3xl">
                Meet Dr. Nileema Chaudhary
              </h2>
              <p className="mt-3 max-w-xl">
                Dr. Nileema Chaudhary is a physiotherapist and the founder and
                lead clinician at {clinic.brandName}. She reviews your reports,
                assesses you thoroughly and explains the plan clearly before
                treatment starts.
              </p>
              <ButtonLink
                href={routes.doctor.path}
                variant="secondary"
                icon="arrow"
                className="mt-5"
              >
                Read Dr. Nileema&apos;s profile
              </ButtonLink>
            </div>
          </div>
        </Section>

        <Section title="Patient reviews">
          <Reviews />
        </Section>

        <Section title="Common questions" tint>
          <Faq items={localFaq()} />
        </Section>

        <Section title="Visit us">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="sp-card space-y-4">
              <p className="flex gap-3">
                <IconBadge name="pin" className="!size-10 shrink-0" />
                <address className="not-italic">
                  {a.street}
                  <br />
                  {a.locality}, {a.city}, {a.region} {a.postalCode}
                </address>
              </p>
              <p className="flex items-center gap-3">
                <IconBadge name="clock" className="!size-10 shrink-0" />
                {formatHours()}
              </p>
              {/* TODO-CONFIRM: parking availability (flag: parking). */}
              {flags.parking && <p>Parking is available near the clinic.</p>}
              <div className="flex flex-wrap gap-3 pt-2">
                <ButtonLink
                  href={clinic.google.directionsUrl}
                  icon="pin"
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
            <div className="overflow-hidden rounded-3xl">
              <MapFacade />
            </div>
          </div>
        </Section>
      </main>
      <CtaBand />
      <Tour />
    </>
  );
}
