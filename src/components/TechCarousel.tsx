import Link from "next/link";
import { routes } from "@/content/routes";
import { technology } from "@/content/technology";
import { PlaceholderImage } from "./PlaceholderImage";

// Horizontal snap carousel. Native scrolling: keyboard and touch work with no JS.
export function TechCarousel() {
  return (
    <ul
      className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4"
      aria-label="Technology at the clinic"
      tabIndex={0}
    >
      {technology.map((t) => (
        <li
          key={t.name}
          className="w-72 shrink-0 snap-start bg-sp-white md:w-80"
        >
          <PlaceholderImage
            name="equipment"
            alt={`Placeholder image for ${t.name}`}
            className="h-40 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-sp-blue-900">{t.name}</h3>
            <p className="mt-1 text-sm">{t.what}</p>
            <p className="mt-1 text-sm">Commonly used for: {t.usedFor}</p>
            <Link
              href={routes.book.path}
              className="mt-2 inline-flex min-h-12 items-center text-sp-blue-700 underline"
            >
              Ask if it suits you
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
