import type { ContentPage } from "@/lib/content";
import { publishable } from "@/lib/publishable";
import { routes } from "./routes";

// Breadcrumbs follow the patient's journey, not the flat URL (promptP1.md section 8).
// Once a hub is publishable (promptP2.md section 5) pages point at it; until then they keep the P1 parent.
const specialty = {
  orthopedic: routes.ortho,
  neuro: routes.neuro,
  physiotherapy: routes.physiotherapy,
};

export const crumbParent: Record<
  ContentPage["cluster"],
  (p: ContentPage) => { name: string; path: string }
> = {
  condition: (p) =>
    publishable.conditionsHub ? routes.conditions : specialty[p.relatedService],
  rehab: () =>
    publishable.rehabHub ? routes.rehabilitation : routes.physiotherapy,
  sports: () =>
    publishable.rehabHub ? routes.rehabilitation : routes.physiotherapy,
  "service-local": () => routes.local,
};

export const specialtyRoute = (p: ContentPage) => specialty[p.relatedService];
