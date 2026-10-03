import { clinic } from "@/content/clinic";

// Google map pinned on the clinic's exact coordinates. Lazy-loaded below the fold.
export function MapFacade() {
  const { lat, lng } = clinic.google.geo;
  return (
    <iframe
      title={`Map of ${clinic.brandName}, ${clinic.address.locality}`}
      src={`https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="h-72 w-full border-0 md:h-96"
    />
  );
}
