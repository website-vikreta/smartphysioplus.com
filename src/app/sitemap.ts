import type { MetadataRoute } from "next";
import { routes } from "@/content/routes";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return Object.values(routes)
    .filter((r) => r.live)
    .map((r) => ({ url: absoluteUrl(r.path), lastModified }));
}
