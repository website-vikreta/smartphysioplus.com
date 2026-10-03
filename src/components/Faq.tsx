import type { Faq as FaqItem } from "@/content/faq";
import { JsonLd } from "./JsonLd";

// FAQPage schema is only emitted for Q&A that is visible on the page.
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <>
      <div className="max-w-3xl divide-y divide-sp-teal-100 border-y border-sp-teal-100">
        {items.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="cursor-pointer list-none font-medium text-sp-blue-900">
              {f.q}
            </summary>
            <p className="mt-2">{f.a}</p>
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
