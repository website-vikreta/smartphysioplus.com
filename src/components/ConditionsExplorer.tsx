"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { type Filter, filters } from "@/content/bodyAreas";
import { routes } from "@/content/routes";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const BodyMap = dynamic(() => import("./BodyMap").then((m) => m.BodyMap), {
  ssr: false,
});

export type ConditionCard = {
  slug: string;
  title: string;
  summary: string;
  area: Filter;
  href: string;
};

const areaLabel = (a: Filter) =>
  filters.find((f) => f.id === a)?.label ?? (a === "joints" ? "Joints" : a);

// Cards for live condition pages only. Filter chips are the accessible control; the body map mirrors them.
export function ConditionsExplorer({ cards }: { cards: ConditionCard[] }) {
  // ?region= from Home seeds the filter after hydration; a chip tap overrides it ("" = cleared).
  const urlRegion = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(location.search).get("region"),
    () => null,
  );
  const [picked, setPicked] = useState<Filter | "" | undefined>();
  const fromUrl = filters.find((f) => f.id === urlRegion)?.id;
  const filter = (picked === undefined ? fromUrl : picked || null) ?? null;

  const pick = (f: Filter | null) => {
    setPicked(f ?? "");
    if (f) track("hub_filter", { region: f });
  };
  const active = filters.find((f) => f.id === filter);
  const shown = active
    ? cards.filter((c) => active.areas.includes(c.area))
    : cards;

  return (
    <>
      <ul className="flex flex-wrap gap-2" aria-label="Filter by body area">
        {filters.map((f) => (
          <li key={f.id}>
            <button
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => pick(filter === f.id ? null : f.id)}
              className={cn(
                "sp-tag min-h-12 px-6 font-medium",
                filter === f.id
                  ? "bg-sp-blue-700 text-sp-white"
                  : "sp-btn-line",
              )}
            >
              {f.label}
            </button>
          </li>
        ))}
      </ul>
      <p aria-live="polite" className="sr-only">
        Showing {shown.length} of {cards.length} conditions
      </p>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c) => (
          <li key={c.slug} className="sp-card sp-card-link flex flex-col">
            <span className="sp-tag w-fit bg-sp-teal-100 px-3 py-0.5 text-xs font-medium">
              {areaLabel(c.area)}
            </span>
            <h2 className="mt-3 text-lg font-semibold text-sp-blue-900">
              {c.title}
            </h2>
            <p className="mt-1 flex-1 text-sm">{c.summary}</p>
            <Link
              href={c.href}
              onClick={() => track("hub_card_click", { slug: c.slug })}
              className="mt-4 inline-flex min-h-12 items-center text-sp-blue-700 underline"
            >
              Read about {c.title.toLowerCase()}
            </Link>
          </li>
        ))}
        <li className="sp-card sp-card-link flex flex-col bg-sp-mist">
          <h2 className="text-lg font-semibold text-sp-blue-900">
            Not sure what&apos;s causing it?
          </h2>
          <p className="mt-1 flex-1 text-sm">
            Pain in one place often comes from somewhere else. An assessment
            finds the likely cause.
          </p>
          <Link
            href={`${routes.book.path}?concern=not_sure`}
            className="mt-4 inline-flex min-h-12 items-center text-sp-blue-700 underline"
          >
            Book an assessment
          </Link>
        </li>
      </ul>

      <div className="mt-10">
        <BodyMap selected={filter} onSelect={pick} />
      </div>
    </>
  );
}
