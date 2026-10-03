import Link from "next/link";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { StackCards, StackPanel } from "@/components/StackCards";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { physioFaq } from "@/content/faq";
import { routes } from "@/content/routes";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const path = routes.physiotherapy.path;

export const metadata = pageMetadata({
  title: "Physiotherapy Treatment: Assessment to Recovery | Smart Physio+",
  description:
    "How physiotherapy works at Smart Physio+ in Balewadi, Pune: assessment, a personal treatment plan and rehabilitation. Book an assessment today.",
  path,
});

const journey = [
  {
    title: "1. Assessment (your first visit)",
    points: [
      "We listen to your story: where it hurts, when it started and what makes it better or worse.",
      "Dr. Nileema reviews any scans, reports or prescriptions you bring before planning.",
      "She examines how you move, then explains what she finds in plain words.",
    ],
  },
  {
    title: "2. Treatment",
    points: [
      "We build a personal plan. It can combine manual therapy, exercise and advanced technology.",
      "We explain each part of the plan and why it is in there.",
      "You can ask questions at any time.",
    ],
  },
  {
    title: "3. Rehabilitation",
    points: [
      "Exercises help you rebuild strength and movement.",
      "We check your progress and adjust the plan.",
      "You get a home exercise routine to keep improving between visits.",
    ],
  },
];

export default function PhysiotherapyPage() {
  return (
    <PageShell crumbs={[{ name: routes.physiotherapy.name, path }]}>
      <PageHeading
        title="Physiotherapy at Smart Physio+: assessment, treatment and rehabilitation"
        intro="Physiotherapy helps you move better and hurt less. At our Balewadi clinic, every plan starts with a thorough assessment."
      />

      <Section title="What physiotherapy is">
        <p className="max-w-2xl">
          Physiotherapy is a health profession that looks at how your body
          moves. A physiotherapist finds what may be causing pain or stiffness
          and plans treatment: hands-on therapy, exercise, advice and, when it
          suits, machines. It is used for back and neck pain, joint problems,
          sports injuries, recovery after surgery and balance problems.
        </p>
      </Section>

      <Section id="journey" title="The 3-step journey" tint>
        <StackCards
          items={journey.map((j, i) => ({
            key: j.title,
            content: (
              <StackPanel
                n={i + 1}
                title={j.title}
                image={
                  <PlaceholderImage
                    name={(["leg", "back", "exercise"] as const)[i % 3]}
                    alt={`Placeholder photo for ${j.title.toLowerCase()}`}
                    className="h-44 w-full object-cover md:h-full md:min-h-56"
                  />
                }
              >
                <ul className="list-disc space-y-2 pl-5">
                  {j.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </StackPanel>
            ),
          }))}
        />
      </Section>

      <Section id="approaches" title="Treatment approaches">
        <ul className="grid max-w-3xl gap-3">
          <li>
            <strong>Manual therapy:</strong> skilled hands-on treatment,
            including myofascial release and kinesio taping.
          </li>
          <li>
            <strong>Chiropractic and osteopathic techniques:</strong> used when
            your assessment supports them.
          </li>
          <li>
            <strong>Therapeutic exercise:</strong> exercises chosen for your
            problem and your goals.
          </li>
          <li>
            <strong>Advanced technology:</strong> robotic spine decompression,
            TECAR, shockwave, laser and more.
          </li>
        </ul>
        <p className="mt-4">
          See everything we offer on our{" "}
          <Link
            href={routes.services.path}
            className="text-sp-blue-700 underline"
          >
            physiotherapy services page
          </Link>
          .
        </p>
      </Section>

      <Section id="who-we-see" title="Who we see" tint>
        <ul className="grid max-w-3xl list-disc gap-2 pl-5">
          <li>Adults with back, neck or joint pain</li>
          <li>Athletes and active people with sports injuries</li>
          <li>Older adults who want safer movement and better balance</li>
          <li>Women who need women&apos;s health physiotherapy</li>
          <li>Children who need pediatric physiotherapy</li>
        </ul>
        <p className="mt-4">
          Explore{" "}
          <Link href={routes.ortho.path} className="text-sp-blue-700 underline">
            orthopedic physiotherapy for spine, joint and muscle pain
          </Link>{" "}
          or{" "}
          <Link href={routes.neuro.path} className="text-sp-blue-700 underline">
            neuro physiotherapy for balance and movement
          </Link>
          . Meet{" "}
          <Link
            href={routes.doctor.path}
            className="text-sp-blue-700 underline"
          >
            Dr. Nileema Chaudhary
          </Link>
          .
        </p>
      </Section>

      <Section id="faq" title="Common questions">
        <Faq items={physioFaq} />
        <div className="mt-6">
          <DisclaimerNote />
        </div>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          url: absoluteUrl(path),
          name: "Physiotherapy at Smart Physio+",
          about: { "@type": "MedicalTherapy", name: "Physiotherapy" },
        }}
      />
    </PageShell>
  );
}
