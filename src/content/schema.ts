import { z } from "zod";
import { flags } from "./flags.ts";
import { technology } from "./technology.ts";

// Frontmatter for every P1 MDX page (promptP1.md section 3). "resource" joins `cluster` in P2.
const slug = z.string().regex(/^[a-z0-9-]+$/);
const isoDate = z.coerce.date().transform((d) => d.toISOString().slice(0, 10));

export const pageSchema = z
  .object({
    slug,
    title: z.string(),
    metaTitle: z.string().max(60),
    metaDescription: z.string().max(155),
    h1: z.string(),
    /** Condition or therapy name for MedicalWebPage.about. */
    condition: z.string(),
    cluster: z.enum(["condition", "rehab", "sports", "service-local"]),
    summary: z.string(),
    relatedService: z.enum(["orthopedic", "neuro", "physiotherapy"]),
    relatedConditions: z.array(slug).default([]),
    relatedRehab: z.array(slug).default([]),
    relatedResources: z.array(slug).default([]),
    spineRegion: z
      .enum(["cervical", "thoracic", "lumbar", "sacral", "joints"])
      .optional(),
    /** Filter group on /conditions/ (promptP2.md section 3). Required for condition pages. */
    bodyArea: z
      .enum([
        "neck-upper-back",
        "lower-back-leg",
        "shoulder-arm",
        "knee-hip",
        "joints",
      ])
      .optional(),
    // Machines this page names. Shown only once the clinic confirms the mapping (flag: technologyByCondition).
    technology: z
      .array(z.enum(technology.map((t) => t.name) as [string, ...string[]]))
      .default([]),
    faqs: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .min(4)
      .max(6),
    flag: z
      .enum(
        Object.keys(flags) as [keyof typeof flags, ...(keyof typeof flags)[]],
      )
      .optional(),
    clinicallyReviewed: z.boolean(),
    reviewedBy: z.literal("dr-nileema-chaudhary"),
    reviewedAt: isoDate.nullable(),
    updatedAt: isoDate,
    heroImage: z.string(),
    heroAlt: z.string(),
  })
  .refine((d) => !d.clinicallyReviewed || d.reviewedAt, {
    message: "Set reviewedAt when clinicallyReviewed is true",
    path: ["reviewedAt"],
  })
  .refine((d) => d.cluster !== "condition" || d.bodyArea, {
    message: "Condition pages need a bodyArea",
    path: ["bodyArea"],
  });

export type Frontmatter = z.infer<typeof pageSchema>;
export type Cluster = Frontmatter["cluster"];

// Frontmatter for P2 resource articles (promptP2.md section 8). Same review gate as the P1 pages.
export const resourceSchema = z
  .object({
    slug,
    title: z.string(),
    metaTitle: z.string().max(60),
    metaDescription: z.string().max(155),
    h1: z.string(),
    /** What the article is about, for Article.about. */
    about: z.string(),
    cluster: z.literal("resource"),
    topic: z.enum(["first-visit", "pain", "recovery", "at-home"]),
    summary: z.string(),
    /** Commercial pages the article links to early and at the end. */
    destinations: z.array(z.string().regex(/^\//)).min(1),
    datePublished: isoDate,
    readingMinutes: z.number().int().positive(),
    clinicallyReviewed: z.boolean(),
    reviewedBy: z.literal("dr-nileema-chaudhary"),
    reviewedAt: isoDate.nullable(),
    updatedAt: isoDate,
  })
  .refine((d) => !d.clinicallyReviewed || d.reviewedAt, {
    message: "Set reviewedAt when clinicallyReviewed is true",
    path: ["reviewedAt"],
  });

export type ResourceFrontmatter = z.infer<typeof resourceSchema>;
