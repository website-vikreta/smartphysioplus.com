import type { MetadataRoute } from "next";
import { routes } from "@/content/routes";
import { livePages, pagePath } from "@/lib/content";
import { p2Routes } from "@/lib/publishable";
import { liveResources, resourcePath } from "@/lib/resources";
import { absoluteUrl } from "@/lib/seo";

// P0 routes, live P1 pages and the P2 pages that pass src/lib/publishable.ts. Drafts never appear here.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...Object.values(routes)
      .filter((r) => r.live)
      .map((r) => ({ url: absoluteUrl(r.path), lastModified })),
    ...p2Routes
      .filter((r) => r.ok)
      .map((r) => ({ url: absoluteUrl(r.path), lastModified })),
    ...liveResources.map((r) => ({
      url: absoluteUrl(resourcePath(r.slug)),
      lastModified: new Date(r.updatedAt),
    })),
    ...livePages.map((p) => ({
      url: absoluteUrl(pagePath(p.slug)),
      lastModified: new Date(p.updatedAt),
    })),
  ];
}
