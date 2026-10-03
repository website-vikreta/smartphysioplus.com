import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { clinic } from "@/content/clinic";
import { flags } from "@/content/flags";
import { routes } from "@/content/routes";
import { pageMetadata } from "@/lib/seo";

const path = routes.privacy.path;

export const metadata = pageMetadata({
  title: "Privacy Policy | Smart Physio+",
  description:
    "How Smart Physio+ collects, uses, stores and deletes the personal data you share when you book or contact us.",
  path,
});

// TODO-CONFIRM: have this draft reviewed by the clinic (and legal advice if needed) before launch.
export default function PrivacyPage() {
  return (
    <PageShell crumbs={[{ name: routes.privacy.name, path }]}>
      <PageHeading
        title="Privacy policy"
        intro="We collect only what we need to answer you and arrange your appointment."
      />
      <Section>
        <div className="max-w-2xl space-y-4">
          <h2 className="text-xl font-semibold text-sp-blue-900">Who we are</h2>
          <p>
            {clinic.legalDisplayName}, {clinic.address.street},{" "}
            {clinic.address.locality}, {clinic.address.city}{" "}
            {clinic.address.postalCode}. Phone {clinic.phone.display}.
            {/* TODO-CONFIRM: GSTIN / registration details (flag: legalIds). */}
            {flags.legalIds && " Registration details go here."}
          </p>
          <h2 className="text-xl font-semibold text-sp-blue-900">
            What we collect
          </h2>
          <p>
            When you request an appointment: your name, mobile number, optional
            email, your area of concern, preferred time, whether it is your
            first visit and an optional short note. When you send a message:
            your name, mobile number and message. There are no user accounts on
            this site.
          </p>
          <h2 className="text-xl font-semibold text-sp-blue-900">
            Why we collect it
          </h2>
          <p>
            To confirm and manage your appointment, answer your message and
            contact you about it. We do not sell your data.
          </p>
          <h2 className="text-xl font-semibold text-sp-blue-900">
            Who processes it
          </h2>
          <p>
            We use trusted services to run the site: Vercel (hosting), Supabase
            (secure storage of requests), Resend (email) and Cloudflare
            Turnstile (spam protection). If you accept analytics, Google
            Analytics and Vercel Analytics measure how the site is used.
          </p>
          <h2 className="text-xl font-semibold text-sp-blue-900">
            How long we keep it
          </h2>
          <p>
            We keep appointment requests and messages for up to 12 months, then
            delete them.
          </p>
          <h2 className="text-xl font-semibold text-sp-blue-900">
            Your rights
          </h2>
          <p>
            Under India&apos;s Digital Personal Data Protection Act, 2023 you
            can ask us to show, correct or delete your data and withdraw consent
            at any time. Call {clinic.phone.display} to make a request.
          </p>
          <h2 className="text-xl font-semibold text-sp-blue-900">
            Medical information
          </h2>
          <p>
            Please do not put detailed medical history in forms. We will ask for
            what we need at your visit.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
