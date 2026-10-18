"use client";

import { useState } from "react";
import { type Review, reviewName } from "@/content/reviews";
import { cn } from "@/lib/utils";

const concerns: Review["concern"][] = [
  "back",
  "neck",
  "joints",
  "balance",
  "sports",
  "other",
];

// Curated, consented quotes only (reviews.ts drops the rest). Chips show only concerns that have a quote.
export function ReviewQuotes({ reviews }: { reviews: Review[] }) {
  const [concern, setConcern] = useState<Review["concern"] | null>(null);
  const present = concerns.filter((c) => reviews.some((r) => r.concern === c));
  const shown = concern
    ? reviews.filter((r) => r.concern === concern)
    : reviews;
  return (
    <>
      {present.length > 1 && (
        <ul className="flex flex-wrap gap-2" aria-label="Filter by concern">
          {present.map((c) => (
            <li key={c}>
              <button
                type="button"
                aria-pressed={concern === c}
                onClick={() => setConcern(concern === c ? null : c)}
                className={cn(
                  "sp-tag min-h-12 px-6 font-medium capitalize",
                  concern === c
                    ? "bg-sp-blue-700 text-sp-white"
                    : "sp-btn-line",
                )}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
      <ul className="mt-6 grid gap-5 md:grid-cols-2">
        {shown.map((r) => (
          <li key={`${reviewName(r)}-${r.date}`} className="sp-card">
            <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
            <p className="mt-3 text-sm font-semibold text-sp-blue-900">
              {reviewName(r)}
              <span className="block font-normal">Google review, {r.date}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
