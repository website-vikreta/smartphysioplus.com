import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { clinic } from "@/content/clinic";
import { absoluteUrl } from "@/lib/seo";

// Block all crawling on every host except the production apex (stage, review, previews).
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host");
  if (host !== new URL(clinic.domain).host) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
