// Usage: pnpm content:review-status  ->  every P1 page with its clinical review state.
// live = flag on (or none) + clinicallyReviewed. draft = noindex, not in the sitemap, not linked.
import { allPages, reviewState } from "../src/lib/content.ts";

console.table(
  allPages.map((p) => ({
    page: `/${p.slug}/`,
    cluster: p.cluster,
    flag: p.flag ?? "-",
    reviewed: p.clinicallyReviewed,
    reviewedAt: p.reviewedAt ?? "-",
    state: reviewState(p),
  })),
);
