import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { clinic } from "@/content/clinic";
import { routes } from "@/content/routes";
import { pageMetadata } from "@/lib/seo";

const path = routes.disclaimer.path;

export const metadata = pageMetadata({
  title: "Medical Disclaimer | Smart Physio+",
  description:
    "Information on this website is general and does not replace an assessment or medical advice from a qualified professional.",
  path,
});

export default function DisclaimerPage() {
  return (
    <PageShell crumbs={[{ name: routes.disclaimer.name, path }]}>
      <PageHeading title="Disclaimer" />
      <Section>
        <div className="max-w-2xl space-y-4">
          <p>
            The information on this website is general. It does not replace an
            assessment by a qualified healthcare professional or advice from
            your doctor.
          </p>
          <p>
            Physiotherapists are qualified healthcare professionals. They work
            alongside doctors and are not medical doctors (MBBS).
          </p>
          <p>
            Every person is different. Whether a treatment suits you is decided
            after an assessment, and results vary. We cannot promise a
            particular outcome.
          </p>
          <p>
            If you have severe pain, sudden weakness, loss of bladder or bowel
            control, chest pain or any emergency, seek urgent medical help. Do
            not wait for a physiotherapy appointment.
          </p>
          <p>Questions about this page? Call {clinic.phone.display}.</p>
        </div>
      </Section>
    </PageShell>
  );
}
