import { clinic } from "@/content/clinic";
import { reviews } from "@/content/reviews";
import { ButtonLink } from "./ButtonLink";

// Only curated reviews from src/content/reviews.ts. Never hardcode review text elsewhere.
export function Reviews() {
  if (reviews.length === 0) {
    return (
      <div>
        <p className="max-w-xl">
          See what patients say about their visits on Google.
        </p>
        <ButtonLink
          href={clinic.google.reviewsUrl}
          variant="secondary"
          className="mt-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read our patient reviews on Google
        </ButtonLink>
      </div>
    );
  }
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {reviews.map((r) => (
        <li key={`${r.author}-${r.date}`} className="bg-sp-white p-5">
          <blockquote>{r.text}</blockquote>
          <p className="mt-2 text-sm">
            {r.author}, {r.date}
          </p>
        </li>
      ))}
    </ul>
  );
}
