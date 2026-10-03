import { Suspense } from "react";
import { BookingStepper } from "@/components/BookingStepper";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { clinic } from "@/content/clinic";
import { routes } from "@/content/routes";
import { formatHours, whatsappLink } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { DEFAULT_SLOT_MINUTES } from "@/lib/slots";

const path = routes.book.path;

export const metadata = pageMetadata({
  title: "Book a Physiotherapy Appointment in Balewadi | Smart Physio+",
  description:
    "Request a physiotherapy appointment at Smart Physio+ in Balewadi, Pune. No account needed. We confirm your time on WhatsApp or by phone.",
  path,
});

export default function BookPage() {
  const slotMinutes = Number(process.env.SLOT_MINUTES) || DEFAULT_SLOT_MINUTES;
  return (
    <PageShell crumbs={[{ name: routes.book.name, path }]}>
      <PageHeading
        title="Book your appointment"
        intro="Send a request in under a minute. No account needed. We will confirm the exact time with you on WhatsApp or by phone."
      />
      <Section>
        <ul className="mb-6 space-y-1">
          <li>Open {formatHours()}</li>
          <li>
            {clinic.address.street}, {clinic.address.locality},{" "}
            {clinic.address.city}
          </li>
        </ul>
        <p className="mb-2 font-medium">Prefer to talk?</p>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={clinic.phone.tel} variant="secondary">
            Call {clinic.phone.display}
          </ButtonLink>
          <ButtonLink
            href={whatsappLink()}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us
          </ButtonLink>
        </div>
        <Suspense fallback={<p>Loading the booking form...</p>}>
          <BookingStepper slotMinutes={slotMinutes} />
        </Suspense>
      </Section>
    </PageShell>
  );
}
