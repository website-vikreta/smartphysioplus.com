import Link from "next/link";
import { routes } from "@/content/routes";

// Small note for every clinical page.
export function DisclaimerNote() {
  return (
    <p className="text-sm text-sp-ink/80">
      This page is general information, not medical advice. Treatment is planned
      after an assessment. Read our{" "}
      <Link
        href={routes.disclaimer.path}
        className="text-sp-blue-700 underline"
      >
        disclaimer
      </Link>
      .
    </p>
  );
}
