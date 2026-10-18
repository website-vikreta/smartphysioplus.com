import { Icon, type IconName } from "./Icon";
import { PlaceholderImage } from "./PlaceholderImage";
import { StackCards } from "./StackCards";

const steps = [
  {
    icon: "user" as IconName,
    title: "Assessment",
    body: "Dr. Nileema Chaudhary asks about your pain and history, reviews any scans or reports you bring, and examines how you move. She explains what she finds in plain words.",
  },
  {
    icon: "hands" as IconName,
    title: "Treatment",
    body: "Your plan is personal. It can combine manual therapy with advanced machines such as robotic spine decompression, TECAR, shockwave and laser, when your assessment supports them.",
  },
  {
    icon: "rehab" as IconName,
    title: "Rehabilitation",
    body: "Therapeutic exercise and a personalised exercise plan help you rebuild strength and movement. We check your progress and give you exercises to do at home.",
  },
];

const stepImg = ["leg", "back", "exercise"] as const;

// The three-step journey, shared by Home and the rehabilitation hub.
export function JourneySteps() {
  return (
    <StackCards
      items={steps.map((s, i) => ({
        key: s.title,
        content: (
          <div className="sp-card grid overflow-hidden !p-0 shadow-xl md:grid-cols-2">
            <PlaceholderImage
              name={stepImg[i]}
              alt={`Placeholder photo for ${s.title.toLowerCase()}`}
              className="h-48 w-full object-cover md:h-full md:min-h-72"
            />
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-sp-blue-700 font-display text-lg font-semibold text-sp-white">
                  {i + 1}
                </span>
                <h3 className="flex-1 text-xl font-semibold text-sp-blue-900">
                  {s.title}
                </h3>
                <Icon name={s.icon} className="size-7 text-sp-teal-500" />
              </div>
              <p className="mt-5">{s.body}</p>
            </div>
          </div>
        ),
      }))}
    />
  );
}
