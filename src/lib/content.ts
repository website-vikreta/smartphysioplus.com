import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { flags } from "../content/flags.ts";
import { type Frontmatter, pageSchema } from "../content/schema.ts";

// P1 MDX collections (promptP1.md section 3). Relative .ts imports so scripts can load this with plain Node.
// "resources" joins in P2.
const COLLECTIONS = ["conditions", "rehabilitation"];

export type ContentPage = Frontmatter & { body: string; file: string };

function load(): ContentPage[] {
  const pages = COLLECTIONS.flatMap((dir) =>
    readdirSync(join(process.cwd(), "src/content", dir))
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => {
        const file = `src/content/${dir}/${f}`;
        const { data, content } = matter(
          readFileSync(join(process.cwd(), file), "utf8"),
        );
        const r = pageSchema.safeParse(data);
        if (!r.success) throw new Error(`${file}\n${z.prettifyError(r.error)}`);
        if (`${r.data.slug}.mdx` !== f)
          throw new Error(`${file}: slug must match the file name`);
        return { ...r.data, body: content, file };
      }),
  );
  const slugs = new Set(pages.map((p) => p.slug));
  for (const p of pages)
    for (const s of [...p.relatedConditions, ...p.relatedRehab])
      if (!slugs.has(s))
        throw new Error(`${p.file}: unknown related page "${s}"`);
  return pages;
}

export const allPages = load();

/** Generated at all: no flag, or its flag is on. */
export const isBuilt = (p: ContentPage) => !p.flag || flags[p.flag];
/** Indexed, in the sitemap and linkable: built and clinically reviewed. */
export const isLive = (p: ContentPage) => isBuilt(p) && p.clinicallyReviewed;

export const builtPages = allPages.filter(isBuilt);
export const livePages = allPages.filter(isLive);

export const getPage = (slug: string) => allPages.find((p) => p.slug === slug);
export const pagePath = (slug: string) => `/${slug}/`;

/** `slug` may carry a #hash. Returns the page link when it is live, else `fallback`. */
export function liveHref(slug: string, fallback: string) {
  const [s, hash] = slug.split("#");
  const p = getPage(s);
  return p && isLive(p) ? pagePath(s) + (hash ? `#${hash}` : "") : fallback;
}

export const reviewState = (p: ContentPage) =>
  !isBuilt(p) ? "off (flag)" : isLive(p) ? "live" : "draft";
