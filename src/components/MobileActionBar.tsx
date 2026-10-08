import Link from "next/link";
import { clinic } from "@/content/clinic";
import { routes } from "@/content/routes";
import { whatsappLink } from "@/lib/format";

const item =
  "flex min-h-14 flex-1 items-center justify-center text-sm font-medium text-sp-blue-900 hover:bg-sp-teal-100";

// Sticky bottom bar, mobile only. Call / WhatsApp / Book are one tap from any page.
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-sp-teal-100 bg-sp-white md:hidden"
    >
      <a href={clinic.phone.tel} className={item}>
        Call
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${item} border-x border-sp-teal-100`}
      >
        WhatsApp
      </a>
      <Link
        href={routes.book.path}
        className="flex min-h-14 flex-1 items-center justify-center bg-sp-blue-700 text-sm font-medium text-sp-white hover:bg-sp-blue-900"
      >
        Book
      </Link>
    </nav>
  );
}
