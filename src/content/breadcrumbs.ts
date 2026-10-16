import type { ContentPage } from "@/lib/content";
import { routes } from "./routes";

// Breadcrumbs follow the patient's journey, not the flat URL (promptP1.md section 8).
// P2: point condition at /conditions/ and rehab/sports at /rehabilitation/ here, in one place.
const specialty = {
  orthopedic: routes.ortho,
  neuro: routes.neuro,
  physiotherapy: routes.physiotherapy,
};

export const crumbParent: Record<
  ContentPage["cluster"],
  (p: ContentPage) => { name: string; path: string }
> = {
  condition: (p) => specialty[p.relatedService],
  rehab: () => routes.physiotherapy,
  sports: () => routes.physiotherapy,
  "service-local": () => routes.local,
};

export const specialtyRoute = (p: ContentPage) => specialty[p.relatedService];
