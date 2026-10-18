"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { ButtonLink } from "./ButtonLink";

// Review request tool (promptP2.md section 10). Policy, hard-coded: no review gating, no incentives,
// no pre-written review text, and staff, family and friends are never asked to post. The only text here
// is the message that asks; it never suggests what to write.
export function ReviewTool({
  reviewUrl,
  printHref,
}: {
  reviewUrl: string;
  printHref: string;
}) {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);
  const message = `Hi ${name.trim() || "<name>"}, thank you for visiting Smart Physio+. If you have a minute, we'd be grateful for a Google review: ${reviewUrl}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      track("review_template_copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be blocked; the text is selectable in the box above.
    }
  };

  return (
    <>
      <ButtonLink
        href={reviewUrl}
        icon="star"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("review_button_click")}
        className="!min-h-16 w-full justify-center text-lg sm:w-auto"
      >
        Write a Google review
      </ButtonLink>

      <details className="sp-card mt-10 max-w-xl">
        <summary className="min-h-12 cursor-pointer font-medium text-sp-blue-900">
          For clinic staff
        </summary>
        <div className="mt-3 space-y-3">
          <label className="block">
            Patient first name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block min-h-12 w-full rounded-xl border-2 border-sp-blue-900/40 bg-sp-white px-3"
            />
          </label>
          <p className="rounded-xl bg-sp-mist p-3 text-sm">{message}</p>
          <button
            type="button"
            onClick={copy}
            className="sp-btn sp-btn-line inline-flex min-h-12 items-center px-6 font-medium"
          >
            {copied ? "Copied" : "Copy message"}
          </button>
          <p className="text-sm">
            Copy it and send it yourself on WhatsApp. It is a template, not an
            automatic message. Ask every patient the same way. Never offer
            anything for a review, never suggest what to write and never ask
            only the happy ones.
          </p>
          <p>
            <Link href={printHref} className="text-sp-blue-700 underline">
              Print the review card
            </Link>
          </p>
        </div>
      </details>
    </>
  );
}
