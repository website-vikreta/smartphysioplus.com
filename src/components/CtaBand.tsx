import { clinic } from "@/content/clinic";
import { routes } from "@/content/routes";
import { whatsappLink } from "@/lib/format";
import { ButtonLink } from "./ButtonLink";
import { BrandLogo, Icon } from "./Icon";

// Reused at the end of every indexable page.
export function CtaBand() {
  const { street, locality, city, postalCode } = clinic.address;
  return (
    <section id="book-cta" aria-labelledby="cta-heading" className="px-4 py-12">
      <div className="sp-dark mx-auto max-w-6xl rounded-3xl px-6 py-12 text-center md:px-12">
        <h2 id="cta-heading" className="text-2xl font-semibold md:text-3xl">
          Ready for a clear treatment plan?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sp-teal-100">
          We start with a thorough assessment. No account needed to book.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={routes.book.path} variant="light" icon="calendar">
            Book appointment
          </ButtonLink>
          <ButtonLink href={clinic.phone.tel} variant="light" icon="phone">
            Call {clinic.phone.display}
          </ButtonLink>
          <ButtonLink
            href={whatsappLink()}
            variant="light"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BrandLogo name="whatsapp" className="size-5" />
            WhatsApp
          </ButtonLink>
        </div>
        <p className="mt-6 inline-flex items-center gap-2 text-sm text-sp-teal-100">
          <Icon name="pin" className="size-4" />
          {street}, {locality}, {city} {postalCode}
        </p>
      </div>
    </section>
  );
}
