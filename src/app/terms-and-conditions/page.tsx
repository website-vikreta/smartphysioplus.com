import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { clinic } from "@/content/clinic";
import { flags } from "@/content/flags";
import { routes } from "@/content/routes";
import { pageMetadata } from "@/lib/seo";

const path = routes.terms.path;

export const metadata = pageMetadata({
  title: "Terms and Conditions | Smart Physio+",
  description:
    "The terms for using the Smart Physio+ website and requesting appointments online.",
  path,
});

// TODO-CONFIRM: have this draft reviewed by the clinic before launch.
export default function TermsPage() {
  return (
    <PageShell crumbs={[{ name: routes.terms.name, path }]}>
      <PageHeading title="Terms and conditions" />
      <Section>
        <div className="max-w-2xl space-y-4">
          <h2 className="text-xl font-semibold text-sp-blue-900">
            Using this website
          </h2>
          <p>
            This website gives general information about {clinic.brandName}. It
            is not medical advice. Treatment is planned only after an in-person
            assessment.
          </p>
          <h2 className="text-xl font-semibold text-sp-blue-900">
            Appointment requests
          </h2>
          <p>
            An online request is not a confirmed booking. We confirm the exact
            time with you by WhatsApp or phone. The clinic may offer a different
            time if your preferred time is not available.
          </p>
          <h2 className="text-xl font-semibold text-sp-blue-900">
            Emergencies
          </h2>
          <p>
            This service is not for emergencies. In an emergency, contact your
            nearest hospital or emergency services.
          </p>
          <h2 className="text-xl font-semibold text-sp-blue-900">Content</h2>
          <p>
            The content on this site belongs to {clinic.brandName}. Please do
            not copy it without permission.
          </p>
          <p>
            Questions? Call {clinic.phone.display}.
            {/* TODO-CONFIRM: GSTIN / registration details (flag: legalIds). */}
            {flags.legalIds && " Registration details go here."}
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
