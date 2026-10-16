import { getPage, liveHref } from "../lib/content.ts";

// Old specialty-page anchor -> P1 page that now owns it.
// An anchor resolves to its page only once that page is live (reviewed + flag on); until then it keeps the anchor.
const owners: Record<string, string> = {
  "/orthopedic-physiotherapy/#back-pain": "back-pain-physiotherapy",
  "/orthopedic-physiotherapy/#disc-bulge": "back-pain-physiotherapy#disc-bulge",
  "/orthopedic-physiotherapy/#tailbone-pain":
    "back-pain-physiotherapy#tailbone-pain",
  "/orthopedic-physiotherapy/#posture":
    "back-pain-physiotherapy#posture-and-desk-work-pain",
  "/orthopedic-physiotherapy/#sciatica": "sciatica-physiotherapy",
  "/orthopedic-physiotherapy/#neck-pain": "neck-pain-physiotherapy",
  "/orthopedic-physiotherapy/#knee-pain": "knee-pain-physiotherapy",
  "/orthopedic-physiotherapy/#shoulder-pain": "shoulder-pain-physiotherapy",
  "/orthopedic-physiotherapy/#arthritis": "arthritis-physiotherapy",
  "/orthopedic-physiotherapy/#post-surgery-rehab":
    "post-surgery-rehabilitation",
  "/orthopedic-physiotherapy/#sports-injury": "sports-physiotherapy",
};

export const futureRoutes: Record<string, string> = Object.fromEntries(
  Object.entries(owners).map(([anchor, slug]) => [
    anchor,
    liveHref(slug, anchor),
  ]),
);

/** Use for every link that may point at an old anchor. */
export const resolveHref = (href: string) => futureRoutes[href] ?? href;

/** The P1 page that owns a whole old anchor (not a sub-section), live or not. */
export const ownerPage = (href: string) => {
  const slug = owners[href];
  return slug && !slug.includes("#") ? getPage(slug) : undefined;
};
