"use client";

import { NavLoader } from "./NavLoader";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { clinic } from "@/content/clinic";
import { routes } from "@/content/routes";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";

const nav = [
  { href: routes.services.path, label: "Services" },
  { href: routes.physiotherapy.path, label: "Physiotherapy" },
  { href: routes.doctor.path, label: "Doctor" },
  { href: routes.contact.path, label: "Contact" },
];

type NavLink = { href: string; label: string };

// Dropdown. With `href` the label is a link to a hub and the chevron button opens the list.
function NavMenu({
  id,
  label,
  href,
  items,
}: {
  id: string;
  label: string;
  href?: string;
  items: NavLink[];
}) {
  const [menu, setMenu] = useState(false);
  const cls =
    "inline-flex min-h-11 items-center gap-1 font-medium text-sp-blue-900 hover:text-sp-blue-700";
  return (
    <div
      className="relative flex items-center"
      onMouseLeave={() => setMenu(false)}
      onKeyDown={(e) => e.key === "Escape" && setMenu(false)}
    >
      {href && (
        <Link href={href} className={cls}>
          {label}
        </Link>
      )}
      <button
        type="button"
        aria-expanded={menu}
        aria-controls={id}
        aria-label={href ? `${label} pages` : undefined}
        onClick={() => setMenu((v) => !v)}
        onMouseEnter={() => setMenu(true)}
        className={cls}
      >
        {!href && label}
        <Icon name="chevron" className="size-4" />
      </button>
      {menu && (
        <ul
          id={id}
          className="sp-card absolute left-0 top-full z-50 w-72 space-y-1 !p-3 shadow-xl"
        >
          {items.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                onClick={() => setMenu(false)}
                className="block rounded-lg px-3 py-2 text-sp-blue-900 hover:bg-sp-mist"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// `conditions` = live P1 pages and `more` = About plus the live P2 pages, both passed from the layout.
// `conditionsHub` is set once /conditions/ is publishable. Top level stays at six items.
export function Header({
  conditions,
  conditionsHub,
  more,
}: {
  conditions: NavLink[];
  conditionsHub?: string;
  more: NavLink[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sp-teal-100 bg-sp-white/95 backdrop-blur">
      <NavLoader />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={routes.home.path} aria-label={`${clinic.brandName} home`}>
          <Image
            src="/brand/logo.png"
            alt={`${clinic.brandName} logo: ${clinic.tagline}`}
            width={1700}
            height={380}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {conditions.length > 0 && (
            <NavMenu
              id="conditions-menu"
              label="Conditions"
              href={conditionsHub}
              items={conditions}
            />
          )}
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-medium text-sp-blue-900 hover:text-sp-blue-700"
            >
              {n.label}
            </Link>
          ))}
          <NavMenu id="more-menu" label="More" items={more} />
          <ButtonLink href={routes.book.path} icon="calendar">
            {routes.book.name}
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-12 min-w-12 items-center justify-center sp-tag sp-btn-line md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} className="size-6" />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-sp-teal-100 bg-sp-white px-4 pb-4 md:hidden"
        >
          <ul className="flex flex-col">
            {[
              ...(conditionsHub
                ? [{ href: conditionsHub, label: "All conditions" }]
                : []),
              ...conditions,
              ...nav,
              ...more,
            ].map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block min-h-12 py-3 font-medium text-sp-blue-900"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink
            href={routes.book.path}
            onClick={() => setOpen(false)}
            className="mt-2 w-full"
          >
            {routes.book.name}
          </ButtonLink>
        </nav>
      )}
    </header>
  );
}
