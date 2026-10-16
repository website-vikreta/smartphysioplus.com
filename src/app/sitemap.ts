import type { MetadataRoute } from "next";
import { routes } from "@/content/routes";
import { livePages, pagePath } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

// P0 routes plus P1 pages that are live (reviewed + flag on). Drafts never appear here.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...Object.values(routes)
      .filter((r) => r.live)
      .map((r) => ({ url: absoluteUrl(r.path), lastModified })),
    ...livePages.map((p) => ({
      url: absoluteUrl(pagePath(p.slug)),
      lastModified: new Date(p.updatedAt),
    })),
  ];
}
