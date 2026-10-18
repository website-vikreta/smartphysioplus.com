import type { RegionId } from "./regions";
import type { Frontmatter } from "./schema";

// Filter chips on /conditions/ (promptP2.md section 3). `joints` is the sum of the three joint areas.
export type BodyArea = NonNullable<Frontmatter["bodyArea"]>;
export type Filter = BodyArea;

export const filters: { id: Filter; label: string; areas: BodyArea[] }[] = [
  {
    id: "neck-upper-back",
    label: "Neck and upper back",
    areas: ["neck-upper-back"],
  },
  {
    id: "lower-back-leg",
    label: "Lower back and leg",
    areas: ["lower-back-leg"],
  },
  { id: "shoulder-arm", label: "Shoulder and arm", areas: ["shoulder-arm"] },
  { id: "knee-hip", label: "Knee and hip", areas: ["knee-hip"] },
  {
    id: "joints",
    label: "Joints overall",
    areas: ["shoulder-arm", "knee-hip", "joints"],
  },
];

/** The spine region lit on the 3D model for each filter. */
export const spineFor: Partial<Record<Filter, RegionId>> = {
  "neck-upper-back": "cervical",
  "lower-back-leg": "lumbar",
};

/** Filter picked by tapping a spine region. */
export const filterForSpine = (r: RegionId): Filter =>
  r === "cervical" || r === "thoracic"
    ? "neck-upper-back"
    : r === "joints"
      ? "joints"
      : "lower-back-leg";
