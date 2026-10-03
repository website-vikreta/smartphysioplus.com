import Link from "next/link";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { TechCarousel } from "@/components/TechCarousel";
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

export default function AboutPage() {
  return (
    <PageShell crumbs={[{ name: routes.about.name, path }]}>
      <PageHeading
        title="About Smart Physio+"
        intro={`${clinic.brandName} is a physiotherapy and rehabilitation centre in ${clinic.address.locality}, ${clinic.address.city}. Our idea is simple: ${clinic.tagline.toLowerCase()}.`}
      />

      <Section title="How we think about care">
        <ul className="grid max-w-3xl list-disc gap-2 pl-5">
          <li>
            <strong>Assessment first.</strong> We start with a thorough
            assessment and personalise your plan.
          </li>
          <li>
            <strong>Several skills together.</strong> Manual therapy,
            osteopathic and chiropractic techniques, exercise and advanced
            technology can work side by side.
          </li>
          <li>
            <strong>Non-surgical first, where possible.</strong> We assess
            whether physiotherapy is a good option for you.
          </li>
          <li>
            <strong>Clear explanations.</strong> We explain the plan, track
            progress and give you a home programme.
          </li>
        </ul>
        {/* TODO-CONFIRM: women-owned clinic (flag: womenOwned). */}
        {flags.womenOwned && (
          <p className="mt-4">Smart Physio+ is a women-owned clinic.</p>
        )}
      </Section>

      <Section title="The clinic" tint>
        <div className="grid gap-4 sm:grid-cols-2">
          <PlaceholderImage
            name="clinic"
            alt="Placeholder photo of the clinic reception"
            className="w-full"
          />
          <PlaceholderImage
            name="clinic"
            alt="Placeholder photo of a treatment room"
            className="w-full"
          />
        </div>
      </Section>

      <Section title="The technology">
        <TechCarousel />
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
