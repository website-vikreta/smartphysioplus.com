"use client";

import { useState } from "react";
import { clinic } from "@/content/clinic";

// Click-to-load map so the Google embed does not hurt page speed.
export function MapFacade() {
  const [loaded, setLoaded] = useState(false);
  const q = encodeURIComponent(
    `${clinic.brandName} ${clinic.address.locality} ${clinic.address.city}`,
  );

  if (loaded) {
    return (
      <iframe
        title={`Map of ${clinic.brandName}, ${clinic.address.locality}`}
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-72 w-full border-0"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="flex h-72 w-full items-center justify-center bg-sp-teal-100 font-medium text-sp-blue-900 hover:bg-sp-teal-100/70"
    >
      Show map ({clinic.address.locality}, {clinic.address.city})
    </button>
  );
}
