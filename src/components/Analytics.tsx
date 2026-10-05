"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import Script from "next/script";
import { useEffect, useState } from "react";
import { clinic } from "@/content/clinic";
import { track } from "@/lib/analytics";

const KEY = "sp_consent";
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

// Consent-aware analytics. GA4, Microsoft Clarity and Vercel Analytics load only after "Accept".
// Also tracks call / WhatsApp / directions clicks with one document listener.
export function Analytics() {
  const [consent, setConsent] = useState<"yes" | "no" | null>(null);
  const [asked, setAsked] = useState(true); // stays true off production, so no banner

  useEffect(() => {
    // Production host only: no banner and no tracking on stage, review, netlify or localhost.
    if (location.host !== new URL(clinic.domain).host) return;
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
      {consent === "yes" && clarityId && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
      {consent === "yes" && <VercelAnalytics />}
      {!asked && (gaId || clarityId) && (
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
