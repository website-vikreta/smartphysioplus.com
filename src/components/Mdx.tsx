import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { clinic } from "@/content/clinic";
import { flags } from "@/content/flags";
import { formatHours } from "@/lib/format";
import { getPage, isLive, pagePath } from "@/lib/content";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";
import { TrackView } from "./TrackView";

const text = (n: ReactNode): string =>
  typeof n === "string" || typeof n === "number"
    ? String(n)
    : Array.isArray(n)
      ? n.map(text).join("")
      : "";
// Stable ids from heading text, so "### Tailbone pain" is linkable as #tailbone-pain.
const slugify = (n: ReactNode) =>
  text(n)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const linkCls = "text-sp-blue-700 underline";

/** Links to another P1 page only when it is live; otherwise plain text (promptP1.md rule 3). */
function PageLink({ slug, children }: { slug: string; children: ReactNode }) {
  const p = getPage(slug);
  if (!p) throw new Error(`PageLink: unknown page "${slug}"`);
  return isLive(p) ? (
    <Link href={pagePath(slug)} className={linkCls}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
}

/** Content that shows only once the client confirms the fact. Add a TODO-CONFIRM comment beside each use. */
function Flagged({
  flag,
  children,
}: {
  flag: keyof typeof flags;
  children: ReactNode;
}) {
  return flags[flag] ? <>{children}</> : null;
}

/** "See a doctor first" box. Clinically reviewed with the page. */
function RedFlags({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <TrackView event="red_flag_box_view" params={{ slug }}>
      <aside
        aria-labelledby={`red-flags-${slug}`}
        className="my-6 rounded-2xl border-2 border-sp-blue-900 bg-sp-white p-5"
      >
        <p
          id={`red-flags-${slug}`}
          className="flex items-center gap-2 font-semibold text-sp-blue-900"
        >
          <Icon name="shield" className="size-5 shrink-0" />
          See a doctor first, or urgently, if you have:
        </p>
        <div className="mt-2 [&_ul]:mt-0">{children}</div>
      </aside>
    </TrackView>
  );
}

/** Address, hours and directions from clinic.ts (NAP lives only there). */
function ClinicAddress() {
  const a = clinic.address;
  return (
    <div className="sp-card my-6">
      <address className="not-italic">
        {a.street}
        <br />
        {a.locality}, {a.city}, {a.region} {a.postalCode}
      </address>
      <p className="mt-2">{formatHours()}</p>
      <ButtonLink
        href={clinic.google.directionsUrl}
        icon="pin"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4"
      >
        Get directions
      </ButtonLink>
    </div>
  );
}

export const mdxComponents = {
  h2: ({ children }: ComponentProps<"h2">) => (
    <h2
      id={slugify(children)}
      className="mt-12 scroll-mt-24 text-2xl font-semibold text-sp-blue-900 first:mt-0 md:text-3xl"
    >
      {children}
    </h2>
  ),
  h3: ({ children }: ComponentProps<"h3">) => (
    <h3
      id={slugify(children)}
      className="mt-8 scroll-mt-24 text-xl font-semibold text-sp-blue-900"
    >
      {children}
    </h3>
  ),
  p: (p: ComponentProps<"p">) => <p className="mt-4" {...p} />,
  ul: (p: ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-6" {...p} />
  ),
  ol: (p: ComponentProps<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6" {...p} />
  ),
  a: ({ href = "", ...p }: ComponentProps<"a">) => (
    <Link href={href} className={linkCls} {...p} />
  ),
  strong: (p: ComponentProps<"strong">) => (
    <strong className="font-semibold text-sp-blue-900" {...p} />
  ),
  PageLink,
  Flagged,
  ClinicAddress,
  RedFlags,
};
