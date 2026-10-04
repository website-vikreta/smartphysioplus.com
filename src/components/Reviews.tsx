"use client";

import Image from "next/image";
import { useState } from "react";
import { clinic } from "@/content/clinic";
import { reviews } from "@/content/reviews";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";

const FIRST = 4;

// Only curated reviews from src/content/reviews.ts. Never hardcode review text elsewhere.
export function Reviews() {
  const { rating } = clinic.google;
  const [all, setAll] = useState(false);
  const shown = all ? reviews : reviews.slice(0, FIRST);
  const more = reviews.length > FIRST;
  return (
    <div>
      <p className="flex flex-wrap items-center gap-2 text-lg">
        <Icon name="star" className="size-6 text-sp-teal-500" />
        <strong className="text-sp-blue-900">{rating.value} on Google</strong>
        <span>from {rating.count} patient reviews</span>
      </p>
      {reviews.length > 0 && (
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {shown.map((r) => (
            <li key={`${r.author}-${r.date}`} className="sp-card sp-card-link">
              <div className="flex items-center gap-3">
                {r.photo ? (
                  <Image
                    src={r.photo}
                    alt={`${r.author}, patient`}
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-sp-teal-100 font-semibold text-sp-blue-700"
                  >
                    {r.author.trim().charAt(0).toUpperCase()}
                  </span>
                )}
                <p className="text-sm font-semibold text-sp-blue-900">
                  {r.author}
                  <span className="block font-normal">
                    Google review, {r.date}
                  </span>
                </p>
              </div>
              <blockquote className="mt-4">&ldquo;{r.text}&rdquo;</blockquote>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {more && (
          <button
            type="button"
            aria-expanded={all}
            onClick={() => setAll((v) => !v)}
            className="sp-btn sp-btn-line inline-flex min-h-12 items-center justify-center px-8 font-medium"
          >
            {all ? "Show fewer reviews" : "Read all patient reviews"}
          </button>
        )}
        <ButtonLink
          href={clinic.google.reviewsUrl}
          variant="secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          {more ? "See them on Google" : "Read all patient reviews on Google"}
        </ButtonLink>
      </div>
    </div>
  );
}
