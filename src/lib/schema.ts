import { clinic } from "@/content/clinic";
import { absoluteUrl } from "./seo";

export const CLINIC_ID = `${clinic.domain}/#clinic`;
export const DOCTOR_ID = `${clinic.domain}/#dr-nileema-chaudhary`;

const DAY_URL: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

// Site-wide clinic entity. No AggregateRating/Review (promptP0.md rule 5).
export function siteSchema() {
  const { street, locality, city, region, postalCode, country } =
    clinic.address;
  return [
    {
      "@context": "https://schema.org",
      "@type": ["Physiotherapy", "MedicalBusiness"],
      "@id": CLINIC_ID,
      name: clinic.brandName,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/brand/logo.png"),
      image: absoluteUrl("/opengraph-image"),
      telephone: clinic.phone.e164,
      medicalSpecialty: "Physiotherapy",
      address: {
        "@type": "PostalAddress",
        streetAddress: street,
        addressLocality: `${locality}, ${city}`,
        addressRegion: region,
        postalCode,
        addressCountry: country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: clinic.google.geo.lat,
        longitude: clinic.google.geo.lng,
      },
      openingHoursSpecification: clinic.hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days.map((d) => DAY_URL[d]),
        opens: h.opens,
        closes: h.closes,
      })),
      hasMap: clinic.google.mapsUrl,
      sameAs: [
        clinic.social.instagram,
        clinic.social.facebook,
        clinic.social.justdial,
        clinic.google.mapsUrl,
      ],
      areaServed: ["Balewadi", "Baner", "Pune"].map((name) => ({
        "@type": "Place",
        name,
      })),
      founder: { "@id": DOCTOR_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${clinic.domain}/#website`,
      url: absoluteUrl("/"),
      name: clinic.brandName,
      publisher: { "@id": CLINIC_ID },
    },
  ];
}
