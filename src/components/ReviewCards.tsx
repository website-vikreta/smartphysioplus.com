import { clinic } from "@/content/clinic";
import { routes } from "@/content/routes";
import { getReviews } from "@/lib/reviews";
import { ButtonLink } from "./ButtonLink";
import { ReviewSlider } from "./ReviewSlider";

// Server component: fetches the reviews (curated + live Google when a key is set) and hands them to the slider.
export async function ReviewCards() {
  const { reviews } = await getReviews();
  return (
    <div>
      {reviews.length > 0 ? (
        <>
          <p className="mb-6 text-sm text-[#5B6B75]">Reviews from Google</p>
          <ReviewSlider reviews={reviews} />
        </>
      ) : (
        <p>Read what our patients say on Google.</p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink
          href={clinic.google.reviewsUrl}
          icon="star"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read all reviews on Google
        </ButtonLink>
        <ButtonLink href={routes.review.path} variant="secondary">
          Leave a review
        </ButtonLink>
      </div>
    </div>
  );
}
