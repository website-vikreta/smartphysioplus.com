import { clinic } from "@/content/clinic";
import { reviews } from "@/content/reviews";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";

// Only curated reviews from src/content/reviews.ts. Never hardcode review text elsewhere.
export function Reviews() {
  const { rating } = clinic.google;
  return (
    <div>
      <p className="flex flex-wrap items-center gap-2 text-lg">
        <Icon name="star" className="size-6 text-sp-teal-500" />
        <strong className="text-sp-blue-900">{rating.value} on Google</strong>
        <span>from {rating.count} patient reviews</span>
      </p>
      {reviews.length > 0 && (
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <li key={`${r.author}-${r.date}`} className="sp-card sp-card-link">
              <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
              <p className="mt-4 text-sm font-semibold text-sp-blue-900">
                {r.author}
                <span className="ml-2 font-normal">
                  Google review, {r.date}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
      <ButtonLink
        href={clinic.google.reviewsUrl}
        variant="secondary"
        className="mt-6"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read all patient reviews on Google
      </ButtonLink>
    </div>
  );
}
