"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type ResourceCard = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  readingMinutes: number;
  href: string;
};

// Topic chips and cards for live guides. No pagination, feed or tag cloud (promptP2.md section 8).
export function ResourcesExplorer({
  cards,
  topics,
}: {
  cards: ResourceCard[];
  topics: { id: string; label: string }[];
}) {
  const [topic, setTopic] = useState<string | null>(null);
  const present = topics.filter((t) => cards.some((c) => c.topic === t.id));
  const shown = topic ? cards.filter((c) => c.topic === topic) : cards;
  return (
    <>
      {present.length > 1 && (
        <ul className="flex flex-wrap gap-2" aria-label="Filter by topic">
          {present.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                aria-pressed={topic === t.id}
                onClick={() => setTopic(topic === t.id ? null : t.id)}
                className={cn(
                  "sp-tag min-h-12 px-6 font-medium",
                  topic === t.id
                    ? "bg-sp-blue-700 text-sp-white"
                    : "sp-btn-line",
                )}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c) => (
          <li key={c.slug} className="sp-card sp-card-link flex flex-col">
            <h2 className="text-lg font-semibold text-sp-blue-900">
              {c.title}
            </h2>
            <p className="mt-1 flex-1 text-sm">{c.summary}</p>
            <p className="mt-3 text-sm">{c.readingMinutes} minute read</p>
            <Link
              href={c.href}
              className="mt-2 inline-flex min-h-12 items-center text-sp-blue-700 underline"
            >
              Read the guide
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
