"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { regions, type RegionId } from "@/content/regions";
import { routes } from "@/content/routes";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ButtonLink";
import { SpinePoster } from "./SpinePoster";

// 3D chunk is loaded on idle, only once the hero is visible, and never on low-end devices.
const SpineScene = dynamic(() => import("@/three/SpineScene"), { ssr: false });

const idle = (cb: () => void) =>
  typeof window.requestIdleCallback === "function"
    ? window.requestIdleCallback(cb)
    : setTimeout(cb, 300);

export function SpinePanel() {
  const box = useRef<HTMLDivElement>(null);
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
  };

  const region = regions.find((r) => r.id === selected);

  return (
    <div id="spine-hero">
      <div
        ref={box}
        className="relative h-72 w-full rounded-2xl bg-sp-mist md:h-[28rem]"
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
      <p className="sr-only">
        A 3D model of the human spine, from the neck down to the tailbone. Use
        the buttons below to choose the area that hurts.
      </p>

      <ul
        className="mt-4 flex flex-wrap gap-2"
        aria-label="Where does it hurt?"
      >
        {regions.map((r) => (
          <li key={r.id}>
            <button
              type="button"
              aria-pressed={selected === r.id}
              onClick={() => select(r.id)}
              className={cn(
                "sp-tag min-h-12 px-6 font-medium",
                selected === r.id
                  ? "bg-sp-blue-700 text-sp-white"
                  : "sp-btn-line",
              )}
            >
              {r.short}
            </button>
          </li>
        ))}
      </ul>

      <div
        aria-live="polite"
        className="mt-4 min-h-40 rounded-2xl border border-sp-teal-100 bg-sp-white/80 p-4 backdrop-blur"
      >
        {region ? (
          <>
            <p className="font-semibold text-sp-blue-900">
              {region.name}{" "}
              <span className="sp-tag ml-1 inline-block bg-sp-teal-100 px-2 py-0.5 text-xs font-medium">
                {region.levels}
              </span>
            </p>
            <p className="mt-1 text-sm">{region.about}</p>
            <p className="mt-2 text-sm font-medium text-sp-blue-900">
              Common problems we see
            </p>
            <ul className="mt-1 flex flex-wrap gap-2 text-sm">
              {region.problems.map((p) => (
                <li key={p} className="sp-tag bg-sp-mist px-2 py-0.5">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-1 text-sm">How we usually help: {region.help}</p>
            <p className="mt-2 text-xs">
              General information, not a diagnosis.{" "}
              <Link href={routes.disclaimer.path} className="underline">
                Read the disclaimer
              </Link>
              .
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={region.treatHref}
                className="inline-flex min-h-12 items-center text-sp-blue-700 underline"
              >
                See treatment
              </Link>
              <ButtonLink href={`${routes.book.path}?concern=${region.id}`}>
                Book for this
              </ButtonLink>
            </div>
          </>
        ) : (
          <p>
            Tap where it hurts. We will show common problems and how we usually
            help.
          </p>
        )}
      </div>
    </div>
  );
}
