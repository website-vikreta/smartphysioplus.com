"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { clinic } from "@/content/clinic";
import { regions, type RegionId } from "@/content/regions";
import { routes } from "@/content/routes";
import { track } from "@/lib/analytics";
import { formatHours } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";
import { SpinePoster } from "./SpinePoster";

// 3D chunk is loaded on idle, only once the hero is visible, and never on low-end devices.
const SpineScene = dynamic(() => import("@/three/SpineScene"), { ssr: false });

const idle = (cb: () => void) =>
  typeof window.requestIdleCallback === "function"
    ? window.requestIdleCallback(cb)
    : setTimeout(cb, 300);

// Right-hand labels. `top` is the region's centre as a % of the canvas height (camera z 7.2, fov 35, model y-offset -0.1).
const LABELS: { id: RegionId; levels: string; top: number }[] = [
  { id: "cervical", levels: "C1–C7", top: 15 },
  { id: "thoracic", levels: "T1–T12", top: 51 },
  { id: "lumbar", levels: "L1–L5", top: 78 },
  { id: "sacral", levels: "Sacrum, coccyx", top: 92 },
];

// `treat` comes from the server so links resolve to live P1 pages (futureRoutes).
export function SpinePanel({
  treat,
}: {
  treat: Record<RegionId, { label: string; href: string }[]>;
}) {
  const box = useRef<HTMLDivElement>(null);
  const details = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<RegionId | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [load3d, setLoad3d] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    const lowEnd =
      nav.hardwareConcurrency <= 4 || nav.connection?.saveData === true;
    const el = box.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting && !started && !lowEnd) {
        started = true;
        idle(() => {
          setReduceMotion(
            window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          );
          setLoad3d(true);
        });
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = (id: RegionId) => {
    setSelected((cur) => {
      if (cur !== id) track("spine_region_select", { region: id });
      return id;
    });
    // Stacked layout (phones): bring the details into view.
    if (window.matchMedia("(max-width: 767px)").matches)
      details.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
      });
  };

  const region = regions.find((r) => r.id === selected);

  return (
    <div id="spine-hero" className="grid gap-4 md:grid-cols-2 md:items-stretch">
      <div className="relative">
        <div
          ref={box}
          className="relative h-80 w-full rounded-2xl bg-sp-mist md:h-full md:min-h-[30rem]"
          aria-hidden="true"
        >
          {load3d ? (
            <SpineScene
              selected={selected}
              onSelect={select}
              onHover={setHover}
              active={visible}
              autoRotate={!interacted && !reduceMotion}
              onInteract={() => setInteracted(true)}
            />
          ) : (
            <SpinePoster selected={selected} />
          )}
          <p className="pointer-events-none absolute left-3 top-3 rounded-lg bg-sp-white/90 px-3 py-1 text-sm text-sp-blue-900">
            {hover ?? "Drag to turn · tap a region"}
          </p>
          <p className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-sp-white/90 px-3 py-1 text-xs text-sp-blue-900">
            <span className="mr-1 inline-block size-2 rounded-full bg-sp-teal-500" />
            Spinal cord and nerves
          </p>
        </div>
        <ul
          aria-label="Where does it hurt?"
          className="pointer-events-none absolute inset-y-0 right-0 w-40 md:w-44"
        >
          {LABELS.map((l) => {
            const r = regions.find((x) => x.id === l.id)!;
            const on = selected === l.id;
            return (
              <li
                key={l.id}
                className="absolute right-2 flex -translate-y-1/2 items-center"
                style={{ top: `${l.top}%` }}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-2 rounded-full",
                    on ? "bg-sp-signal" : "bg-sp-blue-700",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px w-5",
                    on ? "bg-sp-signal" : "bg-sp-blue-700/50",
                  )}
                />
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => select(l.id)}
                  className={cn(
                    "pointer-events-auto flex min-h-11 items-center gap-2 rounded-xl border px-3 py-1.5 text-left leading-tight shadow-md transition hover:-translate-x-0.5 hover:shadow-lg",
                    on
                      ? "border-sp-blue-700 bg-sp-blue-700 text-sp-white ring-2 ring-sp-signal/60"
                      : "border-sp-blue-700/20 bg-sp-white text-sp-blue-900 hover:border-sp-blue-700",
                  )}
                >
                  <span>
                    <span className="block whitespace-nowrap text-sm font-semibold">
                      {r.short}
                    </span>
                    <span className="block whitespace-nowrap text-xs opacity-75">
                      {l.levels}
                    </span>
                  </span>
                  <Icon
                    name="arrow"
                    className="ml-auto size-4 shrink-0 opacity-60"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="sr-only">
        A 3D model of the human spine, from the neck down to the tailbone. Use
        the labelled buttons beside it to choose the area that hurts.
      </p>

      <div
        ref={details}
        aria-live="polite"
        className="rounded-2xl border border-sp-teal-100 bg-sp-white/80 p-4 backdrop-blur md:p-5"
      >
        {region ? (
          <>
            <p className="text-lg font-semibold text-sp-blue-900">
              {region.name}{" "}
              <span className="sp-tag ml-1 inline-block bg-sp-teal-100 px-2 py-0.5 text-xs font-medium">
                {region.levels}
              </span>
            </p>
            <p className="mt-1 text-sm">{region.about}</p>
            <p className="mt-3 text-sm font-medium text-sp-blue-900">
              Common problems we see
            </p>
            <ul className="mt-1 flex flex-wrap gap-2 text-sm">
              {region.problems.map((p) => (
                <li key={p} className="sp-tag bg-sp-mist px-2 py-0.5">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm">How we usually help: {region.help}</p>
            <div className="mt-2 flex flex-wrap gap-x-4">
              {treat[region.id].map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="inline-flex min-h-11 items-center text-sm text-sp-blue-700 underline"
                >
                  {t.label}: see treatment
                </Link>
              ))}
            </div>
            <p className="text-xs">
              General information, not a diagnosis.{" "}
              <Link href={routes.disclaimer.path} className="underline">
                Read the disclaimer
              </Link>
              .
            </p>

            <div className="mt-4 rounded-xl bg-sp-mist p-4">
              <p className="font-semibold text-sp-blue-900">
                Book an assessment
              </p>
              <ul className="mt-2 grid gap-1 text-sm">
                <li className="flex items-center gap-2">
                  <Icon name="clock" className="size-4 text-sp-blue-700" />
                  {formatHours()}
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="pin" className="size-4 text-sp-blue-700" />
                  {clinic.address.locality}, {clinic.address.city}
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="phone" className="size-4 text-sp-blue-700" />
                  <a href={clinic.phone.tel} className="underline">
                    {clinic.phone.display}
                  </a>
                </li>
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <ButtonLink
                  href={`${routes.book.path}?concern=${region.id}`}
                  icon="calendar"
                >
                  Book for this
                </ButtonLink>
                <ButtonLink
                  href={clinic.phone.tel}
                  variant="secondary"
                  icon="phone"
                >
                  Call now
                </ButtonLink>
              </div>
            </div>
          </>
        ) : (
          <div className="grid h-full place-content-center gap-2 py-10 text-center">
            <p className="text-lg font-semibold text-sp-blue-900">
              Where does it hurt?
            </p>
            <p>
              Tap a label beside the spine, or a part of the spine itself. We
              will show common problems, how we usually help and how to book.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
