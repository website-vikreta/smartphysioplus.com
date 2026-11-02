"use client";

import { NavLoader } from "./NavLoader";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { clinic } from "@/content/clinic";
import { routes } from "@/content/routes";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";

// One shape for the whole menu. `href` is optional on a group label; `children` nest one level deeper.
export type NavItem = { label: string; href?: string; children?: NavItem[] };

const linkCls =
  "whitespace-nowrap font-medium text-sp-blue-900 hover:text-sp-blue-700";

function MenuLinks({
  items,
  onPick,
  depth = 0,
}: {
  items: NavItem[];
  onPick: () => void;
  depth?: number;
}) {
  return (
    <ul
      className={depth ? "ml-3 border-l border-sp-teal-100 pl-2" : "space-y-1"}
    >
      {items.map((c) => (
        <li key={c.label}>
          {c.href ? (
            <Link
              href={c.href}
              onClick={onPick}
              className="block rounded-lg px-3 py-2 text-sp-blue-900 hover:bg-sp-mist"
            >
              {c.label}
            </Link>
          ) : (
            <p className="px-3 py-2 text-sm font-semibold text-sp-blue-700">
              {c.label}
            </p>
          )}
          {c.children && (
            <MenuLinks items={c.children} onPick={onPick} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}

// Dropdown. With `href` the label is a link and the chevron button opens the list.
function NavMenu({ item }: { item: NavItem }) {
  const [menu, setMenu] = useState(false);
  const byHover = useRef(false); // a click right after hover-open must not close the menu again
  const id = `menu-${item.label.toLowerCase().replace(/\W+/g, "-")}`;
  const cls = `inline-flex min-h-11 items-center gap-1 ${linkCls}`;
  return (
    <div
      className="relative flex items-center"
      onMouseLeave={() => {
        byHover.current = false;
        setMenu(false);
      }}
      onKeyDown={(e) => e.key === "Escape" && setMenu(false)}
    >
      {item.href && (
        <Link href={item.href} className={cls}>
          {item.label}
        </Link>
      )}
      <button
        type="button"
        aria-expanded={menu}
        aria-controls={id}
        aria-label={item.href ? `${item.label} pages` : undefined}
        onClick={() => {
          if (byHover.current) byHover.current = false;
          else setMenu((v) => !v);
        }}
        onMouseEnter={() => {
          if (!menu) byHover.current = true;
          setMenu(true);
        }}
        className={cls}
      >
        {!item.href && item.label}
        <Icon name="chevron" className="size-4" />
      </button>
      {menu && (
        <div
          id={id}
          className="sp-card absolute left-0 top-full z-50 w-72 !p-3 shadow-xl"
        >
          <MenuLinks
            items={item.children ?? []}
            onPick={() => setMenu(false)}
          />
        </div>
      )}
    </div>
  );
}

export function Header({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sp-teal-100 bg-sp-white/95 backdrop-blur">
      <NavLoader />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3">
        <Link href={routes.home.path} aria-label={`${clinic.brandName} home`}>
          <Image
            src="/brand/logo.png"
            alt={`${clinic.brandName} logo: ${clinic.tagline}`}
            width={1700}
            height={380}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-5 xl:flex">
          {items.map((n) =>
            n.children?.length ? (
              <NavMenu key={n.label} item={n} />
            ) : (
              <Link key={n.label} href={n.href!} className={linkCls}>
                {n.label}
              </Link>
            ),
          )}
          <ButtonLink href={routes.book.path} icon="calendar" className="ml-4">
            {routes.book.name}
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-12 min-w-12 items-center justify-center sp-tag sp-btn-line xl:hidden"
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
          className="max-h-[75vh] overflow-y-auto border-t border-sp-teal-100 bg-sp-white px-4 pb-4 xl:hidden"
        >
          <MobileLinks items={items} onPick={() => setOpen(false)} />
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

function MobileLinks({
  items,
  onPick,
  depth = 0,
}: {
  items: NavItem[];
  onPick: () => void;
  depth?: number;
}) {
  return (
    <ul
      className={
        depth ? "ml-4 border-l border-sp-teal-100 pl-3" : "flex flex-col"
      }
    >
      {items.map((n) => (
        <li key={n.label}>
          {n.href ? (
            <Link
              href={n.href}
              onClick={onPick}
              className={`block min-h-12 py-3 ${depth ? "text-sp-blue-900" : "font-medium text-sp-blue-900"}`}
            >
              {n.label}
            </Link>
          ) : (
            <p className="min-h-12 py-3 font-medium text-sp-blue-900">
              {n.label}
            </p>
          )}
          {n.children && (
            <MobileLinks items={n.children} onPick={onPick} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}
