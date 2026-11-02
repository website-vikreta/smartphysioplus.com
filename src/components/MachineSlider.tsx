"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Real clinic photos. Swap `src` for transparent PNGs when they are added to public/images/clinic/.
const slides: {
  src: string;
  alt: string;
  name: string;
  note: string;
  fit: "blend" | "cover";
}[] = [
  {
    src: "/images/clinic/robospine-100.webp",
    alt: "RoboSpine-100 robotic spine decompression table",
    name: "RoboSpine-100",
    note: "Robotic spine decompression",
    fit: "blend",
  },
  {
    src: "/images/clinic/emft_machine.jpg",
    alt: "Medi-EMFT electromagnetic field therapy machine at Smart Physio+",
    name: "Medi-EMFT",
    note: "Electromagnetic field therapy",
    fit: "cover",
  },
];

const INTERVAL_MS = 5000;

export function MachineSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const t = setInterval(
      () => setI((n) => (n + 1) % slides.length),
      INTERVAL_MS,
    );
    return () => clearInterval(t);
  }, [paused]);

  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Machines at the clinic"
      className="relative aspect-[4/3] overflow-hidden rounded-4xl bg-linear-to-br from-sp-teal-100 via-sp-white to-sp-mist shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Soft colour blobs drifting behind the photos. */}
      <div aria-hidden className="absolute inset-0">
        <span className="sp-blob -left-10 -top-10 size-56 bg-[#66ccff]" />
        <span
          className="sp-blob -bottom-12 -right-8 size-64 bg-sp-blue-700/60"
          style={{ animationDelay: "-4s" }}
        />
        <span
          className="sp-blob bottom-10 left-1/3 size-40 bg-sp-teal-500/50"
          style={{ animationDelay: "-8s" }}
        />
      </div>

      {slides.map((s, n) => (
        <figure key={s.src} aria-hidden={n !== i} className="absolute inset-0">
          {/* "blend": white backdrop multiplies away so the machine sits on the colours. "cover": full-bleed photo. */}
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            priority={n === 0}
            className={cn(
              "transition-opacity duration-700",
              s.fit === "blend"
                ? "object-contain mix-blend-multiply"
                : "object-cover",
              n === i ? "opacity-100" : "opacity-0",
            )}
          />
          <figcaption
            className={cn(
              "absolute left-4 top-4 rounded-lg bg-sp-white/85 px-3 py-1 text-sm text-sp-blue-900 transition-opacity duration-700",
              n === i ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="font-semibold">{s.name}</span> · {s.note}
          </figcaption>
        </figure>
      ))}

      <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-sp-white/80 px-1">
        <button
          type="button"
          aria-label="Previous machine"
          onClick={() => go(i - 1)}
          className="inline-flex size-11 items-center justify-center rounded-full text-sp-blue-900 hover:bg-sp-white"
        >
          ‹
        </button>
        {slides.map((s, n) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show ${s.name}`}
            aria-current={n === i}
            onClick={() => go(n)}
            className="inline-flex size-8 items-center justify-center"
          >
            <span
              className={cn(
                "block h-2 rounded-full transition-all",
                n === i ? "w-6 bg-sp-blue-700" : "w-2 bg-sp-blue-700/40",
              )}
            />
          </button>
        ))}
        <button
          type="button"
          aria-label="Next machine"
          onClick={() => go(i + 1)}
          className="inline-flex size-11 items-center justify-center rounded-full text-sp-blue-900 hover:bg-sp-white"
        >
          ›
        </button>
      </div>
    </div>
  );
}
