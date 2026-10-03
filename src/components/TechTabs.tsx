"use client";

import Image from "next/image";
import { useState } from "react";
import { technology } from "@/content/technology";
import { routes } from "@/content/routes";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ButtonLink";
import { PlaceholderImage } from "./PlaceholderImage";

// Tabbed technology showcase. Arrow keys move between tabs.
export function TechTabs() {
  const [i, setI] = useState(0);
  const t = technology[i];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n =
      (i + (e.key === "ArrowRight" ? 1 : -1) + technology.length) %
      technology.length;
    setI(n);
    document.getElementById(`tech-tab-${n}`)?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Technology"
        onKeyDown={onKey}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2"
      >
        {technology.map((x, n) => (
          <button
            key={x.name}
            id={`tech-tab-${n}`}
            role="tab"
            type="button"
            aria-selected={i === n}
            aria-controls="tech-panel"
            tabIndex={i === n ? 0 : -1}
            onClick={() => setI(n)}
            className={cn(
              "sp-btn min-h-12 shrink-0 px-8 font-medium",
              i === n ? "bg-sp-blue-700 text-sp-white" : "sp-btn-line",
            )}
          >
            {x.name}
          </button>
        ))}
      </div>
      <div
        id="tech-panel"
        role="tabpanel"
        aria-labelledby={`tech-tab-${i}`}
        className="sp-card mt-4 grid items-center gap-6 md:grid-cols-2"
      >
        {i === 0 ? (
          // Real clinic photo of the RoboSpine table.
          <Image
            src="/images/clinic/treatment-room.jpg"
            alt={`${t.name} table at Smart Physio+`}
            width={1400}
            height={934}
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        ) : (
          <PlaceholderImage
            name={`tech-${(i + 1) as 2 | 3 | 4 | 5 | 6}`}
            alt={`Placeholder photo for ${t.name}`}
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        )}
        <div>
          <h3 className="text-xl font-semibold text-sp-blue-900">{t.name}</h3>
          <p className="mt-2">{t.what}</p>
          <p className="mt-2">
            <strong>Commonly used for:</strong> {t.usedFor}
          </p>
          <ButtonLink href={routes.book.path} icon="calendar" className="mt-5">
            Ask if it suits you
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
