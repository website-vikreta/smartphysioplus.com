import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { JsonLd } from "@/components/JsonLd";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { conditions } from "@/content/conditions";
import { ownerPage, resolveHref } from "@/content/futureRoutes";
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
                className="sp-tag sp-btn-line inline-flex min-h-11 items-center px-5 text-sm"
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
        <p className="max-w-3xl">
          A computer-guided table applies a slow, controlled stretch to the
          spine. We consider it for some back and neck problems, including some
          disc-related pain, once your assessment supports it.
        </p>
      </Section>

      {conditions.map((c, i) => {
        // Conditions with their own P1 page show its summary here; that page owns the detail.
        const anchor = `${path}#${c.id}`;
        const page = ownerPage(anchor);
        const href = resolveHref(anchor);
        return (
          <Section key={c.id} id={c.id} title={c.title} tint={i % 2 === 1}>
            {page ? (
              <p className="max-w-3xl">{page.summary}</p>
            ) : (
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
            )}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <ButtonLink href={`${routes.book.path}?concern=${c.concern}`}>
                Book for this
              </ButtonLink>
              {href !== anchor && (
                <Link href={href} className="text-sp-blue-700 underline">
                  Read about{" "}
                  {page?.title.toLowerCase() ?? c.title.toLowerCase()}
                </Link>
              )}
            </div>
          </Section>
        );
      })}

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
