import Image from "next/image";
import Link from "next/link";
import { clinic } from "@/content/clinic";
import { routes } from "@/content/routes";
import { formatHours, whatsappLink } from "@/lib/format";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";
import { TourLink } from "./TourLink";

const care = [
  routes.physiotherapy,
  routes.ortho,
  routes.neuro,
  routes.services,
];
const explore = [
  routes.local,
  routes.doctor,
  routes.about,
  routes.contact,
  routes.book,
];
const legal = [routes.privacy, routes.terms, routes.disclaimer];
const social = [
  { name: "Instagram", icon: "instagram", href: clinic.social.instagram },
  { name: "Facebook", icon: "facebook", href: clinic.social.facebook },
] as const;

const link =
  "text-sp-teal-100 underline-offset-4 hover:text-sp-white hover:underline";
const heading = "mb-3 font-display text-base font-semibold text-sp-white";

export function Footer() {
  const { street, locality, city, region, postalCode } = clinic.address;
  return (
    <footer className="mt-auto bg-sp-blue-900 pb-20 text-sp-teal-100 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href={routes.home.path} aria-label={`${clinic.brandName} home`}>
            <Image
              src="/brand/logo.png"
              alt=""
              width={1700}
              height={380}
              className="h-14 w-auto rounded-xl bg-sp-white px-3 py-1"
            />
          </Link>
          <p className="mt-4 max-w-xs">
            {clinic.tagline}. Assessment-led physiotherapy in {locality}, {city}
            .
          </p>
          <ButtonLink
            href={routes.book.path}
            variant="light"
            icon="calendar"
            className="mt-5"
          >
            Book appointment
          </ButtonLink>
        </div>

        <nav aria-label="Care">
          <p className={heading}>Our care</p>
          <ul className="space-y-2">
            {care.map((r) => (
              <li key={r.path}>
                <Link href={r.path} className={link}>
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer">
          <p className={heading}>Explore</p>
          <ul className="space-y-2">
            {explore.map((r) => (
              <li key={r.path}>
                <Link href={r.path} className={link}>
                  {r.name}
                </Link>
              </li>
            ))}
            <li>
              <TourLink className={`${link} min-h-11 text-left`} />
            </li>
          </ul>
        </nav>

        <div>
          <p className={heading}>Visit us</p>
          <address className="flex gap-2 not-italic">
            <Icon name="pin" className="mt-1 size-5 shrink-0" />
            <span>
              {street}
              <br />
              {locality}, {city}, {region} {postalCode}
            </span>
          </address>
          <p className="mt-3 flex gap-2">
            <Icon name="clock" className="mt-1 size-5 shrink-0" />
            {formatHours()}
          </p>
          <p className="mt-3 flex gap-2">
            <Icon name="phone" className="mt-1 size-5 shrink-0" />
            <a href={clinic.phone.tel} className={link}>
              {clinic.phone.display}
            </a>
          </p>
          <p className="mt-3 flex gap-2">
            <Icon name="whatsapp" className="mt-1 size-5 shrink-0" />
            <a
              href={whatsappLink()}
              className={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
          </p>
          <p className="mt-3 flex gap-2">
            <Icon name="arrow" className="mt-1 size-5 shrink-0" />
            <a
              href={clinic.google.directionsUrl}
              className={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
          </p>
          <ul className="mt-4 flex items-center gap-3">
            {social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  aria-label={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-full bg-sp-blue-700 text-sp-white hover:bg-sp-teal-500 hover:text-sp-blue-900"
                >
                  <Icon name={s.icon} />
                </a>
              </li>
            ))}
            <li>
              <a
                href={clinic.social.justdial}
                className={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Justdial
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* The 3D spine is procedural. If a CC-BY model replaces it, add its credit line here. */}
      <div className="border-t border-sp-blue-700">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-sm md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {clinic.brandName}.{" "}
            {clinic.tagline}.
          </p>
          <ul className="flex flex-wrap gap-4">
            {legal.map((r) => (
              <li key={r.path}>
                <Link href={r.path} className={link}>
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
