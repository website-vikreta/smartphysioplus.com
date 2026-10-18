// /physiotherapy-at-home/ (promptP2.md section 9). Built only when the `homeVisits` flag is on.
// Live (indexed, in the sitemap, linked) only once Dr. Nileema reviews it: set clinicallyReviewed and reviewedAt.
export const homeVisit = {
  metaTitle: "Physiotherapy at Home in Baner and Balewadi | Smart Physio+",
  metaDescription:
    "Request physiotherapy at home from Smart Physio+ in Balewadi, Pune. See who it suits, what can be done at home and how to request a visit.",
  clinicallyReviewed: false,
  reviewedAt: null as string | null,
  updatedAt: "2026-10-18",
  // TODO-CONFIRM: the clinic must confirm every answer before the flag is switched on (flag: homeVisits).
  faqs: [
    {
      q: "How do I request a home visit?",
      a: "Choose physiotherapy at home on the booking form and enter the address for the visit. We confirm the day and time with you by call or WhatsApp.",
    },
    {
      q: "Can every treatment be done at home?",
      a: "No. Robotic spine decompression, shockwave, TECAR, laser and EMFT are used at the clinic only. We explain at booking what can be done at home for your problem.",
    },
    {
      q: "What should I keep ready for the visit?",
      a: "Your reports, scans or discharge summary, a list of your medicines, and a clear space to move.",
    },
  ],
};
