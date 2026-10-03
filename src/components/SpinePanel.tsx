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
            active={visible}
            autoRotate={!interacted && !reduceMotion}
            onInteract={() => setInteracted(true)}
          />
        ) : (
          <SpinePoster selected={selected} />
        )}
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
                "sp-btn min-h-12 px-6 font-medium",
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
        className="mt-4 min-h-32 rounded-2xl border border-sp-teal-100 bg-sp-white/80 p-4 backdrop-blur"
      >
        {region ? (
          <>
            <p className="font-semibold text-sp-blue-900">{region.name}</p>
            <p className="mt-1 text-sm">
              Common problems: {region.problems.join(", ")}.
            </p>
            <p className="mt-1 text-sm">How we usually help: {region.help}</p>
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
