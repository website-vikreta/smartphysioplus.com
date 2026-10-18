// Unconfirmed facts (promptP0.md section 4). Default OFF until the client confirms.
// Every use must sit next to a `// TODO-CONFIRM:` comment.
export const flags = {
  credBPTh: false,
  credDOMP: false,
  exp10y: false,
  womenOwned: false,
  emftRarity: false,
  emftSame: false,
  fewerSessions: false,
  neuroStroke: false,
  neuroCP: false,
  hydro: false,
  inpatient: false,
  homeVisits: false,
  sunday: false,
  parking: false,
  landmarks: false,
  legalIds: false,
  referral: false,
  // P1 (promptP1.md section 2).
  // TODO-CONFIRM: fracture rehab is not on the Google services list (flag: fractureRehab).
  fractureRehab: false,
  // TODO-CONFIRM: frozen-shoulder section on the shoulder page (flag: frozenShoulder).
  frozenShoulder: false,
  // TODO-CONFIRM: local orthopedic page for Baner and Balewadi, only if genuinely offered (flag: orthoLocalPage).
  orthoLocalPage: false,
  // TODO-CONFIRM: which machines are named on which condition page; see each page's `technology` frontmatter (flag: technologyByCondition).
  technologyByCondition: false,
  // P2 (promptP2.md ground rule 6). Facts not on the clinic's Google listing stay off until confirmed.
  // TODO-CONFIRM: payment methods accepted, for the FAQs page (flag: paymentMethods).
  paymentMethods: false,
  // TODO-CONFIRM: "bring these to your first visit" list on the rehabilitation hub (flag: firstVisitChecklist).
  firstVisitChecklist: false,
  // TODO-CONFIRM: reschedule and cancellation policy for the FAQs page (flag: reschedulePolicy).
  reschedulePolicy: false,
  // TODO-CONFIRM: long-form patient stories, only with signed consent recorded offline (flag: patientStories).
  patientStories: false,
} as const;
