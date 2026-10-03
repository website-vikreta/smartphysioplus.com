import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { JsonLd } from "@/components/JsonLd";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { conditions } from "@/content/conditions";
import { routes } from "@/content/routes";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const path = routes.ortho.path;

export const metadata = pageMetadata({
  title: "Orthopedic Physiotherapy in Balewadi, Pune | Smart Physio+",
  description:
    "Assessment-led orthopedic physiotherapy for back, neck, joint and muscle pain in Balewadi, Pune. See how we approach each problem and book an assessment.",
  path,
});

export default function OrthoPage() {
  return (
    <PageShell crumbs={[{ name: routes.ortho.name, path }]}>
      <PageHeading
        title="Orthopedic physiotherapy for spine, joint and muscle pain"
        intro="Orthopedic physiotherapy looks after bones, joints, muscles and ligaments. Below is how we approach common problems. Your own plan is set after an assessment."
      />

      <nav
        aria-label="Jump to a condition"
        className="mx-auto max-w-6xl px-4 pt-8"
      >
        <ul className="flex flex-wrap gap-2">
          {conditions.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-sp-blue-700/30 bg-sp-white px-4 text-sm text-sp-blue-900 hover:bg-sp-teal-100"
              >
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <Section
        id="robotic-decompression"
        title="Robotic spine decompression"
        tint
      >
        <div className="max-w-3xl space-y-3">
          <p>
            <strong>What it is:</strong> a computer-guided table that gently
            stretches the spine in a controlled way.
          </p>
          <p>
            <strong>Who is assessed for it:</strong> people with certain back
            and neck problems, including some disc-related pain. We decide at
            assessment whether it suits you.
          </p>
          <p>
            <strong>What a session feels like:</strong> you lie on the table
            while it works. Most people describe it as a gentle stretch. Tell us
            straight away if anything feels wrong.
          </p>
        </div>
      </Section>

      {conditions.map((c, i) => (
        <Section key={c.id} id={c.id} title={c.title} tint={i % 2 === 1}>
          <dl className="sp-card grid max-w-3xl gap-3">
            <div>
              <dt className="font-semibold text-sp-blue-900">What it is</dt>
              <dd>{c.what}</dd>
            </div>
            <div>
              <dt className="font-semibold text-sp-blue-900">
                When physiotherapy may help
              </dt>
              <dd>{c.help}</dd>
            </div>
            <div>
              <dt className="font-semibold text-sp-blue-900">
                How we approach it
              </dt>
              <dd>{c.approach}</dd>
            </div>
          </dl>
          <ButtonLink
            href={`${routes.book.path}?concern=${c.concern}`}
            className="mt-4"
          >
            Book for this
          </ButtonLink>
        </Section>
      ))}

      <Section>
        <p className="max-w-2xl">
          Learn{" "}
          <Link
            href={routes.physiotherapy.path}
            className="text-sp-blue-700 underline"
          >
            how physiotherapy works
          </Link>
          , meet{" "}
          <Link
            href={routes.doctor.path}
            className="text-sp-blue-700 underline"
          >
            Dr. Nileema Chaudhary
          </Link>{" "}
          or see our{" "}
          <Link href={routes.local.path} className="text-sp-blue-700 underline">
            physiotherapy clinic in Baner and Balewadi
          </Link>
          .
        </p>
        <div className="mt-4">
          <DisclaimerNote />
        </div>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          url: absoluteUrl(path),
          name: "Orthopedic physiotherapy at Smart Physio+",
          about: conditions.map((c) => ({
            "@type": "MedicalCondition",
            name: c.title,
          })),
        }}
      />
    </PageShell>
  );
}
