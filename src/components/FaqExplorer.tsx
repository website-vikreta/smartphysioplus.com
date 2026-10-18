"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { faqGroups } from "@/content/faqs";
import { Icon } from "./Icon";

export type FaqRow = {
  id: string;
  question: string;
  group: (typeof faqGroups)[number];
  /** Resolved answer text, or a link to the page that owns it. */
  answer?: string;
  href?: string;
};

// Accordion with deep links (/faqs/#id) and a client-side search. Links to other pages replace answers owned elsewhere.
export function FaqExplorer({ rows }: { rows: FaqRow[] }) {
  const [q, setQ] = useState("");

  // Open the question a deep link points at.
  useEffect(() => {
    const open = () => {
      const el = document.getElementById(location.hash.slice(1));
      if (el instanceof HTMLDetailsElement) el.open = true;
    };
    open();
    addEventListener("hashchange", open);
    return () => removeEventListener("hashchange", open);
  }, []);

  const term = q.trim().toLowerCase();
  const shown = rows.filter(
    (r) =>
      !term || `${r.question} ${r.answer ?? ""}`.toLowerCase().includes(term),
  );

  return (
    <>
      <label className="block max-w-xl">
        <span className="font-medium text-sp-blue-900">Search questions</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="mt-2 block min-h-12 w-full rounded-xl border border-sp-teal-100 bg-sp-white px-4"
        />
      </label>
      <p aria-live="polite" className="sr-only">
        {shown.length} of {rows.length} questions shown
      </p>
      {shown.length === 0 && (
        <p className="mt-6">
          No question matches. Call us or message us on WhatsApp and we will
          answer.
        </p>
      )}
      {faqGroups.map((g) => {
        const items = shown.filter((r) => r.group === g);
        if (!items.length) return null;
        return (
          <section key={g} className="mt-10">
            <h2 className="text-xl font-semibold text-sp-blue-900">{g}</h2>
            <div className="mt-4 grid max-w-3xl gap-3">
              {items.map((r) =>
                r.answer ? (
                  <details
                    key={r.id}
                    id={r.id}
                    className="sp-card group scroll-mt-28 !p-0"
                  >
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-medium text-sp-blue-900">
                      {r.question}
                      <Icon
                        name="chevron"
                        className="size-5 shrink-0 transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <p className="px-5 pb-4">{r.answer}</p>
                  </details>
                ) : (
                  <Link
                    key={r.id}
                    id={r.id}
                    href={r.href!}
                    className="sp-card flex min-h-14 scroll-mt-28 items-center justify-between gap-4 px-5 py-3 font-medium text-sp-blue-700 underline"
                  >
                    {r.question}
                    <Icon name="arrow" className="size-5 shrink-0" />
                  </Link>
                ),
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
