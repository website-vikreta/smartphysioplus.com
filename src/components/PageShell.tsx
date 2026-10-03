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
  children,
  tint,
}: {
  id?: string;
  title?: string;
  children: ReactNode;
  tint?: boolean;
}) {
  return (
    <section id={id} className={tint ? "bg-sp-white" : undefined}>
      <div className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10 md:py-14">
        {title && (
          <h2 className="mb-5 text-2xl font-semibold text-sp-blue-900 md:text-3xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

export function PageHeading({
  title,
  intro,
}: {
  title: string;
  intro?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-4 pt-6">
      <h1 className="max-w-3xl text-3xl font-bold text-sp-blue-900 md:text-4xl">
        {title}
      </h1>
      {intro && <div className="mt-4 max-w-2xl text-lg">{intro}</div>}
    </div>
  );
}
