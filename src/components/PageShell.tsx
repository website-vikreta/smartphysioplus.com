import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { CtaBand } from "./CtaBand";

type Props = {
  crumbs?: { name: string; path: string }[];
  children: ReactNode;
};

// Every indexable page: breadcrumbs (except Home), main content, CTA band.
export function PageShell({ crumbs, children }: Props) {
  return (
    <>
      {crumbs && <Breadcrumbs items={crumbs} />}
      <main id="main" className="flex-1">
        {children}
      </main>
      <CtaBand />
    </>
  );
}

export function Section({
  id,
  title,
  intro,
  children,
  tint,
}: {
  id?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  tint?: boolean;
}) {
  return (
    <section id={id} className={tint ? "bg-sp-white" : undefined}>
      <div className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 md:py-16">
        {title && (
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-semibold text-sp-blue-900 md:text-3xl">
              {title}
            </h2>
            <span
              className="mt-3 block h-1 w-12 rounded-full bg-sp-teal-500"
              aria-hidden="true"
            />
            {intro && <p className="mt-4 text-lg">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

// Banner at the top of inner pages.
export function PageHeading({
  title,
  intro,
}: {
  title: string;
  intro?: ReactNode;
}) {
  return (
    <div className="sp-band">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 md:pb-14 md:pt-10">
        <h1 className="max-w-3xl text-3xl font-bold text-sp-blue-900 md:text-5xl">
          {title}
        </h1>
        {intro && <div className="mt-4 max-w-2xl text-lg">{intro}</div>}
      </div>
    </div>
  );
}
