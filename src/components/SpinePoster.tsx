import type { RegionId } from "@/content/regions";

const REGION_AT = (i: number): RegionId =>
  i < 7 ? "cervical" : i < 19 ? "thoracic" : "lumbar";

// Static stand-in shown before the 3D canvas loads, and on low-end devices.
export function SpinePoster({ selected }: { selected: RegionId | null }) {
  return (
    <svg viewBox="0 0 200 400" className="h-full w-full" aria-hidden="true">
      {Array.from({ length: 24 }, (_, i) => {
        const t = i / 23;
        const y = 20 + t * 290;
        const x = 100 + 14 * Math.sin(2 * Math.PI * (t * 1.1));
        const w = 24 + 22 * t;
        const lit = selected === REGION_AT(i);
        return (
          <rect
            key={i}
            x={x - w / 2}
            y={y}
            width={w}
            height={9}
            rx={4}
            fill={lit ? "#e8735a" : "#efe9df"}
            stroke="#c9c1b3"
          />
        );
      })}
      <path
        d="M100 330 L82 345 L100 372 L118 345 Z"
        fill={selected === "sacral" ? "#e8735a" : "#efe9df"}
        stroke="#c9c1b3"
      />
    </svg>
  );
}
