import { flags } from "./flags.ts";

// The /faqs/ page content (promptP2.md section 7). One canonical home per question:
// `home` is "faqs" (answered here) or the slug of the page that owns the answer; /faqs/ then links to `href`.
// `pnpm content:check-faqs` fails on a repeated id, near-duplicate questions or an unconfirmed answer shown live.
// Answers may use {hours} and {address}, filled from clinic.ts when rendered.
export const faqGroups = [
  "Booking and your first visit",
  "About physiotherapy",
  "Location and timings",
  "Payments and paperwork",
] as const;

export type FaqEntry = {
  id: string;
  question: string;
  /** Required when home is "faqs". */
  answer?: string;
  group: (typeof faqGroups)[number];
  home: string;
  /** Link to the page that owns the answer, when home is not "faqs". */
  href?: string;
  /** Hidden until this flag is on. */
  flag?: keyof typeof flags;
};

export const faqs: FaqEntry[] = [
  {
    id: "how-do-i-book",
    question: "How do I book? Do I need an account?",
    answer:
      "Send a request through the online form, call us or message us on WhatsApp. You do not need an account. We confirm the exact time with you by call or WhatsApp.",
    group: "Booking and your first visit",
    home: "faqs",
  },
  {
    id: "what-to-bring",
    question: "What should I bring to my first visit?",
    answer:
      "Bring any scans, reports or prescriptions you have. Dr. Nileema reviews your reports before planning treatment.",
    group: "Booking and your first visit",
    home: "faqs",
  },
  // TODO-CONFIRM: referral policy (flag: referral).
  {
    id: "do-i-need-a-referral",
    question: "Do I need a doctor's referral?",
    answer: "A referral is not required.",
    group: "Booking and your first visit",
    home: "faqs",
    flag: "referral",
  },
  {
    id: "how-long-is-a-session",
    question: "How long is a session?",
    answer:
      "Session length depends on your plan. We confirm timing with you when we confirm your appointment.",
    group: "Booking and your first visit",
    home: "faqs",
  },
  {
    id: "what-happens-at-the-first-assessment",
    question: "What happens at the first assessment?",
    answer:
      "We talk about your pain, history and goals, review any scans or reports you bring, and examine how you move. Then we explain the plan in plain words and answer your questions.",
    group: "Booking and your first visit",
    home: "faqs",
  },
  // TODO-CONFIRM: reschedule and cancellation policy (flag: reschedulePolicy).
  {
    id: "can-i-reschedule-or-cancel",
    question: "Can I reschedule or cancel?",
    answer: "TODO-CONFIRM: the clinic's reschedule and cancellation policy.",
    group: "Booking and your first visit",
    home: "faqs",
    flag: "reschedulePolicy",
  },
  {
    id: "is-physiotherapy-painful",
    question: "Is physiotherapy painful?",
    answer:
      "Some exercises or hands-on techniques can feel uncomfortable, but treatment should not cause sharp pain. Tell your physiotherapist if something hurts and the plan can be adjusted.",
    group: "About physiotherapy",
    home: "faqs",
  },
  {
    id: "is-a-physiotherapist-a-doctor",
    question: "Is a physiotherapist a doctor?",
    answer:
      'Physiotherapists are qualified healthcare professionals with a physiotherapy degree. In India they commonly use the title "Dr.", but they are not medical doctors (MBBS). Physiotherapists work alongside doctors.',
    group: "About physiotherapy",
    home: "faqs",
  },
  {
    id: "physiotherapy-vs-neuro-physiotherapy",
    question:
      "What is the difference between physiotherapy and neuro physiotherapy?",
    group: "About physiotherapy",
    home: "neuro-physiotherapy",
    href: "/neuro-physiotherapy/#faq",
  },
  {
    id: "what-are-your-hours",
    question: "What are your hours?",
    answer: "We are open {hours}.",
    group: "Location and timings",
    home: "faqs",
  },
  // TODO-CONFIRM: Sunday hours (flag: sunday).
  {
    id: "are-you-open-on-sunday",
    question: "Are you open on Sunday?",
    answer: "We are closed on Sundays.",
    group: "Location and timings",
    home: "faqs",
    flag: "sunday",
  },
  {
    id: "where-is-the-clinic",
    question: "Where is the clinic?",
    answer: "We are at {address}. The contact page has directions and a map.",
    group: "Location and timings",
    home: "faqs",
  },
  // TODO-CONFIRM: parking details (flag: parking).
  {
    id: "is-there-parking",
    question: "Is there parking?",
    answer: "Parking is available near the clinic.",
    group: "Location and timings",
    home: "faqs",
    flag: "parking",
  },
  // TODO-CONFIRM: home visits and what they cover (flag: homeVisits).
  {
    id: "do-you-do-home-visits",
    question: "Do you do home visits?",
    group: "Location and timings",
    home: "physiotherapy-at-home",
    href: "/physiotherapy-at-home/",
    flag: "homeVisits",
  },
  // TODO-CONFIRM: payment methods accepted (flag: paymentMethods).
  {
    id: "which-payment-methods-do-you-accept",
    question: "Which payment methods do you accept?",
    answer: "TODO-CONFIRM: the payment methods the clinic accepts.",
    group: "Payments and paperwork",
    home: "faqs",
    flag: "paymentMethods",
  },
];

export const liveFaqs = faqs.filter((f) => !f.flag || flags[f.flag]);
