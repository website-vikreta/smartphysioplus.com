import { flags } from "./flags";

export type Faq = { q: string; a: string };

export const physioFaq: Faq[] = [
  {
    q: "What exactly does a physiotherapist do?",
    a: "A physiotherapist assesses how your body moves, finds likely causes of pain or limited movement, and plans treatment. This can include hands-on therapy, exercises, advice and machines.",
  },
  {
    q: "How long is a physiotherapy session?",
    a: "Session length depends on your plan. We confirm timing with you when we confirm your appointment.",
  },
  {
    q: "Is physiotherapy difficult or painful?",
    a: "Some exercises or hands-on techniques can feel uncomfortable, but treatment should not cause sharp pain. Tell your physiotherapist if something hurts and the plan can be adjusted.",
  },
  {
    q: "Is a physiotherapist a doctor?",
    a: 'Physiotherapists are qualified healthcare professionals with a physiotherapy degree. In India they commonly use the title "Dr.", but they are not medical doctors (MBBS). Physiotherapists work alongside doctors.',
  },
];

export const neuroFaq: Faq[] = [
  {
    q: "What is a neuro physiotherapist?",
    a: "A neuro physiotherapist is a physiotherapist who works with problems of balance, movement and coordination that come from the nervous system.",
  },
  {
    q: "Is a neuro physiotherapist a doctor?",
    a: "No. A neuro physiotherapist is a qualified healthcare professional with a physiotherapy degree, not a medical doctor. They work alongside your doctor.",
  },
  {
    q: "What is the difference between physiotherapy and neuro physiotherapy?",
    a: "General physiotherapy often focuses on muscles, joints and the spine. Neuro physiotherapy focuses on how the brain and nerves control movement and balance.",
  },
];

// Answers that depend on unconfirmed facts stay hidden until the flag is on.
export function localFaq(): Faq[] {
  return [
    // TODO-CONFIRM: referral policy (flag: referral).
    ...(flags.referral
      ? [
          {
            q: "Do I need a doctor's referral?",
            a: "A referral is not required.",
          },
        ]
      : []),
    {
      q: "What should I bring to my first visit?",
      a: "Bring any scans, reports or prescriptions you have. Dr. Nileema reviews your reports before planning treatment.",
    },
    // TODO-CONFIRM: parking details (flag: parking).
    ...(flags.parking
      ? [{ q: "Is there parking?", a: "Parking is available near the clinic." }]
      : []),
    // TODO-CONFIRM: Sunday hours (flag: sunday).
    ...(flags.sunday
      ? [{ q: "Are you open on Sunday?", a: "We are closed on Sundays." }]
      : []),
    {
      q: "How do I book?",
      a: "Use the online request form, call us or message us on WhatsApp. We confirm the exact time with you. No account is needed.",
    },
  ];
}
