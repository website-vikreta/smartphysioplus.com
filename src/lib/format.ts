import { clinic } from "@/content/clinic";

const DAY_NAMES: Record<string, string> = {
  Mo: "Mon",
  Tu: "Tue",
  We: "Wed",
  Th: "Thu",
  Fr: "Fri",
  Sa: "Sat",
  Su: "Sun",
};

const to12h = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${suffix}`;
};

// e.g. "Mon-Sat, 10am-8pm"
export function formatHours() {
  const { days, opens, closes } = clinic.hours[0];
  return `${DAY_NAMES[days[0]]}–${DAY_NAMES[days[days.length - 1]]}, ${to12h(opens)}–${to12h(closes)}`;
}

export const WHATSAPP_MESSAGE =
  "Hi, I found Smart Physio+ on your website and want to book an assessment.";

export const whatsappLink = (text = WHATSAPP_MESSAGE) =>
  `${clinic.whatsapp}?text=${encodeURIComponent(text)}`;
