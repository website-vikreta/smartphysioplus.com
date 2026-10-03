// Appointment slots: next 14 days, Mon-Sat, 10:00-20:00 IST in SLOT_MINUTES steps.
const OPEN = 10 * 60;
const CLOSE = 20 * 60;
const IST_OFFSET_MIN = 330;

export const DEFAULT_SLOT_MINUTES = 45;

export const pad = (n: number) => String(n).padStart(2, "0");

export function istNow(now = Date.now()) {
  const d = new Date(now + IST_OFFSET_MIN * 60_000);
  return {
    date: d.toISOString().slice(0, 10),
    minutes: d.getUTCHours() * 60 + d.getUTCMinutes(),
  };
}

const addDays = (date: string, n: number) => {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

const isSunday = (date: string) =>
  new Date(`${date}T00:00:00Z`).getUTCDay() === 0;

export function bookableDays(now = Date.now()) {
  const today = istNow(now).date;
  return Array.from({ length: 14 }, (_, i) => addDays(today, i)).filter(
    (d) => !isSunday(d),
  );
}

export function timesFor(date: string, slotMinutes: number, now = Date.now()) {
  const today = istNow(now);
  const out: string[] = [];
  for (let m = OPEN; m + slotMinutes <= CLOSE; m += slotMinutes) {
    if (date === today.date && m <= today.minutes) continue; // hide past times today
    out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
  }
  return out;
}

export const isValidSlot = (
  date: string,
  time: string,
  slotMinutes: number,
  now = Date.now(),
) =>
  bookableDays(now).includes(date) &&
  timesFor(date, slotMinutes, now).includes(time);

// Local IST wall-clock to an absolute instant.
export const toInstant = (date: string, time: string) =>
  new Date(`${date}T${time}:00+05:30`);

export const formatSlot = (date: string, time: string) =>
  new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(toInstant(date, time));
