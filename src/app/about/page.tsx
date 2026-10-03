import Image from "next/image";
import Link from "next/link";
import { StackCards, StackPanel } from "@/components/StackCards";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { TechTabs } from "@/components/TechTabs";
import { clinic } from "@/content/clinic";
import { flags } from "@/content/flags";
import { routes } from "@/content/routes";
import { pageMetadata } from "@/lib/seo";

const path = routes.about.path;

export const metadata = pageMetadata({
  title: "About Smart Physio+ | Robotic Physiotherapy Centre, Pune",
  description:
    "Smart Physio+ is a robotic physiotherapy and rehabilitation centre in Balewadi, Pune. Learn how we work: assessment first, a plan you understand.",
  path,
});

const care = [
  {
    title: "Assessment first",
    body: "We start with a thorough assessment and personalise your plan.",
  },
  {
    title: "Several skills together",
    body: "Manual therapy, osteopathic and chiropractic techniques, exercise and advanced technology can work side by side.",
  },
  {
    title: "Non-surgical first, where possible",
    body: "We assess whether physiotherapy is a good option for you.",
  },
  {
    title: "Clear explanations",
    body: "We explain the plan, track progress and give you a home programme.",
  },
];

export default function AboutPage() {
  return (
    <PageShell crumbs={[{ name: routes.about.name, path }]}>
      <PageHeading
        title="About Smart Physio+"
        intro={`${clinic.brandName} is a physiotherapy and rehabilitation centre in ${clinic.address.locality}, ${clinic.address.city}. Our idea is simple: ${clinic.tagline.toLowerCase()}.`}
      />

      <Section title="How we think about care">
        <StackCards
          items={care.map((c, i) => ({
            key: c.title,
            content: (
              <StackPanel n={i + 1} title={c.title}>
                <p>{c.body}</p>
              </StackPanel>
            ),
          }))}
        />
        {/* TODO-CONFIRM: women-owned clinic (flag: womenOwned). */}
        {flags.womenOwned && (
          <p className="mt-4">Smart Physio+ is a women-owned clinic.</p>
        )}
      </Section>

      <Section title="The clinic" tint>
        <div className="grid gap-4 sm:grid-cols-2">
          <Image
            src="/images/clinic/reception.jpg"
            alt="Reception at Smart Physio+ with the clinic sign and a waiting sofa"
            width={1280}
            height={854}
            className="w-full rounded-2xl"
          />
          <Image
            src="/images/clinic/treatment-room.jpg"
            alt="Treatment room with the RoboSpine robotic decompression table"
            width={1400}
            height={934}
            className="w-full rounded-2xl"
          />
        </div>
      </Section>

      <Section title="The technology">
        <TechTabs />
      </Section>

      <Section tint>
        <p className="max-w-2xl">
          Meet{" "}
          <Link
            href={routes.doctor.path}
            className="text-sp-blue-700 underline"
          >
            Dr. Nileema Chaudhary
          </Link>
          , browse{" "}
          <Link
            href={routes.services.path}
            className="text-sp-blue-700 underline"
          >
            our services
          </Link>{" "}
          or{" "}
          <Link
            href={routes.contact.path}
            className="text-sp-blue-700 underline"
          >
            find the clinic
          </Link>
          .
        </p>
      </Section>
    </PageShell>
  );
}
