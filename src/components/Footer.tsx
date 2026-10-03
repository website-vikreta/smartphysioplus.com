import Link from "next/link";
import { clinic } from "@/content/clinic";
import { routes } from "@/content/routes";
import { formatHours } from "@/lib/format";

const quick = [
  routes.services,
  routes.physiotherapy,
  routes.local,
  routes.ortho,
  routes.neuro,
  routes.doctor,
  routes.about,
  routes.contact,
  routes.book,
];
const legal = [routes.privacy, routes.terms, routes.disclaimer];
const social = [
  { name: "Instagram", href: clinic.social.instagram },
  { name: "Facebook", href: clinic.social.facebook },
  { name: "Justdial", href: clinic.social.justdial },
];
const link = "text-sp-teal-100 underline hover:text-sp-white";

export function Footer() {
  const { street, locality, city, region, postalCode } = clinic.address;
  return (
    <footer className="mt-auto bg-sp-blue-900 pb-20 text-sp-white md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold">
            {clinic.brandName}
          </p>
          <address className="mt-2 not-italic">
            {street}
            <br />
            {locality}, {city}, {region} {postalCode}
          </address>
          <p className="mt-2">
            <a href={clinic.phone.tel} className={link}>
              {clinic.phone.display}
            </a>
          </p>
          <p className="mt-2">{formatHours()}</p>
          <p className="mt-2">
            <a
              href={clinic.google.directionsUrl}
              className={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-semibold">Explore</p>
          <ul className="mt-2 space-y-1">
            {quick.map((r) => (
              <li key={r.path}>
                <Link href={r.path} className={link}>
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-semibold">Follow and legal</p>
          <ul className="mt-2 space-y-1">
            {social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  className={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.name}
                </a>
              </li>
            ))}
            {legal.map((r) => (
              <li key={r.path}>
                <Link href={r.path} className={link}>
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
          {/* TODO(Phase 2): add the "Show me around" tour link and the CC-BY 3D model credit line here. */}
        </div>
      </div>
      <p className="border-t border-sp-blue-700 px-4 py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} {clinic.brandName}. {clinic.tagline}.
      </p>
    </footer>
  );
}
