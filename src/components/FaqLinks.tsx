import Link from "next/link";
import { routes } from "@/content/routes";
import { liveFaqs } from "@/content/faqs";
import { publishable } from "@/lib/publishable";

// Deep links into /faqs/, the one home for these answers (promptP2.md rule 4). Renders nothing until /faqs/ is live.
export function FaqLinks({ ids }: { ids: string[] }) {
  if (!publishable.faqs) return null;
  const items = ids.map((id) => liveFaqs.find((f) => f.id === id)!);
  return (
    <div>
      <ul className="grid max-w-3xl gap-2">
        {items.map((f) => (
          <li key={f.id}>
            <Link
              href={`${routes.faqs.path}#${f.id}`}
              className="inline-flex min-h-11 items-center text-sp-blue-700 underline"
            >
              {f.question}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-3">
        <Link href={routes.faqs.path} className="text-sp-blue-700 underline">
          See all questions patients ask us
        </Link>
      </p>
    </div>
  );
}
