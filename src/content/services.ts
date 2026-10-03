import { flags } from "./flags";

export type ServiceGroup =
  | "Spine"
  | "Joints"
  | "Neuro & balance"
  | "Rehabilitation"
  | "Special care"
  | "Technology"
  | "Manual therapy";

export type Service = {
  name: string;
  group: ServiceGroup;
  blurb: string;
  href: string;
  enabled: boolean;
};

const ortho = "/orthopedic-physiotherapy/";
const neuro = "/neuro-physiotherapy/";
const physio = "/physiotherapy/";

// Authoritative list: Google Business services (promptP0.md section 3).
// Items behind a flag are hidden until the client confirms them.
const all: Service[] = [
  {
    name: "Back pain",
    group: "Spine",
    blurb: "Assessment and a plan for pain in the lower or upper back.",
    href: `${ortho}#back-pain`,
    enabled: true,
  },
  {
    name: "Robotic spinal decompression",
    group: "Spine",
    blurb:
      "A computer-guided way to gently stretch the spine, used after assessment.",
    href: `${ortho}#robotic-decompression`,
    enabled: true,
  },
  {
    name: "Spinal injuries",
    group: "Spine",
    blurb: "Assessment and rehabilitation after an injury to the spine.",
    href: `${ortho}#back-pain`,
    enabled: true,
  },
  {
    name: "Chiropractic care",
    group: "Spine",
    blurb:
      "Hands-on spinal techniques, used when your assessment supports them.",
    href: `${physio}#approaches`,
    enabled: true,
  },
  {
    name: "Osteopathy",
    group: "Spine",
    blurb: "Gentle hands-on techniques for joints, muscles and movement.",
    href: `${physio}#approaches`,
    enabled: true,
  },

  {
    name: "Orthopedic physiotherapy",
    group: "Joints",
    blurb: "Care for bones, joints, muscles and ligaments.",
    href: ortho,
    enabled: true,
  },
  {
    name: "Knee pain",
    group: "Joints",
    blurb: "Assessment of the cause and a plan to restore movement.",
    href: `${ortho}#knee-pain`,
    enabled: true,
  },
  {
    name: "Shoulder pain",
    group: "Joints",
    blurb: "Assessment and exercises for pain and stiffness in the shoulder.",
    href: `${ortho}#shoulder-pain`,
    enabled: true,
  },
  {
    name: "Hip pain",
    group: "Joints",
    blurb: "Assessment and a plan for hip pain and stiffness.",
    href: `${ortho}#hip-pain`,
    enabled: true,
  },
  {
    name: "Foot and ankle pain",
    group: "Joints",
    blurb: "Assessment and treatment for foot and ankle problems.",
    href: `${ortho}#foot-ankle-pain`,
    enabled: true,
  },
  {
    name: "Arthritis treatment",
    group: "Joints",
    blurb: "Treatment to help you manage joint pain and keep moving.",
    href: `${ortho}#arthritis`,
    enabled: true,
  },
  {
    name: "Massage",
    group: "Joints",
    blurb: "Hands-on soft-tissue work, including sports massage.",
    href: `${physio}#approaches`,
    enabled: true,
  },

  {
    name: "Neurological physiotherapy",
    group: "Neuro & balance",
    blurb: "Rehabilitation for balance, movement and nerve-related problems.",
    href: neuro,
    enabled: true,
  },
  {
    name: "Balance exercise therapy (vertigo)",
    group: "Neuro & balance",
    blurb: "Exercises to help with dizziness and balance, after assessment.",
    href: `${neuro}#vertigo-balance`,
    enabled: true,
  },

  {
    name: "Post-surgery rehabilitation",
    group: "Rehabilitation",
    blurb: "A step-by-step plan to regain movement and strength after surgery.",
    href: `${ortho}#post-surgery-rehab`,
    enabled: true,
  },
  {
    name: "Therapeutic exercise",
    group: "Rehabilitation",
    blurb: "Exercises chosen for your problem and your goals.",
    href: `${physio}#journey`,
    enabled: true,
  },
  {
    name: "Personalised exercise plan",
    group: "Rehabilitation",
    blurb: "A plan made for you, with home exercises you can follow.",
    href: `${physio}#journey`,
    enabled: true,
  },
  // TODO-CONFIRM: "Inpatient" appears on Google; confirm what it means before showing (flag: inpatient).
  {
    name: "Inpatient care",
    group: "Rehabilitation",
    blurb: "Care while staying at the clinic.",
    href: "/contact/",
    enabled: flags.inpatient,
  },

  {
    name: "Geriatric physiotherapy",
    group: "Special care",
    blurb: "Care for older adults, aimed at safe movement and balance.",
    href: `${physio}#who-we-see`,
    enabled: true,
  },
  {
    name: "Pediatric physiotherapy",
    group: "Special care",
    blurb: "Physiotherapy for children, planned around their needs.",
    href: `${physio}#who-we-see`,
    enabled: true,
  },
  {
    name: "Women's health physiotherapy",
    group: "Special care",
    blurb: "Physiotherapy for health concerns that affect women.",
    href: `${physio}#who-we-see`,
    enabled: true,
  },

  {
    name: "Robotic spine decompression",
    group: "Technology",
    blurb: "Computer-guided spinal traction used after assessment.",
    href: `${ortho}#robotic-decompression`,
    enabled: true,
  },
  {
    name: "High-intensity electromagnetic therapy",
    group: "Technology",
    blurb: "A magnetic-field machine used for muscle and pain problems.",
    href: "/#technology",
    enabled: true,
  },
  {
    name: "TECAR",
    group: "Technology",
    blurb: "Radio-frequency energy that warms deeper tissue.",
    href: "/#technology",
    enabled: true,
  },
  {
    name: "Shockwave therapy",
    group: "Technology",
    blurb: "Pressure waves applied to a sore area, for example tendon pain.",
    href: "/#technology",
    enabled: true,
  },
  {
    name: "Laser treatment",
    group: "Technology",
    blurb: "Light-based therapy applied to the skin.",
    href: "/#technology",
    enabled: true,
  },
  {
    name: "Matrix Rhythm Therapy",
    group: "Technology",
    blurb: "Gentle rhythmic stimulation for tight muscles and tissue.",
    href: "/#technology",
    enabled: true,
  },
  // TODO-CONFIRM: hydrotherapy is not confirmed (flag: hydro).
  {
    name: "Hydrotherapy",
    group: "Technology",
    blurb: "Exercise and treatment in water.",
    href: "/contact/",
    enabled: flags.hydro,
  },

  {
    name: "Manual therapy",
    group: "Manual therapy",
    blurb: "Skilled hands-on treatment for joints and muscles.",
    href: `${physio}#approaches`,
    enabled: true,
  },
  {
    name: "Myofascial release",
    group: "Manual therapy",
    blurb: "Slow, sustained pressure to ease tight connective tissue.",
    href: `${physio}#approaches`,
    enabled: true,
  },
  {
    name: "Kinesio taping",
    group: "Manual therapy",
    blurb: "Elastic tape applied to support muscles and joints.",
    href: `${physio}#approaches`,
    enabled: true,
  },
];

export const services = all.filter((s) => s.enabled);

export const serviceGroups: ServiceGroup[] = [
  "Spine",
  "Joints",
  "Neuro & balance",
  "Rehabilitation",
  "Special care",
  "Technology",
  "Manual therapy",
];
