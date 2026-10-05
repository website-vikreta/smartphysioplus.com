import type { RegionId } from "@/content/regions";

// Shared spine geometry for the 3D scene and the SVG poster. Units are scene units; index 0 is C1, 23 is L5.
export const COUNTS = { cervical: 7, thoracic: 12, lumbar: 5 } as const;
export const TOTAL = 24;
export const STEP = 0.165;
export const TOP = 2.2;

export const regionOf = (i: number): RegionId =>
  i < COUNTS.cervical
    ? "cervical"
    : i < COUNTS.cervical + COUNTS.thoracic
      ? "thoracic"
      : "lumbar";

export const levelLabel = (i: number) =>
  i < COUNTS.cervical
    ? `C${i + 1}`
    : i < COUNTS.cervical + COUNTS.thoracic
      ? `T${i - COUNTS.cervical + 1}`
      : `L${i - COUNTS.cervical - COUNTS.thoracic + 1}`;

const ORD = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
];
const AREA = { cervical: "neck", thoracic: "upper-back", lumbar: "lower-back" };
export const levelName = (i: number) => {
  const n = Number(levelLabel(i).slice(1)) - 1;
  return `${ORD[n]} ${AREA[regionOf(i) as keyof typeof AREA]} vertebra`;
};

type Pts = [number, number][];
// Smooth piecewise interpolation (flat tangent at each control point).
const curve = (pts: Pts, x: number) => {
  if (x <= pts[0][0]) return pts[0][1];
  for (let k = 1; k < pts.length; k++) {
    const [x1, y1] = pts[k];
    if (x <= x1) {
      const [x0, y0] = pts[k - 1];
      const u = (x - x0) / (x1 - x0);
      return y0 + (y1 - y0) * u * u * (3 - 2 * u);
    }
  }
  return pts[pts.length - 1][1];
};

// Side-on shape: neck curves forward (lordosis), upper back backward (kyphosis), lower back forward, sacrum back, tailbone forward.
const Z: Pts = [
  [0, 0.08],
  [3, 0.24],
  [7, 0.04],
  [13, -0.28],
  [18.5, -0.04],
  [21, 0.3],
  [23.5, 0.1],
  [26, -0.3],
  [27.6, -0.14],
];
// Half-width of the vertebral body, and body height, growing from neck to lower back.
const W: Pts = [
  [0, 0.12],
  [6, 0.15],
  [7, 0.15],
  [18, 0.21],
  [19, 0.23],
  [23, 0.27],
];
const H: Pts = [
  [0, 0.095],
  [6, 0.105],
  [7, 0.11],
  [18, 0.125],
  [19, 0.13],
  [23, 0.14],
];

export const yAt = (x: number) => TOP - x * STEP;
export const zAt = (x: number) => curve(Z, x);
export const bodyW = (i: number) => curve(W, i);
export const bodyH = (i: number) => curve(H, i);
export const tiltAt = (x: number) => {
  const e = 0.05;
  return Math.atan2(zAt(x - e) - zAt(x + e), yAt(x - e) - yAt(x + e));
};
