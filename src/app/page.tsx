import { CtaBand } from "@/components/CtaBand";
import { clinic } from "@/content/clinic";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `Physiotherapy in Balewadi, Pune | ${clinic.brandName}`,
  description:
    "Advanced robotic physiotherapy in Balewadi, Pune for back, neck and joint pain. Assessment-led plans with Dr. Nileema Chaudhary. Book or call today.",
  path: "/",
});

// Placeholder until Phase 2 (hero + 3D spine).
export default function Home() {
  return (
    <>
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <h1 className="text-3xl font-bold text-sp-blue-900">
          {clinic.brandName}
        </h1>
        <p className="mt-2">{clinic.tagline}. Site under construction.</p>
      </main>
      <CtaBand />
    </>
  );
}
