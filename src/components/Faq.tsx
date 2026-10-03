import type { Faq as FaqItem } from "@/content/faq";
import { Icon } from "./Icon";
import { JsonLd } from "./JsonLd";

// FAQPage schema is only emitted for Q&A that is visible on the page.
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <>
      <div className="grid max-w-3xl gap-3">
        {items.map((f) => (
          <details key={f.q} className="sp-card group !p-0">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-medium text-sp-blue-900">
              {f.q}
              <Icon
                name="chevron"
                className="size-5 shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="px-5 pb-4">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
