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
} as const;
