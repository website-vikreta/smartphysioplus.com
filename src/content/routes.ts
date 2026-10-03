// P0 routes (promptP0.md section 7). `live: true` puts the page in the sitemap.
export const routes = {
  home: { path: "/", name: "Home", live: true },
  physiotherapy: { path: "/physiotherapy/", name: "Physiotherapy", live: true },
  local: {
    path: "/physiotherapy-baner-balewadi-pune/",
    name: "Physiotherapy in Baner and Balewadi",
    live: true,
  },
  services: { path: "/services/", name: "Services", live: true },
  ortho: {
    path: "/orthopedic-physiotherapy/",
    name: "Orthopedic physiotherapy",
    live: true,
  },
  neuro: {
    path: "/neuro-physiotherapy/",
    name: "Neuro physiotherapy",
    live: true,
  },
  about: { path: "/about/", name: "About", live: true },
  doctor: {
    path: "/dr-nileema-chaudhary/",
    name: "Dr. Nileema Chaudhary",
    live: true,
  },
  contact: { path: "/contact/", name: "Contact", live: true },
  book: { path: "/book-appointment/", name: "Book appointment", live: true },
  privacy: { path: "/privacy-policy/", name: "Privacy policy", live: true },
  terms: {
    path: "/terms-and-conditions/",
    name: "Terms and conditions",
    live: true,
  },
  disclaimer: { path: "/disclaimer/", name: "Disclaimer", live: true },
} as const;
