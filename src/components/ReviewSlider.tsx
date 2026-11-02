"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { clinic } from "@/content/clinic";
import type { ClinicReview } from "@/content/reviews/types";
import { renderWithHighlights } from "@/lib/reviews/highlights";
import { cn } from "@/lib/utils";

const GAP = 24;
const EVERY_MS = 5000;

// Scrolls one card; wraps to the start/end of the row.
function step(el: HTMLElement, dir: 1 | -1) {
  const card = el.firstElementChild as HTMLElement | null;
  if (!card) return;
  const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
  if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
  else if (dir === -1 && el.scrollLeft <= 4)
    el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
  else el.scrollBy({ left: dir * (card.offsetWidth + GAP), behavior: "smooth" });
}

const month = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

function Stars({ n }: { n: number }) {
  return (
    <span role="img" aria-label={`Rated ${n} out of 5 on Google`} className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
          <path
            fill={i <= n ? "#F5B301" : "#D6DEE3"}
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
      ))}
    </span>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="size-[22px]" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Card({ r, n, total }: { r: ClinicReview; n: number; total: number }) {
  const text = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [clipped, setClipped] = useState(false);

  // Show "Read more" only when the text really overflows the clamp.
  useEffect(() => {
    const el = text.current;
    if (!el || open) return;
    const ro = new ResizeObserver(() =>
      setClipped(el.scrollHeight > el.clientHeight + 1),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  const bg = [...r.authorName].reduce((a, c) => a + c.charCodeAt(0), 0) % 2 ? "bg-sp-blue-900" : "bg-sp-blue-700";
  const nameId = `review-${r.id}`;
  return (
    <li
      role="group"
      aria-roledescription="slide"
      aria-label={`Review ${n} of ${total}`}
      className="w-[85%] shrink-0 snap-start md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
    >
      <article
        aria-labelledby={nameId}
        className="flex h-full flex-col rounded-[20px] border border-[#E3EEF3] bg-sp-white p-6 transition-colors focus-within:border-sp-teal-500 hover:border-sp-teal-500"
      >
        <header className="flex items-start gap-3">
          {r.authorPhotoUrl ? (
            <Image
              src={r.authorPhotoUrl}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="size-14 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex size-14 shrink-0 items-center justify-center rounded-full text-xl font-semibold text-sp-white",
                bg,
              )}
            >
              {r.authorName.charAt(0).toUpperCase()}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h3
              id={nameId}
              className="truncate font-(family-name:--font-display) text-lg font-semibold text-sp-blue-900"
            >
              {r.authorName}
            </h3>
            <p className="text-sm text-[#5B6B75]">
              {r.subLine ?? `Google review · ${month(r.publishedAt)}`}
            </p>
            <Stars n={r.rating} />
          </div>
          <a
            href={r.authorProfileUrl ?? clinic.google.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View this review on Google"
            className="shrink-0"
          >
            <GoogleG />
          </a>
        </header>
        {r.chip && (
          <p className="mt-4 self-start rounded-full bg-sp-teal-100 px-3 py-1 text-sm text-sp-blue-700">
            {r.chip}
          </p>
        )}
        <p
          ref={text}
          className={cn(
            "mt-4 whitespace-pre-line leading-relaxed text-sp-ink",
            !open && "line-clamp-7",
          )}
        >
          {renderWithHighlights(r.text, r.highlights).map((s, i) =>
            s.strong ? <strong key={i}>{s.text}</strong> : s.text,
          )}
        </p>
        {(clipped || open) && (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="mt-2 self-start text-sm font-medium text-sp-blue-700 underline"
          >
            {open ? "Show less" : "Read more"}
          </button>
        )}
      </article>
    </li>
  );
}

// CSS scroll-snap row that advances by itself. Pauses on hover/focus, has a pause button (WCAG 2.2.2)
// and never auto-advances for people who prefer reduced motion.
export function ReviewSlider({ reviews }: { reviews: ClinicReview[] }) {
  const row = useRef<HTMLUListElement>(null);
  const [hold, setHold] = useState(false); // hover or focus inside
  const [stopped, setStopped] = useState(false); // user pressed pause

  useEffect(() => {
    if (hold || stopped || reviews.length < 2) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => row.current && step(row.current, 1), EVERY_MS);
    return () => clearInterval(t);
  }, [hold, stopped, reviews.length]);

  const btn =
    "inline-flex size-12 items-center justify-center rounded-full border border-sp-blue-700 text-sp-blue-700 hover:bg-sp-teal-100";
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Patient reviews from Google"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <ul
        ref={row}
        tabIndex={0}
        aria-label="Reviews"
        className="flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <Card key={r.id} r={r} n={i + 1} total={reviews.length} />
        ))}
      </ul>
      {reviews.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button type="button" aria-label="Previous review" className={btn} onClick={() => row.current && step(row.current, -1)}>
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label={stopped ? "Start automatic sliding" : "Pause automatic sliding"}
            aria-pressed={stopped}
            className={btn}
            onClick={() => setStopped((v) => !v)}
          >
            <span aria-hidden="true">{stopped ? "▶" : "❚❚"}</span>
          </button>
          <button type="button" aria-label="Next review" className={btn} onClick={() => row.current && step(row.current, 1)}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </section>
  );
}
