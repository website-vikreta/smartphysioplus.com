// The patient journey: assess, plan, treat, progress, checkup. One source for Home, /physiotherapy/ and /rehabilitation/.
// Copy rules: points are 10 words or fewer, active voice, no session counts, timelines or outcome claims.
// Name machines only in the general way; specific machines belong on the condition and technology pages.
export const processHeading = "Your recovery, step by step";
export const processIntro =
  "Every plan at Smart Physio+ starts with an assessment and moves at your pace.";

export type ProcessIcon =
  "ClipboardList" | "Route" | "Activity" | "TrendingUp" | "CalendarCheck";

export type ProcessStep = {
  title: string;
  icon: ProcessIcon;
  /** Placeholder photo (3:4 portrait, cropped from the Unsplash placeholders). Swap for real clinic photos with patient consent. */
  photo: { src: string; alt: string };
  points: [string, string, string];
};

export const processSteps: ProcessStep[] = [
  {
    title: "Assess",
    icon: "ClipboardList",
    photo: {
      src: "/images/placeholder/process/step-1.jpg",
      alt: "Physiotherapist checking a patient's shoulder movement",
    },
    points: [
      "We listen to your history and check your reports",
      "We test posture, movement and strength",
      "We look for the root cause, not just pain",
    ],
  },
  {
    title: "Plan",
    icon: "Route",
    photo: {
      src: "/images/placeholder/process/step-2.jpg",
      alt: "Smiling physiotherapist guiding a patient's arm on a treatment bed",
    },
    points: [
      "We explain what we found in simple words",
      "You get a personal plan with clear goals",
      "We tell you what to expect before we start",
    ],
  },
  {
    title: "Treat",
    icon: "Activity",
    photo: {
      src: "/images/placeholder/process/step-3.jpg",
      alt: "Physiotherapist giving hands-on therapy to a patient's knee",
    },
    points: [
      "Hands-on therapy and guided exercises",
      "Advanced machines when your assessment shows they suit you",
      "Every session follows your plan",
    ],
  },
  {
    title: "Progress",
    icon: "TrendingUp",
    photo: {
      src: "/images/placeholder/process/step-4.jpg",
      alt: "Physiotherapist guiding a patient through a weighted arm exercise",
    },
    points: [
      "We check pain, movement and strength as you go",
      "We adjust the plan when your body responds",
      "You learn exercises to do at home",
    ],
  },
  {
    title: "Checkup",
    icon: "CalendarCheck",
    photo: {
      src: "/images/placeholder/process/step-5.jpg",
      alt: "Patient stretching on a mat while a physiotherapist guides the movement",
    },
    points: [
      "A review once your goals are met",
      "A home programme to keep you moving",
      "Tips to help stop the problem coming back",
    ],
  },
];
