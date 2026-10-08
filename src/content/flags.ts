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
} as const;
