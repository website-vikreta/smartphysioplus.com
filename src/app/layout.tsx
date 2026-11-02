import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header, type NavItem } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileActionBar } from "@/components/MobileActionBar";
import { TopBar } from "@/components/TopBar";
import { clinic } from "@/content/clinic";
import { routes } from "@/content/routes";
import { resolveHref } from "@/content/futureRoutes";
import { conditionAreas } from "@/content/services";
import { publishable } from "@/lib/publishable";
import { liveResources, resourcePath } from "@/lib/resources";
import { siteSchema } from "@/lib/schema";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(clinic.domain),
  title: `Physiotherapy in Balewadi, Pune | ${clinic.brandName}`,
  description:
    "Advanced robotic physiotherapy in Balewadi, Pune for back, neck and joint pain. Assessment-led plans with Dr. Nileema Chaudhary. Book or call today.",
};

// Main navigation: Home, About Us, Conditions we treat, Services, More (FAQs, Blog), Contact.
// FAQs and Blog follow src/lib/publishable.ts: a page that isn't live is never linked.
const more: NavItem[] = [
  ...(publishable.faqs ? [{ label: "FAQs", href: routes.faqs.path }] : []),
  ...(publishable.resourcesIndex
    ? [
        {
          label: "Blog",
          href: routes.resources.path,
          children: liveResources.map((r) => ({
            label: r.title,
            href: resourcePath(r.slug),
          })),
        },
      ]
    : []),
];

const navItems: NavItem[] = [
  { label: "Home", href: routes.home.path },
  { label: "About Us", href: routes.about.path },
  {
    label: "Conditions we treat",
    href: publishable.conditionsHub ? routes.conditions.path : "/#conditions",
    children: conditionAreas.map((a) => ({
      label: a.label,
      href: resolveHref(a.href),
    })),
  },
  {
    label: "Services",
    href: routes.services.path,
    children: [
      { label: "Technology", href: `${routes.services.path}#technology` },
      {
        label: "Manual therapy",
        href: `${routes.services.path}#manual-therapy`,
      },
    ],
  },
  ...(more.length ? [{ label: "More", children: more }] : []),
  { label: "Contact", href: routes.contact.path },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-sp-white focus:p-3"
        >
          Skip to content
        </a>
        <TopBar />
        <Header items={navItems} />
        {children}
        <Footer />
        <MobileActionBar />
        <Analytics />
        {siteSchema().map((d) => (
          <JsonLd key={d["@type"].toString()} data={d} />
        ))}
      </body>
    </html>
  );
}
