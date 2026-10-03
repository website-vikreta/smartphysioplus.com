import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { StackCards, StackPanel } from "@/components/StackCards";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { neuroFaq } from "@/content/faq";
import { flags } from "@/content/flags";
import { routes } from "@/content/routes";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const path = routes.neuro.path;

export const metadata = pageMetadata({
  title: "Neuro Physiotherapy in Balewadi, Pune | Smart Physio+",
  description:
    "Neuro physiotherapy for balance, movement and recovery in Balewadi, Pune. Learn what a neuro assessment includes and how to book at Smart Physio+.",
  path,
});

const assessment = [
  "Your history, symptoms and goals",
  "A review of any reports or scans you bring",
  "Checks of balance, movement and strength",
  "A clear explanation of the plan",
];

export default function NeuroPage() {
  return (
    <PageShell crumbs={[{ name: routes.neuro.name, path }]}>
      <PageHeading
        title="Neuro physiotherapy for balance, movement and recovery"
        intro="Neuro physiotherapy helps with problems where the nervous system affects how you move or balance. Your plan is set after a careful assessment."
      />

      <Section title="What neuro physiotherapy is">
        <p className="max-w-2xl">
          General physiotherapy often focuses on muscles, joints and the spine.
          Neuro physiotherapy focuses on how the brain and nerves control
          movement and balance, and on helping you relearn and strengthen those
          movements. Learn how the process works on our{" "}
          <Link
            href={routes.physiotherapy.path}
            className="text-sp-blue-700 underline"
          >
            physiotherapy page
          </Link>
          .
        </p>
      </Section>

      <Section id="vertigo-balance" title="Vertigo and balance" tint>
        <p className="max-w-2xl">
          We offer balance exercise therapy for people with dizziness or
          vertigo. After an assessment, a plan can include exercises that train
          your balance and help you feel steadier.
        </p>
        <ButtonLink
          href={`${routes.book.path}?concern=not_sure`}
          className="mt-4"
        >
          Book for this
        </ButtonLink>
      </Section>

      <Section id="neurological-rehab" title="Neurological rehabilitation">
        <p className="max-w-2xl">
          Neurological rehabilitation helps you work on movement, strength and
          everyday function after a nervous system problem. We assess you first,
          then plan exercises and treatment around your goals.
        </p>
      </Section>

      {/* TODO-CONFIRM: stroke rehabilitation programme (flag: neuroStroke). */}
      {flags.neuroStroke && (
        <Section id="stroke-rehab" title="Stroke rehabilitation" tint>
          <p className="max-w-2xl">
            Stroke rehabilitation details go here once confirmed.
          </p>
        </Section>
      )}

      {/* TODO-CONFIRM: pediatric and cerebral palsy programme (flag: neuroCP). */}
      {flags.neuroCP && (
        <Section
          id="pediatric-cerebral-palsy"
          title="Children and cerebral palsy"
        >
          <p className="max-w-2xl">
            Pediatric and cerebral palsy programme details go here once
            confirmed.
          </p>
        </Section>
      )}

      <Section title="What a neuro assessment includes" tint>
        <StackCards
          items={assessment.map((t, i) => ({
            key: t,
            content: <StackPanel n={i + 1} title={t} />,
          }))}
        />
        <p className="mt-4 max-w-2xl">
          Family members and caregivers are welcome to come along and ask
          questions. Meet{" "}
          <Link
            href={routes.doctor.path}
            className="text-sp-blue-700 underline"
          >
            Dr. Nileema Chaudhary
          </Link>{" "}
          or see our{" "}
          <Link href={routes.local.path} className="text-sp-blue-700 underline">
            clinic in Baner and Balewadi
          </Link>
          .
        </p>
      </Section>

      <Section title="Common questions">
        <Faq items={neuroFaq} />
        <div className="mt-6">
          <DisclaimerNote />
        </div>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          url: absoluteUrl(path),
          name: "Neuro physiotherapy at Smart Physio+",
          about: [{ "@type": "MedicalCondition", name: "Vertigo" }],
        }}
      />
    </PageShell>
  );
}
