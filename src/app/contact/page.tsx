import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/ContactForm";
import { MapFacade } from "@/components/MapFacade";
import { PageHeading, PageShell, Section } from "@/components/PageShell";
import { clinic } from "@/content/clinic";
import { flags } from "@/content/flags";
import { routes } from "@/content/routes";
import { formatHours, whatsappLink } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

const path = routes.contact.path;

export const metadata = pageMetadata({
  title: "Contact Smart Physio+ | Balewadi, Pune | +91 86699 22351",
  description:
    "Call, WhatsApp or visit Smart Physio+ at 402 Archway, Sopan Baug Road, Balewadi, Pune. See hours and directions, or send us a message.",
  path,
});

const dayRows = [
  ["Monday to Saturday", formatHours().split(", ")[1]],
  // TODO-CONFIRM: show "Sunday: closed" only after confirmation (flag: sunday).
  ...(flags.sunday ? [["Sunday", "Closed"]] : []),
];

export default function ContactPage() {
  const a = clinic.address;
  return (
    <PageShell crumbs={[{ name: routes.contact.name, path }]}>
      <PageHeading title="Contact and directions" />
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-sp-blue-900">
              {clinic.brandName}
            </h2>
            <address className="mt-2 not-italic">
              {a.street}
              <br />
              {a.locality}, {a.city}, {a.region} {a.postalCode}
            </address>
            <p className="mt-2">
              <a href={clinic.phone.tel} className="text-sp-blue-700 underline">
                {clinic.phone.display}
              </a>
            </p>
            <table className="mt-4 text-left">
              <caption className="sr-only">Opening hours</caption>
              <tbody>
                {dayRows.map(([d, h]) => (
                  <tr key={d}>
                    <th scope="row" className="pr-6 font-medium">
                      {d}
                    </th>
                    <td>{h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex flex-wrap gap-3">
              <ButtonLink href={clinic.phone.tel}>Call</ButtonLink>
              <ButtonLink
                href={whatsappLink()}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </ButtonLink>
              <ButtonLink
                href={clinic.google.directionsUrl}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
              </ButtonLink>
            </div>
          </div>
          <MapFacade />
        </div>
      </Section>
      <Section title="Send us a message" tint>
        <ContactForm />
        <p className="mt-6">
          Want an appointment instead?{" "}
          <Link href={routes.book.path} className="text-sp-blue-700 underline">
            Book an appointment
          </Link>
          .
        </p>
      </Section>
    </PageShell>
  );
}
