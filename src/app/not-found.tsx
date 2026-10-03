import { ButtonLink } from "@/components/ButtonLink";
import { routes } from "@/content/routes";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold text-sp-blue-900">
        We could not find that page
      </h1>
      <p className="mt-3">
        The link may be old or mistyped. These pages may help.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href={routes.home.path}>Home</ButtonLink>
        <ButtonLink href={routes.services.path} variant="secondary">
          Services
        </ButtonLink>
        <ButtonLink href={routes.contact.path} variant="secondary">
          Contact
        </ButtonLink>
        <ButtonLink href={routes.book.path} variant="secondary">
          Book appointment
        </ButtonLink>
      </div>
    </main>
  );
}
