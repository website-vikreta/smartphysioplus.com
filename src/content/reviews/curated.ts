// Curated Google reviews: copied in VERBATIM from the clinic's Google Maps listing (copied 2 Nov 2026).
// - Never edit, fix or translate the text. A typo fix counts as editing ("theropy", "Neelima" stay as written).
// - `chip` and every `highlights[]` string must be an exact substring of `text` (pnpm content:check-reviews).
// - No percentages in chip/highlights, even if the patient wrote one.
// - An entry is shown only once `consentRecordedAt` (YYYY-MM-DD) is set.
// TODO-CONFIRM: patient permission to republish each quote (flag: patientStories). `consentRecordedAt` below was set
// on the clinic owner's instruction on 2026-11-02; the clinic must hold the actual permission for each patient.
// publishedAt is the first of the month, worked out from Maps' "N months ago" (Maps shows no exact date).
import type { CuratedReview } from "./types.ts";

const consentRecordedAt = "2026-11-02";
const base = { source: "google", rating: 5, consentRecordedAt } as const;

export const curatedEntries: CuratedReview[] = [
  {
    ...base,
    id: "g-asg",
    authorName: "ASG",
    publishedAt: "2026-06-01",
    concern: "back",
    text: "I had a very positive experience with Dr. Nileema for my disc bulge and sciatica treatment. Initially, I had been advised to undergo surgery, but before suggesting any treatment, she carefully went through all my reports and patiently listened to everything I was trying to explain.\n\nShe recommended a Robotic Decompression treatment approach that was very logical, practical and reassuring. The sessions included a combination of robospine decompression physiotherapy, chiropractic techniques, and guided exercises, which worked extremely well for me. I started feeling significant improvement within just 4-5 sessions.\n\nOverall, my experience was excellent, and I highly recommend Dr. Nileema to anyone dealing with disc bulge, sciatica or related back pain issues.",
  },
  {
    ...base,
    id: "g-gayatri-chaudhari",
    authorName: "GAYATRI CHAUDHARI",
    publishedAt: "2026-06-01",
    text: "Good experience..I have seen best physio theropy center ever.. they have best advance physio theropy machinary.. I got relief from my pain in just 3-4 session and I decided to continue all session as per her advise.",
  },
  {
    ...base,
    id: "g-dakshesh-deo",
    authorName: "Dakshesh Deo",
    publishedAt: "2026-06-01",
    text: "Had a really good experience at Smart Physio+ Clinic. I was having pain and after taking physiotherapy sessions here I felt much better. The clinic is clean, well maintained and has good machines as well. Dr. Nileema is very polite and explains everything properly. Really happy with the treatment, definitely recommended.",
  },
  {
    ...base,
    id: "g-shalini-vede",
    authorName: "Shalini Vede",
    publishedAt: "2026-10-01",
    concern: "joints",
    text: "Outstanding Care & Effective Knee Pain Relief!\nI highly recommend Dr. Nileema for treating pain at the back of my knee joints. She is an exceptionally skilled and attentive physiotherapist. Her clinic is equipped with advanced technology, and her combination treatment using Shockwave therapy, Tecar therapy, and Laser therapy targeted the deep inflammation directly.\nThis multi-therapy approach provided fast relief, greatly reducing stiffness and restoring comfortable mobility. Dr. Nileema explains each step clearly and ensures a supportive, personalized recovery process. For anyone suffering from persistent joint or muscle pain, consulting Dr. Nileema is an excellent decision for effective, long-term results!",
  },
  {
    ...base,
    id: "g-justanothergirl",
    authorName: "JustAnotherGirl",
    publishedAt: "2026-08-01",
    text: "I visited Smart Physio+ Physiotherapy and rehab center after my accidental injury. The care I received was truly exceptional.\nDr. Nileema and the team were knowledgeable, patient, and created a recovery plan tailored to my needs. The environment was supportive and motivating, which made a big difference in my healing journey with advanced and robotic equipments.\nThanks to their guidance, I’m regaining strength and confidence much faster than I expected. Highly recommended for anyone needing best quality Physiotherapy and rehabilitation clinic in Balewadi and Baner locality.",
  },
  {
    ...base,
    id: "g-krutika-tiwari",
    authorName: "Krutika Tiwari",
    publishedAt: "2026-08-01",
    concern: "neck",
    text: "I had a great experience with my physiotherapist. She took the time to understand the root cause of my neck pain and dizziness instead of just treating the symptoms. Her assessment was detailed, and she explained the treatment plan clearly.\n\nThe sessions included TECAR therapy, Spinal Decompression, and personalized exercises based on my condition. After a few sessions, I noticed improvement in my neck pain, stiffness, and dizziness, and I felt more comfortable with my daily activities.\n\nShe is knowledgeable, patient, and genuinely cares about her patients’ recovery. I highly recommend her to anyone looking for a physiotherapist who focuses on identifying the underlying cause and providing personalized treatment. Thank you for your care and support! 🌟",
  },
  {
    ...base,
    id: "g-kalpesh-thorat",
    authorName: "Kalpesh Thorat",
    publishedAt: "2026-07-01",
    concern: "balance",
    text: "We are incredibly grateful to Dr. Nileema Chaudhary🙏🏻 for the exceptional care she provided to my mother-in-law. From the first session, she demonstrated a rare blend of professionalism, patience, and deep expertise.\n\nHer approach to treating vertigo through personalized exercises and gentle techniques led to a significant improvement in balance and a noticeable reduction in dizziness. The clinic’s welcoming environment made the entire recovery process smooth and stress-free.\n\nThanks to Dr. Nileema’s dedication, my mother-in-law has regained her confidence in her daily activities. Highly recommended for anyone seeking a compassionate and skilled specialist!😊",
  },
  {
    ...base,
    id: "g-rutuja-r",
    authorName: "Rutuja R",
    publishedAt: "2026-08-01",
    text: "Dr. Neelima diagnosed my long-standing issues and subsequently treated them.I felt his treatment was the best.She is very nice to talk",
  },
];

export const curated = curatedEntries.filter((r) => r.consentRecordedAt);
