// Server only. Never import this from a client component: it reads GOOGLE_PLACES_API_KEY.
// Places API (New) Place Details, cached one day. Review text is never copied into the repo or Supabase.
import type {
  ClinicReview,
  PlaceSummary,
} from "../../content/reviews/types.ts";

type ApiReview = {
  name?: string;
  relativePublishTimeDescription?: string;
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
  publishTime?: string;
  googleMapsUri?: string;
};

export type GoogleResult = { reviews: ClinicReview[]; summary: PlaceSummary };

// Throws on a missing key or a failed call; the caller logs and falls back.
export async function fetchGoogleReviews(
  placeId: string,
): Promise<GoogleResult> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) throw new Error("GOOGLE_PLACES_API_KEY is not set");
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "reviews,rating,userRatingCount,googleMapsUri",
      },
      next: { revalidate: 86400 },
    },
  );
  if (!res.ok) throw new Error(`Places API ${res.status}`);
  const data = (await res.json()) as PlaceSummary & { reviews?: ApiReview[] };

  const reviews: ClinicReview[] = [];
  for (const r of data.reviews ?? []) {
    // originalText is what the patient wrote; text may be machine-translated.
    const text = (r.originalText?.text ?? r.text?.text ?? "").trim();
    const name = r.authorAttribution?.displayName;
    const rating = r.rating;
    // Display curation only: 4+ stars with written text. Order stays as Google returns it.
    if (!text || !name || !r.name || !r.publishTime) continue;
    if (!Number.isInteger(rating) || rating! < 4 || rating! > 5) continue;
    reviews.push({
      id: r.name,
      source: "google",
      authorName: name,
      authorPhotoUrl: r.authorAttribution?.photoUri,
      authorProfileUrl: r.googleMapsUri ?? r.authorAttribution?.uri,
      rating: rating as 4 | 5,
      text,
      publishedAt: r.publishTime,
      relativeTime: r.relativePublishTimeDescription,
    });
  }
  return {
    reviews,
    summary: {
      rating: data.rating,
      userRatingCount: data.userRatingCount,
      googleMapsUri: data.googleMapsUri,
    },
  };
}
