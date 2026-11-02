// Server only. One entry point for every reviews placement.
// REVIEWS_SOURCE = google | curated | both (default both). Curated entries come first.
import { clinic } from "@/content/clinic";
import { curated } from "@/content/reviews/curated";
import type { ClinicReview, PlaceSummary } from "@/content/reviews/types";
import { fetchGoogleReviews } from "./google";

export type ReviewsData = { reviews: ClinicReview[]; summary: PlaceSummary };

const day = (iso: string) => iso.slice(0, 10);

export async function getReviews(): Promise<ReviewsData> {
  const mode = process.env.REVIEWS_SOURCE ?? "both";
  let google: ReviewsData = { reviews: [], summary: {} };
  if (mode !== "curated" && process.env.GOOGLE_PLACES_API_KEY) {
    try {
      google = await fetchGoogleReviews(clinic.google.placeId);
    } catch (e) {
      // Never show an error to patients: log it and fall back to curated, then to the empty state.
      console.error("[reviews] Google fetch failed:", (e as Error).message);
    }
  }
  const fromCurated = mode === "google" && google.reviews.length ? [] : curated;
  const seen = new Set(fromCurated.map((r) => `${r.authorName}|${day(r.publishedAt)}`));
  const fromGoogle = google.reviews.filter(
    (r) => !seen.has(`${r.authorName}|${day(r.publishedAt)}`),
  );
  return { reviews: [...fromCurated, ...fromGoogle], summary: google.summary };
}
