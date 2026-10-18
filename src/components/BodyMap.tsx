"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { type Filter, filterForSpine, spineFor } from "@/content/bodyAreas";
import { SpinePoster } from "./SpinePoster";

const SpineScene = dynamic(() => import("@/three/SpineScene"), { ssr: false });

// Decorative twin of the filter chips on /conditions/. Loaded after the list so the list stays the LCP.
// The chips are the accessible control; this map only mirrors and sets the same filter.
export function BodyMap({
  selected,
  onSelect,
}: {
  selected: Filter | null;
  onSelect: (f: Filter) => void;
}) {
  const [load3d, setLoad3d] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (nav.hardwareConcurrency <= 4 || nav.connection?.saveData) return;
    const t = setTimeout(() => setLoad3d(true), 300);
    return () => clearTimeout(t);
  }, []);

  const region = selected ? (spineFor[selected] ?? null) : null;
  const joint = (f: Filter) =>
    selected === f || selected === "joints" ? "#e8735a" : "#efe9df";

  return (
    <div
      aria-hidden="true"
      className="sp-card grid items-center gap-4 bg-sp-mist sm:grid-cols-2"
    >
      <div className="h-72">
        {load3d ? (
          <SpineScene
            selected={region}
            onSelect={(r) => onSelect(filterForSpine(r))}
            onHover={() => {}}
            active
            autoRotate={false}
            onInteract={() => {}}
          />
        ) : (
          <SpinePoster selected={region} />
        )}
      </div>
      <svg viewBox="0 0 160 300" className="mx-auto h-72 w-auto">
        <circle cx="80" cy="24" r="18" fill="#efe9df" stroke="#c9c1b3" />
        <path
          d="M48 56h64l10 90h-14l-6 140h-20l-6-100-6 100H50l-6-140H30z"
          fill="#efe9df"
          stroke="#c9c1b3"
        />
        <g onClick={() => onSelect("shoulder-arm")} className="cursor-pointer">
          <circle cx="46" cy="66" r="13" fill={joint("shoulder-arm")} />
          <circle cx="114" cy="66" r="13" fill={joint("shoulder-arm")} />
        </g>
        <g onClick={() => onSelect("knee-hip")} className="cursor-pointer">
          <circle cx="62" cy="150" r="13" fill={joint("knee-hip")} />
          <circle cx="98" cy="150" r="13" fill={joint("knee-hip")} />
          <circle cx="66" cy="222" r="12" fill={joint("knee-hip")} />
          <circle cx="94" cy="222" r="12" fill={joint("knee-hip")} />
        </g>
      </svg>
    </div>
  );
}
