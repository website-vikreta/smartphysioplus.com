"use client";

import Link from "next/link";
import { useState } from "react";
import type { Service, ServiceGroup } from "@/content/services";
import { cn } from "@/lib/utils";

export function ServiceGrid({
  services,
  groups,
}: {
  services: Service[];
  groups: ServiceGroup[];
}) {
  const [active, setActive] = useState<ServiceGroup | "All">("All");
  const shown =
    active === "All" ? services : services.filter((s) => s.group === active);

  return (
    <div>
      <ul className="flex flex-wrap gap-2" aria-label="Filter services">
        {(["All", ...groups] as const).map((g) => (
          <li key={g}>
            <button
              type="button"
              aria-pressed={active === g}
              onClick={() => setActive(g)}
              className={cn(
                "min-h-11 border-2 border-sp-blue-700 px-3 text-sm font-medium",
                active === g
                  ? "bg-sp-blue-700 text-sp-white"
                  : "bg-sp-white text-sp-blue-900 hover:bg-sp-teal-100",
              )}
            >
              {g}
            </button>
          </li>
        ))}
      </ul>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <li key={`${s.group}-${s.name}`} className="bg-sp-white p-5">
            <p className="text-xs text-sp-blue-900">{s.group}</p>
            <h3 className="mt-1 font-semibold text-sp-blue-900">{s.name}</h3>
            <p className="mt-1 text-sm">{s.blurb}</p>
            <Link
              href={s.href}
              className="mt-2 inline-flex min-h-11 items-center text-sp-blue-700 underline"
            >
              Learn more
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
