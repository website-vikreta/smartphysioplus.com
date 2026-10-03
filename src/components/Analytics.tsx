"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const KEY = "sp_consent";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

// Consent-aware analytics. GA4 and Vercel Analytics load only after "Accept".
// Also tracks call / WhatsApp / directions clicks with one document listener.
export function Analytics() {
  const [consent, setConsent] = useState<"yes" | "no" | null>(null);
  const [asked, setAsked] = useState(true);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {
      // Storage blocked: treat as not yet asked, but never load analytics.
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "yes" || saved === "no") setConsent(saved);
    else setAsked(false);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("click_call");
      else if (href.includes("wa.me")) track("click_whatsapp");
      else if (href.includes("google.com/maps/dir")) track("click_directions");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const choose = (v: "yes" | "no") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      // Ignore blocked storage.
    }
    setConsent(v);
    setAsked(true);
  };

  return (
    <>
      {consent === "yes" && gaId && <GoogleAnalytics gaId={gaId} />}
      {consent === "yes" && <VercelAnalytics />}
      {!asked && gaId && (
        <div
          role="region"
          aria-label="Analytics consent"
          className="fixed inset-x-4 bottom-20 z-50 mx-auto max-w-md border-2 border-sp-blue-700 bg-sp-white p-4 md:bottom-6 md:left-6 md:right-auto md:mx-0"
        >
          <p className="text-sm">
            May we use analytics cookies to see how the site is used? No
            personal health details are collected.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => choose("yes")}
              className="min-h-12 bg-sp-blue-700 px-5 font-medium text-sp-white hover:bg-sp-blue-900"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose("no")}
              className="min-h-12 px-4 text-sp-blue-900 underline"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
