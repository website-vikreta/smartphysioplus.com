// P0 routes (promptP0.md section 7). `live: true` puts the page in the sitemap.
// P2 hubs have `live: false` here: src/lib/publishable.ts decides when they go live.
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
  conditions: { path: "/conditions/", name: "Conditions", live: false },
  rehabilitation: {
    path: "/rehabilitation/",
    name: "Rehabilitation",
    live: false,
  },
  reviews: { path: "/reviews/", name: "Reviews", live: true },
  faqs: { path: "/faqs/", name: "FAQs", live: false },
  resources: { path: "/resources/", name: "Resources", live: false },
  homeVisit: {
    path: "/physiotherapy-at-home/",
    name: "Physiotherapy at home",
    live: false,
  },
  // Internal review tool: noindex, never in the sitemap or the nav (promptP2.md section 10).
  review: { path: "/review/", name: "Review", live: false },
  reviewPrint: {
    path: "/review/print/",
    name: "Print review card",
    live: false,
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
