import { flags } from "../content/flags.ts";
import { liveFaqs } from "../content/faqs.ts";
import { homeVisit } from "../content/homeVisit.ts";
import { livePages } from "./content.ts";
import { liveResources } from "./resources.ts";

// One place that decides which P2 pages are live (promptP2.md section 2 and 5).
// The sitemap, nav, hubs, breadcrumbs and link checker all read this. Unpublishable pages stay noindex and unlinked.
const live = (...clusters: string[]) =>
  livePages.filter((p) => clusters.includes(p.cluster)).length;

export const publishable = {
  conditionsHub: live("condition") >= 3,
  rehabHub: live("rehab", "sports") >= 2,
  reviews: true, // Always live: it carries the Google review link.
  faqs: liveFaqs.filter((f) => f.home === "faqs").length >= 8,
  resourcesIndex: liveResources.length >= 1,
  // Built when the flag is on; live once Dr. Nileema reviews it (src/content/homeVisit.ts).
  homeVisit: flags.homeVisits && homeVisit.clinicallyReviewed,
};

/** P2 pages that can be in the sitemap. `/review/` is internal and never listed. */
export const p2Routes = [
  { path: "/conditions/", name: "Conditions", ok: publishable.conditionsHub },
  {
    path: "/rehabilitation/",
    name: "Rehabilitation",
    ok: publishable.rehabHub,
  },
  { path: "/faqs/", name: "FAQs", ok: publishable.faqs },
  { path: "/resources/", name: "Resources", ok: publishable.resourcesIndex },
  {
    path: "/physiotherapy-at-home/",
    name: "Physiotherapy at home",
    ok: publishable.homeVisit,
  },
];
