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
  { href: routes.about.path, label: "About" },
  { href: routes.contact.path, label: "Contact" },
];

export function Header() {
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
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-medium text-sp-blue-900 hover:text-sp-blue-700"
            >
              {n.label}
            </Link>
          ))}
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
            {nav.map((n) => (
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
