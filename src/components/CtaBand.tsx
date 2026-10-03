import { clinic } from "@/content/clinic";
import { routes } from "@/content/routes";
import { whatsappLink } from "@/lib/format";
import { ButtonLink } from "./ButtonLink";

// Reused at the end of every indexable page.
export function CtaBand() {
  const { street, locality, city, postalCode } = clinic.address;
  return (
    <section
      id="book-cta"
      aria-labelledby="cta-heading"
      className="bg-sp-teal-100"
    >
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h2
          id="cta-heading"
          className="text-2xl font-semibold text-sp-blue-900"
        >
          Ready for a clear treatment plan?
        </h2>
        <p className="mt-2">
          We start with a thorough assessment. No account needed to book.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={routes.book.path}>Book appointment</ButtonLink>
          <ButtonLink href={clinic.phone.tel} variant="secondary">
            Call {clinic.phone.display}
          </ButtonLink>
          <ButtonLink
            href={whatsappLink()}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </ButtonLink>
        </div>
        <p className="mt-4 text-sm">
          {street}, {locality}, {city} {postalCode}
        </p>
      </div>
    </section>
  );
}
