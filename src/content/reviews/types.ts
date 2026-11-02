// Shape shared by the live Google source and the curated file. Nothing here is ever written by us:
// every field comes from Google or from a consented, verbatim curated entry.
export type Concern =
  | "back"
  | "neck"
  | "joints"
  | "balance"
  | "sports"
  | "other";

export type ClinicReview = {
  id: string;
  source: "google";
  authorName: string; // exactly as on Google
  authorPhotoUrl?: string; // only if Google provides it
  authorProfileUrl?: string; // Google profile / review link
  rating: 1 | 2 | 3 | 4 | 5; // the patient's real rating
  text: string; // verbatim
  publishedAt: string; // ISO date
  relativeTime?: string; // e.g. "2 weeks ago" from Google
  subLine?: string; // curated only, patient-approved, never invented
  chip?: string; // curated only; exact substring of text
  highlights?: string[]; // curated only; exact substrings of text, max 3
  concern?: Concern; // curated only, for filters
};

// A curated entry is only shown once the patient's permission is recorded (YYYY-MM-DD).
export type CuratedReview = ClinicReview & { consentRecordedAt?: string };

// Live numbers from the Places API response. Show only when present; never put them in schema.
export type PlaceSummary = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
};
