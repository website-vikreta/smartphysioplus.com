import type { Metadata } from "next";
import { clinic } from "@/content/clinic";

export const absoluteUrl = (path: string) =>
  new URL(path, clinic.domain).toString();

// Title <= 60 chars and description <= 155 chars (promptP0.md section 10).
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: clinic.brandName,
      type: "website",
      locale: "en_IN",
    },
    ...(opts.noindex && { robots: { index: false, follow: false } }),
  };
}
