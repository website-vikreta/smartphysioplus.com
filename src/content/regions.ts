// Spine regions for the 3D hero and the accessible chip list. Problems come from promptP0.md section 3.
export type RegionId = "cervical" | "thoracic" | "lumbar" | "sacral" | "joints";

export type Region = {
  id: RegionId;
  name: string;
  short: string;
  /** Anatomy shown in the spine panel. General facts, not clinic claims. */
  levels: string;
  about: string;
  problems: string[];
  help: string;
  /** Old specialty anchors. Resolved to live P1 pages with resolveHref() on the server. */
  treat: { label: string; href: string }[];
};

export const regions: Region[] = [
  {
    id: "cervical",
    levels: "C1 to C7 (7 vertebrae)",
    about:
      "The neck holds up the head and lets it turn and nod. Nerves from here run to the shoulders, arms and hands.",
    name: "Neck",
    short: "Neck",
    problems: ["Neck pain", "Stiff neck", "Posture problems"],
    help: "We assess your neck and posture, then plan manual therapy and exercises.",
    treat: [
      { label: "Neck pain", href: "/orthopedic-physiotherapy/#neck-pain" },
    ],
  },
  {
    id: "thoracic",
    levels: "T1 to T12 (12 vertebrae)",
    about:
      "The upper back joins the ribs and forms the back of the chest, so it moves less than the neck or lower back.",
    name: "Upper back and shoulder blades",
    short: "Upper back",
    problems: [
      "Upper-back pain",
      "Shoulder blade (scapula) pain",
      "Posture problems",
    ],
    help: "We look at how your upper back and shoulders move, then build a plan around it.",
    treat: [
      { label: "Posture problems", href: "/orthopedic-physiotherapy/#posture" },
    ],
  },
  {
    id: "lumbar",
    levels: "L1 to L5 (5 vertebrae)",
    about:
      "The lower back is the largest part of the spine and carries most of your body weight. Nerves from here run to the hips, legs and feet.",
    name: "Lower back",
    short: "Lower back",
    problems: ["Lower back pain", "Lumbar disc bulge", "Sciatica"],
    help: "After an assessment, a plan can include manual therapy, exercise and robotic spine decompression.",
    treat: [
      {
        label: "Lower back pain",
        href: "/orthopedic-physiotherapy/#back-pain",
      },
      { label: "Sciatica", href: "/orthopedic-physiotherapy/#sciatica" },
    ],
  },
  {
    id: "sacral",
    levels: "Sacrum and coccyx",
    about:
      "The sacrum joins the spine to the pelvis. The coccyx (tailbone) sits at its tip and takes some of your weight when you sit.",
    name: "Tailbone",
    short: "Tailbone",
    problems: ["Tailbone pain", "Pain when sitting"],
    help: "We assess the tailbone and surrounding muscles, then explain your options.",
    treat: [
      {
        label: "Tailbone pain",
        href: "/orthopedic-physiotherapy/#tailbone-pain",
      },
    ],
  },
  {
    id: "joints",
    levels: "Outside the spine",
    about:
      "Knees, shoulders and elbows are joints outside the spine. The model shows the spine only.",
    name: "Knee, shoulder and other joints",
    short: "Joints",
    problems: [
      "Knee pain",
      "Shoulder pain",
      "Tennis elbow",
      "Knee-replacement rehab",
    ],
    help: "We assess the joint and plan treatment and rehabilitation exercises.",
    treat: [
      {
        label: "Knee, shoulder and arthritis",
        href: "/orthopedic-physiotherapy/",
      },
    ],
  },
];
