// Curated patient quotes (promptP2.md section 6). An entry is shown only once `consentRecordedAt` holds the date
// the patient's permission was recorded; without it the entry stays in this file but never reaches a page.
// Quote the patient's own words only. No added diagnoses, outcomes or percentages.
export type Review = {
  firstName: string;
  lastInitial: string;
  concern: "back" | "neck" | "joints" | "balance" | "sports" | "other";
  quote: string;
  date: string;
  source: "google";
  consentRecordedAt?: string;
};

// Copied word for word from the clinic's Google Maps listing (Oct 2026).
// TODO-CONFIRM: patient permission to republish each quote; add consentRecordedAt (YYYY-MM-DD) once recorded (flag: patientStories).
const entries: Review[] = [
  {
    firstName: "Dakshesh",
    lastInitial: "D",
    concern: "other",
    date: "June 2026",
    source: "google",
    quote:
      "Had a really good experience at Smart Physio+ Clinic. I was having pain and after taking physiotherapy sessions here I felt much better. The clinic is clean, well maintained and has good machines as well. Dr. Nileema is very polite and explains everything properly. Really happy with the treatment, definitely recommended.",
  },
  {
    firstName: "ASG",
    lastInitial: "",
    concern: "back",
    date: "June 2026",
    source: "google",
    quote:
      "I had a very positive experience with Dr. Nileema for my disc bulge and sciatica treatment.",
  },
];

export const reviews = entries.filter((r) => r.consentRecordedAt);

export const reviewName = (r: Review) =>
  r.lastInitial ? `${r.firstName} ${r.lastInitial}.` : r.firstName;
