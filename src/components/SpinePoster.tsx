import type { RegionId } from "@/content/regions";
import { TOTAL, bodyH, bodyW, regionOf, yAt, zAt } from "@/lib/spine";

const S = 62; // scene units to svg px
const X0 = 100;
const Y0 = 200;
const sx = (z: number) => X0 + z * S;
const sy = (y: number) => Y0 - y * S;

// Static side view shown before the 3D canvas loads, and on low-end devices. Uses the same curve as the 3D model.
export function SpinePoster({ selected }: { selected: RegionId | null }) {
  const fill = (lit: boolean) => (lit ? "#e8735a" : "#efe9df");
  return (
    <svg viewBox="0 0 200 400" className="h-full w-full" aria-hidden="true">
      <path
        d={Array.from({ length: 20 }, (_, i) => {
          const z = zAt(i) - bodyW(i) * 1.3;
          return `${i ? "L" : "M"}${sx(z)} ${sy(yAt(i))}`;
        }).join(" ")}
        fill="none"
        stroke="#1cabb0"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {Array.from({ length: TOTAL }, (_, i) => {
        const w = bodyW(i) * S * 0.8;
        const h = bodyH(i) * S;
        const x = sx(zAt(i));
        const y = sy(yAt(i));
        const lit = selected === regionOf(i);
        return (
          <g key={i}>
            <rect
              x={x - w}
              y={y + h / 2}
              width={w * 2}
              height={3}
              rx={1.5}
              fill="#8fc4cb"
            />
            <rect
              x={x - w}
              y={y - h / 2}
              width={w * 2}
              height={h}
              rx={4}
              fill={fill(lit)}
              stroke="#c9c1b3"
            />
            <rect
              x={x - w - 20 + (regionOf(i) === "cervical" ? 8 : 0)}
              y={y - 2}
              width={14}
              height={4}
              rx={2}
              fill={fill(lit)}
              stroke="#c9c1b3"
            />
          </g>
        );
      })}
      <path
        d={`M${sx(zAt(24.2)) - 18} ${sy(yAt(24.2)) - 14} L${sx(zAt(24.2)) + 16} ${sy(yAt(24.2)) - 14} L${sx(zAt(26.6))} ${sy(yAt(26.6))} L${sx(zAt(27.4))} ${sy(yAt(27.4)) + 4} L${sx(zAt(25.6)) - 12} ${sy(yAt(25.6))} Z`}
        fill={fill(selected === "sacral")}
        stroke="#c9c1b3"
      />
    </svg>
  );
}
