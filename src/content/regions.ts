// Spine regions for the 3D hero and the accessible chip list. Problems come from promptP0.md section 3.
export type RegionId = "cervical" | "thoracic" | "lumbar" | "sacral" | "joints";

export type Region = {
  id: RegionId;
  name: string;
  short: string;
  problems: string[];
  help: string;
  treatHref: string;
};

export const regions: Region[] = [
  {
    id: "cervical",
    name: "Neck",
    short: "Neck",
    problems: ["Neck pain", "Stiff neck", "Posture problems"],
    help: "We assess your neck and posture, then plan manual therapy and exercises.",
    treatHref: "/orthopedic-physiotherapy/#neck-pain",
  },
  {
    id: "thoracic",
    name: "Upper back and shoulder blades",
    short: "Upper back",
    problems: [
      "Upper-back pain",
      "Shoulder blade (scapula) pain",
      "Posture problems",
    ],
    help: "We look at how your upper back and shoulders move, then build a plan around it.",
    treatHref: "/orthopedic-physiotherapy/#posture",
  },
  {
    id: "lumbar",
    name: "Lower back",
    short: "Lower back",
    problems: ["Lower back pain", "Lumbar disc bulge", "Sciatica"],
    help: "After an assessment, a plan can include manual therapy, exercise and robotic spine decompression.",
    treatHref: "/orthopedic-physiotherapy/#back-pain",
  },
  {
    id: "sacral",
    name: "Tailbone",
    short: "Tailbone",
    problems: ["Tailbone pain", "Pain when sitting"],
    help: "We assess the tailbone and surrounding muscles, then explain your options.",
    treatHref: "/orthopedic-physiotherapy/#tailbone-pain",
  },
  {
    id: "joints",
    name: "Knee, shoulder and other joints",
    short: "Joints",
    problems: [
      "Knee pain",
      "Shoulder pain",
      "Tennis elbow",
      "Knee-replacement rehab",
    ],
    help: "We assess the joint and plan treatment and rehabilitation exercises.",
    treatHref: "/orthopedic-physiotherapy/#knee-pain",
  },
];
