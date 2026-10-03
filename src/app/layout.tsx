import type { Metadata } from "next";
import { Figtree, Sora } from "next/font/google";
import { clinic } from "@/content/clinic";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(clinic.domain),
  title: `Physiotherapy in Balewadi, Pune | ${clinic.brandName}`,
  description:
    "Advanced robotic physiotherapy in Balewadi, Pune for back, neck and joint pain. Assessment-led plans with Dr. Nileema Chaudhary. Book or call today.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${figtree.variable}`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
