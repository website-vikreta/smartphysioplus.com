// Fill only with reviews the client has permission to publish. Empty shows the Google reviews button.
// Copied word for word from the clinic's Google Maps listing (Oct 2026), shared by the clinic owner.
// photo: optional path under /images/reviews/, only with the patient's written consent. Without it the card shows initials.
export type Review = {
  author: string;
  text: string;
  date: string;
  photo?: string;
};
export const reviews: Review[] = [
  {
    author: "Dakshesh Deo",
    date: "June 2026",
    text: "Had a really good experience at Smart Physio+ Clinic. I was having pain and after taking physiotherapy sessions here I felt much better. The clinic is clean, well maintained and has good machines as well. Dr. Nileema is very polite and explains everything properly. Really happy with the treatment, definitely recommended.",
  },
  {
    author: "ASG",
    date: "June 2026",
    text: "I had a very positive experience with Dr. Nileema for my disc bulge and sciatica treatment.",
  },
];
