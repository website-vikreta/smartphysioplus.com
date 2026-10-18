import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { type ResourceFrontmatter, resourceSchema } from "../content/schema.ts";

// P2 resource articles (promptP2.md section 8). Same loader pattern as src/lib/content.ts.
export type Resource = ResourceFrontmatter & { body: string; file: string };

// 800 to 1,400 words, and every commercial destination linked in the body; the first one early and again at the end.
// A destination is linked as a markdown link, <PageLink slug="x"> or <Hub to="x">.
function check(file: string, d: ResourceFrontmatter, body: string) {
  const words = body
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .split(/\s+/)
    .filter((w) => /[a-z0-9]/i.test(w)).length;
  if (words < 800 || words > 1400)
    throw new Error(`${file}: ${words} words, expected 800 to 1,400`);
  const count = (dest: string) => {
    const key = dest.replaceAll("/", "");
    return (
      body.split(`](${dest})`).length - 1 + body.split(`"${key}"`).length - 1
    );
  };
  for (const dest of d.destinations)
    if (count(dest) < 1) throw new Error(`${file}: no link to ${dest}`);
  if (count(d.destinations[0]) < 2)
    throw new Error(
      `${file}: link to ${d.destinations[0]} early and at the end`,
    );
}

const dir = join(process.cwd(), "src/content/resources");

export const allResources: Resource[] = readdirSync(dir)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => {
    const file = `src/content/resources/${f}`;
    const { data, content } = matter(readFileSync(join(dir, f), "utf8"));
    const r = resourceSchema.safeParse(data);
    if (!r.success) throw new Error(`${file}\n${z.prettifyError(r.error)}`);
    if (`${r.data.slug}.mdx` !== f)
      throw new Error(`${file}: slug must match the file name`);
    check(file, r.data, content);
    return { ...r.data, body: content, file };
  });

/** Indexed, in the sitemap and linkable: clinically reviewed. */
export const isResourceLive = (r: Resource) => r.clinicallyReviewed;
export const liveResources = allResources.filter(isResourceLive);
export const resourcePath = (slug: string) => `/resources/${slug}/`;
