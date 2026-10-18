import Image from "next/image";
import QRCode from "qrcode";
import { PrintControls } from "@/components/PrintControls";
import { clinic } from "@/content/clinic";
import { routes } from "@/content/routes";
import { writeReviewUrl } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Print Review Card | Smart Physio+",
  description: "Printable review card with a QR code for Smart Physio+.",
  path: routes.reviewPrint.path,
  noindex: true,
});

function Card({ qr }: { qr: string }) {
  return (
    <div className="review-card flex flex-col items-center justify-between bg-sp-white p-6 text-center text-sp-blue-900">
      <Image
        src="/brand/logo.png"
        alt={`${clinic.brandName} logo`}
        width={1700}
        height={380}
        className="h-12 w-auto"
      />
      <div>
        <p className="font-display text-2xl font-bold">
          Scan to share your experience
        </p>
        <p className="mt-2 text-sm">
          A Google review helps other people in Pune find the right care.
        </p>
      </div>
      <div
        role="img"
        aria-label="QR code for the Google review form"
        className="w-40 rounded-xl border-4 border-sp-blue-700 bg-sp-white p-2"
        dangerouslySetInnerHTML={{ __html: qr }}
      />
      <p className="text-xs">{clinic.brandName} · Balewadi, Pune</p>
    </div>
  );
}

// The QR code is generated at build time from the review URL in clinic.ts. No data leaves the site.
export default async function ReviewPrintPage() {
  const qr = await QRCode.toString(writeReviewUrl(), {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
  });
  return (
    <main id="main" className="flex-1">
      <div className="print-only-tools mx-auto max-w-3xl px-4 py-6 print:hidden">
        <h1 className="text-2xl font-bold text-sp-blue-900">
          Print the review card
        </h1>
        <p className="mt-2">
          Choose a paper size, then print with margins off and background
          graphics on.
        </p>
        <div className="mt-4">
          <PrintControls />
        </div>
      </div>
      <div className="sheet-a6">
        <Card qr={qr} />
      </div>
      <div className="sheet-a4">
        {[0, 1, 2, 3].map((i) => (
          <Card key={i} qr={qr} />
        ))}
      </div>
    </main>
  );
}
