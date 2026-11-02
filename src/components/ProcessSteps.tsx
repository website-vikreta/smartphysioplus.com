"use client";

import {
  Activity,
  CalendarCheck,
  ClipboardList,
  Route,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { type CSSProperties, useState } from "react";
import { processSteps, type ProcessIcon } from "@/content/process";
import { cn } from "@/lib/utils";

const icons: Record<ProcessIcon, LucideIcon> = {
  ClipboardList,
  Route,
  Activity,
  TrendingUp,
  CalendarCheck,
};

// "Your recovery, step by step": five labels travel round a circular path. Hover, focus or tap one and the orbit
// pauses, its photo fades in at the centre of the circle and its description opens in a card beside it
// (below the circle on phones). Every step stays in the HTML. The page supplies the H2 through <Section>.
// Photos are placeholders (PLACEHOLDERS.md).
export function ProcessSteps() {
  const [hover, setHover] = useState<number | null>(null);
  const [pin, setPin] = useState<number | null>(null);
  const active = hover ?? pin;

  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-10">
      <div className="sp-orbit" data-paused={active !== null ? "" : undefined}>
        {/* The circular path and the labels turn together; each label turns back so its text stays upright. */}
        <div className="sp-ring sp-ring-path" aria-hidden="true" />
        <ol
          className="sp-ring sp-ring-items"
          aria-label="Your recovery, step by step"
        >
          {processSteps.map((s, i) => (
            <li
              key={s.title}
              className="sp-orb"
              style={{ "--a": `${i * 72}deg` } as CSSProperties}
            >
              <div className="sp-orb-label">
                <button
                  type="button"
                  aria-expanded={active === i}
                  aria-controls={`process-${i}`}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  onClick={() => {
                    setHover(null);
                    setPin(pin === i ? null : i);
                  }}
                  className={cn(
                    "sp-orb-btn flex items-center whitespace-nowrap rounded-full border font-semibold shadow-lg transition duration-300",
                    active === i
                      ? "scale-110 border-sp-blue-700 bg-sp-blue-700 text-sp-white"
                      : "border-sp-teal-100 bg-sp-white text-sp-blue-900 hover:border-sp-blue-700",
                  )}
                >
                  <span
                    className={cn(
                      "sp-orb-num grid shrink-0 place-items-center rounded-full",
                      active === i
                        ? "bg-sp-white text-sp-blue-700"
                        : "bg-sp-blue-700 text-sp-white",
                    )}
                  >
                    {i + 1}
                    <span className="sr-only"> of {processSteps.length}:</span>
                  </span>
                  {s.title}
                </button>
              </div>
            </li>
          ))}
        </ol>

        {/* The centre of the circle: a hub until a step is chosen, then that step's photo. */}
        <div className="sp-orbit-center" aria-hidden="true">
          <div className="sp-orbit-hub">
            <Route className="size-12" strokeWidth={1.5} />
            <span>Hover a step</span>
          </div>
          {processSteps.map((s, i) => (
            <Image
              key={s.title}
              src={s.photo.src}
              alt=""
              fill
              sizes="(min-width: 768px) 20rem, 50vw"
              loading="lazy"
              data-placeholder="true"
              className={cn("sp-orbit-img", active === i && "is-on")}
            />
          ))}
        </div>
      </div>

      {/* The description card. All five stay in the HTML, hidden until chosen. */}
      <div
        aria-live="polite"
        className="sp-card flex min-h-[21rem] flex-col justify-center shadow-xl md:min-h-[24rem] md:p-8"
      >
        {processSteps.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <section
              key={s.title}
              id={`process-${i}`}
              aria-label={s.title}
              className={cn(active === i ? "sp-step-card block" : "hidden")}
            >
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-sp-blue-700 text-sp-white">
                  <Icon className="size-7" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-medium text-sp-blue-700">
                    Step {i + 1} of {processSteps.length}
                  </p>
                  <h3 className="text-3xl font-semibold text-sp-blue-900">
                    {s.title}
                  </h3>
                </div>
              </div>
              <ul className="mt-6 grid gap-3 text-lg">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-2 shrink-0 rounded-full bg-sp-teal-500"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        {active === null && (
          <div className="text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-sp-teal-100 text-sp-blue-700">
              <Route className="size-8" strokeWidth={1.5} />
            </span>
            <p className="mt-4 text-xl font-semibold text-sp-blue-900">
              Five steps, one plan
            </p>
            <p className="mt-1">Hover or tap a step to see how we do it.</p>
          </div>
        )}
      </div>
    </div>
  );
}
