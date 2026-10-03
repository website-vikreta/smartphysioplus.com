// P0 routes (promptP0.md section 7). Set `live: true` once the page exists so it enters the sitemap.
export const routes = {
  home: { path: "/", name: "Home", live: true },
  physiotherapy: {
    path: "/physiotherapy/",
    name: "Physiotherapy",
    live: false,
  },
  local: {
    path: "/physiotherapy-baner-balewadi-pune/",
    name: "Physiotherapy in Baner and Balewadi",
    live: false,
  },
  services: { path: "/services/", name: "Services", live: false },
  ortho: {
    path: "/orthopedic-physiotherapy/",
    name: "Orthopedic physiotherapy",
    live: false,
  },
  neuro: {
    path: "/neuro-physiotherapy/",
    name: "Neuro physiotherapy",
    live: false,
  },
  about: { path: "/about/", name: "About", live: false },
  doctor: {
    path: "/dr-nileema-chaudhary/",
    name: "Dr. Nileema Chaudhary",
    live: false,
  },
  contact: { path: "/contact/", name: "Contact", live: false },
  book: { path: "/book-appointment/", name: "Book appointment", live: false },
  privacy: { path: "/privacy-policy/", name: "Privacy policy", live: false },
  terms: {
    path: "/terms-and-conditions/",
    name: "Terms and conditions",
    live: false,
  },
  disclaimer: { path: "/disclaimer/", name: "Disclaimer", live: false },
} as const;
