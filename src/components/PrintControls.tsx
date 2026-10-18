"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

// Picks the paper (one A6 card or an A4 sheet of four), sets the @page size and prints.
export function PrintControls() {
  const [sheet, setSheet] = useState<"a6" | "a4">("a6");
  const print = () => {
    track("review_qr_print", { sheet });
    window.print();
  };
  return (
    <div className="print:hidden">
      <style>{`@page { size: ${sheet === "a6" ? "A6" : "A4"}; margin: 0 }
.sheet-a6 { display: ${sheet === "a6" ? "flex" : "none"}; justify-content: center }
.sheet-a4 { display: ${sheet === "a4" ? "grid" : "none"}; grid-template-columns: repeat(2, 105mm); justify-content: center }
.review-card { box-sizing: border-box; width: 105mm; height: 148mm; border: 1px dashed #8fc4cb }
@media print {
  * { print-color-adjust: exact; -webkit-print-color-adjust: exact }
  body > *:not(main) { display: none !important }
  main { padding: 0 !important }
  .print-only-tools { display: none !important }
  .review-card { border: 0 }
}`}</style>
      <fieldset className="flex flex-wrap items-center gap-4">
        <legend className="sr-only">Paper size</legend>
        {(
          [
            ["a6", "One A6 card"],
            ["a4", "A4 sheet of four cards"],
          ] as const
        ).map(([id, label]) => (
          <label key={id} className="inline-flex min-h-12 items-center gap-2">
            <input
              type="radio"
              name="sheet"
              checked={sheet === id}
              onChange={() => setSheet(id)}
            />
            {label}
          </label>
        ))}
        <button
          type="button"
          onClick={print}
          className="sp-btn sp-btn-line inline-flex min-h-12 items-center px-6 font-medium"
        >
          Print
        </button>
      </fieldset>
    </div>
  );
}
