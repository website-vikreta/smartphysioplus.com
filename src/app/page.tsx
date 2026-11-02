import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { FaqLinks } from "@/components/FaqLinks";
import { Icon, IconBadge, type IconName } from "@/components/Icon";
import { MapFacade } from "@/components/MapFacade";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Section } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { ReviewCards } from "@/components/ReviewCards";
import { SpinePanel } from "@/components/SpinePanel";
import { TechTabs } from "@/components/TechTabs";
import { Tour } from "@/components/Tour";
import { clinic } from "@/content/clinic";
import { processHeading, processIntro } from "@/content/process";
import { flags } from "@/content/flags";
import { routes } from "@/content/routes";
import { resolveHref } from "@/content/futureRoutes";
import { type RegionId, regions } from "@/content/regions";
import { publishable } from "@/lib/publishable";
import { liveResources, resourcePath } from "@/lib/resources";
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

const careImg = {
  spine: "spine",
  joint: "shoulder",
  brain: "exercise",
  hands: "back",
} as const;

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
          <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-4 md:grid-cols-2 md:items-start md:pb-16 md:pt-6">
            <div className="sp-rise">
              <h1 className="text-4xl font-bold text-sp-blue-900 md:text-5xl">
                <br />
                Advanced{" "}
                <span
                  style={{
                    color: "rgb(102, 204, 255)",
                    // Dark outline so the light blue reads on the pale hero background.
                    textShadow: [
                      [-1, 0],
                      [1, 0],
                      [0, -1],
                      [0, 1],
                      [-0.75, -0.75],
                      [0.75, -0.75],
                      [-0.75, 0.75],
                      [0.75, 0.75],
                    ]
                      .map(([x, y]) => `${x}px ${y}px 0 var(--sp-blue-900)`)
                      .join(", "),
                  }}
                >
                  Robotic
                </span>{" "}
                Physiotherapy
                <br />
                and Rehabilitation Center
              </h1>
              <p className="mt-4 max-w-xl text-base">
                Restoring Movement | Rebuilding Confidence | Redefining
                Recovery.
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
                  <a
                    href={clinic.google.reviewsUrl}
                    className="flex items-center gap-3"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Rated ${clinic.google.rating.value} out of 5 on Google, verified business`}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                      <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                      </svg>
                    </span>
                    <span className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="font-semibold text-sp-blue-900">
                        {clinic.google.rating.value}
                      </span>
                      <span className="text-base leading-none tracking-tight text-[#FBBC05]">
                        ★★★★★
                      </span>
                      <svg viewBox="0 0 24 24" className="size-4" role="img">
                        <title>Verified on Google</title>
                        <circle cx="12" cy="12" r="12" fill="#1A73E8" />
                        <path d="M7 12.5l3.2 3.2L17 8.9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
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
              <p className="mt-6 text-sm">
                Back, neck or joint pain? Get a clear treatment plan in
                Balewadi.
              </p>
            </div>
            <div
              className="sp-rise relative md:self-center"
              style={{ animationDelay: "0.2s" }}
            >
              <Image
                src="/images/clinic/robotic-spine-therapy.png"
                alt="A physiotherapist showing a patient the screen of the RoboSpine-100 table"
                width={1631}
                height={964}
                priority
                sizes="(min-width: 768px) 780px, 100vw"
                className="h-auto w-full md:w-[130%] md:max-w-none"
              />
              <p
                className="sp-rise relative z-10 mt-2 border-l-4 border-sp-teal-500 pl-4"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="block text-sm font-medium tracking-wide text-sp-blue-700 md:text-base">
                  Beyond Conventional Physiotherapy
                </span>
                <span className="mt-1 block font-(family-name:--font-display) text-xl font-semibold leading-snug text-sp-blue-900 md:text-2xl">
                  Experience the Power of{" "}
                  <span className="bg-linear-to-r from-sp-blue-700 to-sp-teal-500 bg-clip-text text-transparent">
                    Robotic Rehabilitation
                  </span>
                </span>
              </p>
            </div>
          </div>
        </section>

        <section className="sp-dark" aria-label="Our approach">
          <div className="relative mx-auto max-w-5xl px-4 py-16 text-center md:py-24">
            {/* Oversized quote marks behind the text. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-2 left-2 select-none font-(family-name:--font-display) leading-none text-white/10 md:left-6"
              style={{ fontSize: "clamp(8rem, 18vw, 15rem)" }}
            >
              &ldquo;
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 right-2 select-none font-(family-name:--font-display) leading-none text-white/10 md:right-6 md:-bottom-24"
              style={{ fontSize: "clamp(8rem, 18vw, 15rem)" }}
            >
              &rdquo;
            </span>
            {/* Rule with a diamond: the separator. */}
            <div
              aria-hidden="true"
              className="relative mx-auto mb-8 flex max-w-xs items-center gap-3"
            >
              <span className="h-px flex-1 bg-linear-to-r from-transparent to-[#66ccff]" />
              <span className="block bg-[#66ccff]" style={{ width: 10, height: 10, transform: "rotate(45deg)", boxShadow: "0 0 14px #66ccff" }} />
              <span className="h-px flex-1 bg-linear-to-l from-transparent to-[#66ccff]" />
            </div>
            <p className="relative font-(family-name:--font-display) text-2xl font-semibold leading-snug md:text-5xl md:leading-tight">
              Redefining Physiotherapy Through Cutting-Edge{" "}
              <span className="sp-hl">Robotic Technology</span> and{" "}
              <span className="sp-hl">Advanced Rehabilitation</span>
            </p>
            <p className="relative mt-8 text-lg text-white/80 md:text-xl">
              to Help You
            </p>
            <ul className="sp-reveal relative mt-4 flex flex-wrap justify-center gap-3">
              {["Move Better", "Live Healthier", "Live Longer"].map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/25 bg-white/10 px-6 py-2.5 font-(family-name:--font-display) text-lg font-semibold backdrop-blur transition hover:-translate-y-1 hover:border-[#66ccff] hover:shadow-[0_8px_24px_rgb(102_204_255/0.3)] md:text-xl"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Section
          id="conditions"
          title="Conditions we treat"
          intro="Pick your area to see how we approach it."
          tint
        >
          <div className="sp-card mx-auto mb-10 max-w-5xl !rounded-[2rem] !p-4 shadow-xl md:!p-6">
            <SpinePanel
              treat={
                Object.fromEntries(
                  regions.map((r) => [
                    r.id,
                    r.treat.map((t) => ({
                      ...t,
                      // The joints region opens the conditions hub, filtered, once it is publishable.
                      href:
                        r.id === "joints" && publishable.conditionsHub
                          ? `${routes.conditions.path}?region=joints`
                          : resolveHref(t.href),
                    })),
                  ]),
                ) as Record<RegionId, { label: string; href: string }[]>
              }
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {care.map((c) => (
              <div
                key={c.title}
                className="sp-card sp-card-link group overflow-hidden bg-sp-mist !p-0"
              >
                <div className="h-36 overflow-hidden">
                  <PlaceholderImage
                    name={careImg[c.icon as keyof typeof careImg]}
                    alt={`Placeholder photo for ${c.title.toLowerCase()}`}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <IconBadge name={c.icon} />
                  <h3 className="mt-4 text-lg font-semibold text-sp-blue-900">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm">{c.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {c.items.map((i) => (
                      <li key={i.name}>
                        <Link
                          href={resolveHref(i.href)}
                          className="sp-tag sp-btn-line inline-flex min-h-11 items-center px-5 text-sm"
                        >
                          {i.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {publishable.conditionsHub && (
            <p className="mt-8">
              <Link
                href={routes.conditions.path}
                className="text-sp-blue-700 underline"
              >
                See all conditions
              </Link>
            </p>
          )}
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
          title={processHeading}
          intro={processIntro}
        >
          <ProcessSteps />
          <p className="mt-6">
            <Link
              href={routes.physiotherapy.path}
              className="text-sp-blue-700 underline"
            >
              Read how physiotherapy works at Smart Physio+
            </Link>
          </p>
        </Section>

        <Section title="What our patients say">
          <ReviewCards />
          <p className="mt-6 text-center">
            <Link
              href={routes.reviews.path}
              className="text-sp-blue-700 underline"
            >
              Read what patients say
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

        {liveResources.length > 0 && (
          <Section title="From our guides">
            <div className="sp-card sp-card-link max-w-xl">
              <h3 className="text-lg font-semibold text-sp-blue-900">
                {liveResources[0].title}
              </h3>
              <p className="mt-1 text-sm">{liveResources[0].summary}</p>
              <Link
                href={resourcePath(liveResources[0].slug)}
                className="mt-3 inline-flex min-h-12 items-center text-sp-blue-700 underline"
              >
                Read the guide
              </Link>
              {publishable.resourcesIndex && (
                <Link
                  href={routes.resources.path}
                  className="ml-4 inline-flex min-h-12 items-center text-sp-blue-700 underline"
                >
                  All guides
                </Link>
              )}
            </div>
          </Section>
        )}

        {publishable.faqs && (
          <Section title="Common questions" tint>
            <FaqLinks
              ids={[
                "how-do-i-book",
                "what-to-bring",
                "what-are-your-hours",
                "is-a-physiotherapist-a-doctor",
              ]}
            />
          </Section>
        )}

        <Section title="Visit us">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="sp-card space-y-4">
              <div className="flex gap-3">
                <IconBadge name="pin" className="!size-10 shrink-0" />
                <address className="not-italic">
                  {a.street}
                  <br />
                  {a.locality}, {a.city}, {a.region} {a.postalCode}
                </address>
              </div>
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
