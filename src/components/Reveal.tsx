import type { ReactNode } from "react";

// Lifts its children in as they scroll into view. CSS only (.sp-reveal in globals.css), so the
// content is in the server HTML at full opacity and never delays the first paint or the LCP.
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`sp-reveal ${className ?? ""}`}>{children}</div>;
}
