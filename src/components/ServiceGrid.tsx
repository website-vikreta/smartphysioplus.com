"use client";

import Link from "next/link";
import { useState } from "react";
import type { Service, ServiceGroup } from "@/content/services";
import { cn } from "@/lib/utils";
import { Icon, IconBadge, type IconName } from "./Icon";

const groupIcon: Record<ServiceGroup, IconName> = {
  Spine: "spine",
  Joints: "joint",
  "Neuro & balance": "brain",
  Rehabilitation: "rehab",
  "Special care": "heart",
  Technology: "bolt",
  "Manual therapy": "hands",
};

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
                "sp-tag min-h-11 px-6 text-sm font-medium",
                active === g ? "bg-sp-blue-700 text-sp-white" : "sp-btn-line",
              )}
            >
              {g}
            </button>
          </li>
        ))}
      </ul>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <li
            key={`${s.group}-${s.name}`}
            className="sp-card sp-card-link flex flex-col"
          >
            <IconBadge name={groupIcon[s.group]} />
            <p className="mt-4 text-xs text-sp-blue-900">{s.group}</p>
            <h3 className="mt-1 text-lg font-semibold text-sp-blue-900">
              {s.name}
            </h3>
            <p className="mt-1 flex-1 text-sm">{s.blurb}</p>
            <Link
              href={s.href}
              className="mt-3 inline-flex min-h-11 items-center gap-1 text-sp-blue-700 underline"
            >
              Learn more
              <Icon name="arrow" className="size-4" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
