"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const STEPS = [
  { target: "spine-hero", text: "Tap the part of the spine that hurts." },
  {
    target: "journey",
    text: "See how we treat it: assessment, treatment, rehabilitation.",
  },
  {
    target: "book-cta",
    text: "Book in under a minute. No account needed. We will confirm on WhatsApp or call.",
  },
];

const KEY = "sp_tour_done";
export const TOUR_EVENT = "sp:tour";
export const TOUR_PENDING = "sp_tour_open";

// First-visit 3-step guide. Shown once; reopened from the footer link.
export function Tour() {
  const [step, setStep] = useState<number | null>(null);

  useEffect(() => {
    const open = () => setStep(0);
    window.addEventListener(TOUR_EVENT, open);
    let timer: number | undefined;
    try {
      if (sessionStorage.getItem(TOUR_PENDING)) {
        sessionStorage.removeItem(TOUR_PENDING);
        timer = window.setTimeout(open, 0);
      } else if (!localStorage.getItem(KEY)) {
        timer = window.setTimeout(open, 2500);
      }
    } catch {
      // Storage blocked: skip the first-visit tour.
    }
    return () => {
      window.removeEventListener(TOUR_EVENT, open);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (step === null) return;
    const el = document.getElementById(STEPS[step].target);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
    el?.classList.add("tour-active");
    return () => el?.classList.remove("tour-active");
  }, [step]);

  if (step === null) return null;

  const finish = (completed: boolean) => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      // Ignore blocked storage.
    }
    if (completed) track("tour_complete");
    setStep(null);
  };
  const last = step === STEPS.length - 1;

  return (
    <div
      role="dialog"
      aria-label="Quick tour"
      onKeyDown={(e) => e.key === "Escape" && finish(false)}
      className="fixed inset-x-4 bottom-20 z-50 mx-auto max-w-md border-2 border-sp-blue-700 bg-sp-white p-4 md:bottom-6 md:left-auto md:right-6"
    >
      <p className="text-sm text-sp-blue-900">
        Step {step + 1} of {STEPS.length}
      </p>
      <p className="mt-1 font-medium">{STEPS[step].text}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          autoFocus
          onClick={() => (last ? finish(true) : setStep(step + 1))}
          className="min-h-12 bg-sp-blue-700 px-5 font-medium text-sp-white hover:bg-sp-blue-900"
        >
          {last ? "Done" : "Next"}
        </button>
        <button
          type="button"
          onClick={() => finish(false)}
          className="min-h-12 px-4 text-sp-blue-900 underline"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
