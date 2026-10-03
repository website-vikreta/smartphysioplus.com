import { clinic } from "@/content/clinic";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold text-sp-blue-900">
        {clinic.brandName}
      </h1>
      <p>{clinic.tagline}. Site under construction.</p>
    </main>
  );
}
