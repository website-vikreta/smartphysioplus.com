import Link from "next/link";
import type { Service, ServiceGroup } from "@/content/services";
import { Icon, IconBadge, type IconName } from "./Icon";

const parts: Record<
  ServiceGroup,
  { id: string; icon: IconName; intro: string }
> = {
  "Manual therapy": {
    id: "manual-therapy",
    icon: "hands",
    intro:
      "Hands-on treatment and guided exercise. Your therapist chooses what fits after your assessment.",
  },
  Technology: {
    id: "technology",
    icon: "bolt",
    intro: "Machines are used only when your assessment supports them.",
  },
  "Conditions and care": {
    id: "conditions-and-care",
    icon: "heart",
    intro: "Areas and specialities we see. Each links to more detail.",
  },
};

// Manual therapy and Technology as cards; conditions and specialities as a compact link list.
export function ServiceGrid({
  services,
  groups,
}: {
  services: Service[];
  groups: ServiceGroup[];
}) {
  return (
    <div className="grid gap-14">
      {groups.map((g) => {
        const items = services.filter((s) => s.group === g);
        if (!items.length) return null;
        const { id, icon, intro } = parts[g];
        return (
          <section
            key={g}
            id={id}
            aria-labelledby={`${id}-h`}
            className="scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <IconBadge name={icon} />
              <h2
                id={`${id}-h`}
                className="text-2xl font-semibold text-sp-blue-900 md:text-3xl"
              >
                {g}
              </h2>
            </div>
            <p className="mt-3 max-w-2xl">{intro}</p>
            {g === "Conditions and care" ? (
              <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <li key={s.name}>
                    <Link
                      href={s.href}
                      className="inline-flex min-h-11 items-center gap-1 text-sp-blue-700 underline"
                    >
                      {s.name}
                      <Icon name="arrow" className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <li
                    key={s.name}
                    className="sp-card sp-card-link flex flex-col"
                  >
                    <h3 className="text-lg font-semibold text-sp-blue-900">
                      {s.name}
                    </h3>
                    <p className="mt-1 flex-1 text-sm">{s.blurb}</p>
                    <Link
                      href={s.href}
                      className="mt-3 inline-flex min-h-11 items-center gap-1 text-sp-blue-700 underline"
                    >
                      Learn more<span className="sr-only"> about {s.name}</span>
                      <Icon name="arrow" className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
