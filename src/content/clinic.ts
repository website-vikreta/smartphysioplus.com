// Single source of truth for name, address, phone, hours and map links.
// Never hardcode these anywhere else.
export const clinic = {
  brandName: "Smart Physio+",
  legalDisplayName: "Smart Physio+ | Dr. Nileema Chaudhary",
  tagline: "Healing powered by technology",
  domain: "https://smartphysioplus.com",
  address: {
    street: "402, Archway, Sopan Baug Road",
    locality: "Balewadi",
    city: "Pune",
    region: "Maharashtra",
    postalCode: "411045",
    country: "IN",
  },
  phone: {
    display: "+91 86699 22351",
    e164: "+918669922351",
    tel: "tel:+918669922351",
  },
  whatsapp: "https://wa.me/918669922351",
  hours: [
    {
      days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"],
      opens: "10:00",
      closes: "20:00",
    },
    // TODO-CONFIRM: Sunday closed / not listed on Google. Show "Sunday: closed" only after confirmation (flag: sunday).
  ],
  google: {
    placeId: "ChIJAZjHwDm5wjsRFG7O4ZIiVqc",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Smart+Physio%2B+Balewadi&query_place_id=ChIJAZjHwDm5wjsRFG7O4ZIiVqc",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Smart+Physio%2B+Balewadi+Pune&destination_place_id=ChIJAZjHwDm5wjsRFG7O4ZIiVqc",
    reviewsUrl:
      "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJAZjHwDm5wjsRFG7O4ZIiVqc",
  },
  social: {
    instagram: "https://www.instagram.com/smartphysioplus/",
    facebook: "https://www.facebook.com/p/Smart-physio-61588933744062/",
    justdial: "https://jsdl.in/DT-49QPQVYGHGR",
  },
} as const;
