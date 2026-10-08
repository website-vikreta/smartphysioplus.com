import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { flags } from "@/content/flags";
import { routes } from "@/content/routes";
import { CLINIC_ID, DOCTOR_ID } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const path = routes.doctor.path;

export const metadata = pageMetadata({
  title: "Dr. Nileema Chaudhary, Physiotherapist in Balewadi | Smart Physio+",
  description:
    "Meet Dr. Nileema Chaudhary, physiotherapist and founder of Smart Physio+ in Balewadi, Pune. Learn her approach and what to expect at your first visit.",
  path,
});

export default function DoctorPage() {
  return (
    <PageShell crumbs={[{ name: routes.doctor.name, path }]}>
      <PageHeading
        title="Dr. Nileema Chaudhary"
        intro="Physiotherapist, founder and lead clinician at Smart Physio+."
      />

      <Section>
        <div className="grid items-start gap-6 md:grid-cols-[16rem_1fr]">
          <PlaceholderImage
            name="portrait"
            alt="Placeholder portrait of Dr. Nileema Chaudhary"
            className="w-64"
          />
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl font-semibold text-sp-blue-900">
              Her approach
            </h2>
            <p>
              We believe in a thorough assessment before any treatment. Dr.
              Nileema reviews your reports, explains the plan clearly and
              combines manual therapy with advanced machines when your
              assessment supports them.
            </p>
            <h2 className="pt-2 text-2xl font-semibold text-sp-blue-900">
              Areas of focus
            </h2>
            <ul className="list-disc pl-5">
              <li>Spine care</li>
              <li>Orthopedic rehabilitation</li>
              <li>Neuro and balance physiotherapy</li>
              <li>Manual therapy</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* TODO-CONFIRM: qualifications and experience (flags: credBPTh, credDOMP, exp10y). */}
      {(flags.credBPTh || flags.credDOMP || flags.exp10y) && (
        <Section title="Qualifications" tint>
          <ul className="list-disc pl-5">
            {flags.credBPTh && (
              <li>B.P.Th., Government Medical College, Nagpur</li>
            )}
            {flags.credDOMP && (
              <li>Diploma in Osteopathic Manual Practice (DOMP), Japan</li>
            )}
            {flags.exp10y && <li>10+ years of clinical experience</li>}
          </ul>
        </Section>
      )}

      <Section
        title="What to expect at your first appointment"
        tint={!(flags.credBPTh || flags.credDOMP || flags.exp10y)}
      >
        <ul className="grid max-w-3xl list-disc gap-2 pl-5">
          <li>A conversation about your pain, history and goals</li>
          <li>A review of any scans or reports you bring</li>
          <li>A physical assessment</li>
          <li>
            A clear explanation of your plan, with a chance to ask questions
          </li>
        </ul>
        <p className="mt-4 max-w-2xl">
          Read{" "}
          <Link
            href={routes.physiotherapy.path}
            className="text-sp-blue-700 underline"
          >
            how physiotherapy works at Smart Physio+
          </Link>{" "}
          or browse{" "}
          <Link
            href={routes.services.path}
            className="text-sp-blue-700 underline"
          >
            our services
          </Link>
          .
        </p>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": DOCTOR_ID,
          name: "Dr. Nileema Chaudhary",
          jobTitle: "Physiotherapist",
          url: absoluteUrl(path),
          worksFor: { "@id": CLINIC_ID },
          // TODO-CONFIRM: add alumniOf / hasCredential only when credBPTh / credDOMP are confirmed.
        }}
      />
    </PageShell>
  );
}
