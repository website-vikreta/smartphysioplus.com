import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { clinic } from "@/content/clinic";
import { routes } from "@/content/routes";
import { formatHours, whatsappLink } from "@/lib/format";
import { ButtonLink } from "./ButtonLink";
import { BrandLogo, IconBadge, type IconName } from "./Icon";
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
  { name: "Instagram", logo: "instagram", href: clinic.social.instagram },
  { name: "Facebook", logo: "facebook", href: clinic.social.facebook },
] as const;

const link = "text-sp-teal-100 transition-colors hover:text-sp-white";
const tile =
  "flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1";

// Same heading style as page sections: title with a short teal bar.
function Heading({ children }: { children: string }) {
  return (
    <div className="mb-5">
      <p className="font-display text-lg font-semibold text-sp-white">
        {children}
      </p>
      <span
        className="mt-2 block h-1 w-10 rounded-full bg-sp-teal-500"
        aria-hidden="true"
      />
    </div>
  );
}

function Tile({
  icon,
  title,
  children,
}: {
  icon: IconName | "whatsapp";
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={tile}>
      {icon === "whatsapp" ? (
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-sp-teal-100 text-sp-blue-700">
          <BrandLogo name="whatsapp" className="size-6" />
        </span>
      ) : (
        <IconBadge name={icon} className="!size-11 shrink-0" />
      )}
      <div>
        <p className="font-display font-semibold text-sp-white">{title}</p>
        <div className="mt-1 text-sm text-sp-teal-100">{children}</div>
      </div>
    </div>
  );
}

export function Footer() {
  const { street, locality, city, region, postalCode } = clinic.address;
  return (
    <footer className="sp-dark mt-auto rounded-t-[2.5rem] pb-20 text-sp-teal-100 md:pb-0">
      <div className="mx-auto max-w-6xl px-4 pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href={routes.home.path}
              aria-label={`${clinic.brandName} home`}
            >
              <Image
                src="/brand/logo.png"
                alt=""
                width={1700}
                height={380}
                className="h-14 w-auto rounded-2xl bg-sp-white px-4 py-1"
              />
            </Link>
            <p className="mt-5 max-w-sm">
              {clinic.tagline}. Assessment-led physiotherapy in {locality},{" "}
              {city}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink
                href={routes.book.path}
                variant="light"
                icon="calendar"
              >
                Book appointment
              </ButtonLink>
              {social.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sp-tag inline-flex h-12 w-14 items-center justify-center bg-white/15 text-sp-white hover:bg-sp-white hover:text-sp-blue-900"
                >
                  <BrandLogo name={s.logo} className="size-6" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Care">
            <Heading>Our care</Heading>
            <ul className="space-y-3">
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
            <Heading>Explore</Heading>
            <ul className="space-y-3">
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
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Tile icon="pin" title="Visit us">
            <address className="not-italic">
              {street}, {locality}, {city}, {region} {postalCode}
            </address>
            <a
              href={clinic.google.directionsUrl}
              className={`${link} mt-2 inline-block underline underline-offset-4`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
          </Tile>
          <Tile icon="clock" title="Opening hours">
            {formatHours()}
          </Tile>
          <Tile icon="phone" title="Call us">
            <a href={clinic.phone.tel} className={link}>
              {clinic.phone.display}
            </a>
          </Tile>
          <Tile icon="whatsapp" title="WhatsApp">
            <a
              href={whatsappLink()}
              className={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us
            </a>
            <span className="mt-2 block">
              <a
                href={clinic.social.justdial}
                className={`${link} underline underline-offset-4`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Find us on Justdial
              </a>
            </span>
          </Tile>
        </div>
      </div>
      {/* The 3D spine is procedural. If a CC-BY model replaces it, add its credit line here. */}
      <div className="mt-12 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {clinic.brandName}.{" "}
            {clinic.tagline}.
          </p>
          <ul className="flex flex-wrap gap-5">
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
