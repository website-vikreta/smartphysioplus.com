"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { submitBooking } from "@/app/actions";
import { regions } from "@/content/regions";
import { routes } from "@/content/routes";
import { track } from "@/lib/analytics";
import { whatsappLink } from "@/lib/format";
import {
  bookingSchema,
  CONCERNS,
  type BookingInput,
  type Concern,
} from "@/lib/schemas";
import { bookableDays, formatSlot, timesFor, toInstant } from "@/lib/slots";
import { cn } from "@/lib/utils";
import { Turnstile } from "./Turnstile";

const STORAGE = "sp_booking";
const STEP_FIELDS: (keyof BookingInput)[][] = [
  ["concern"],
  ["date", "time"],
  ["fullName", "phone", "email", "note", "consent"],
  [],
];
const TITLES = [
  "What is bothering you?",
  "Pick a preferred day and time",
  "Your details",
  "Review and send",
];

const concernLabel = (c: Concern) =>
  c === "not_sure"
    ? "Not sure, I need an assessment"
    : (regions.find((r) => r.id === c)?.name ?? c);

const pill = (on: boolean) =>
  cn(
    "min-h-12 rounded-full border-2 border-sp-blue-700 px-4 font-medium",
    on
      ? "bg-sp-blue-700 text-sp-white"
      : "bg-sp-white text-sp-blue-900 hover:bg-sp-teal-100",
  );
const input =
  "mt-1 block min-h-12 w-full rounded-xl border-2 border-sp-blue-900/40 bg-sp-white px-3";

const dayLabel = (d: string) =>
  new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(`${d}T00:00:00Z`));

function icsFile(date: string, time: string, minutes: number) {
  const start = toInstant(date, time);
  const end = new Date(start.getTime() + minutes * 60_000);
  const f = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const text = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Smart Physio+//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${f(start)}@smartphysioplus.com`,
    `DTSTAMP:${f(new Date())}`,
    `DTSTART:${f(start)}`,
    `DTEND:${f(end)}`,
    "SUMMARY:Smart Physio+ appointment (pending confirmation)",
    "STATUS:TENTATIVE",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return URL.createObjectURL(new Blob([text], { type: "text/calendar" }));
}

export function BookingStepper({ slotMinutes }: { slotMinutes: number }) {
  const params = useSearchParams();
  const startedAt = useRef(0);
  const started = useRef(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{
    date: string;
    time: string;
    name: string;
    concern: Concern;
  } | null>(null);
  const [pending, startTransition] = useTransition();

  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      concern: undefined,
      date: "",
      time: "",
      fullName: "",
      phone: "",
      email: "",
      firstVisit: "yes",
      note: "",
      consent: false,
      startedAt: 0,
      website: "",
      turnstileToken: "",
    },
  });
  const { register, watch, setValue, trigger, handleSubmit, formState } = form;
  const v = watch();

  // Restore saved answers, then let ?concern= prefill the first step.
  useEffect(() => {
    startedAt.current = Date.now();
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE) ?? "null");
      if (saved)
        form.reset({
          ...saved,
          consent: false,
          turnstileToken: "",
          website: "",
          startedAt: 0,
        });
    } catch {
      // Ignore unreadable saved state.
    }
    const c = params.get("concern");
    if (c && (CONCERNS as readonly string[]).includes(c))
      setValue("concern", c as Concern);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const sub = watch((vals) => {
      try {
        const {
          consent: _c,
          turnstileToken: _t,
          website: _w,
          startedAt: _s,
          ...keep
        } = vals;
        sessionStorage.setItem(STORAGE, JSON.stringify(keep));
      } catch {
        // Storage may be blocked.
      }
    });
    return () => sub.unsubscribe();
  }, [watch]);

  const onToken = useCallback(
    (t: string) => setValue("turnstileToken", t),
    [setValue],
  );
  const days = useMemo(() => (step === 1 ? bookableDays() : []), [step]);
  const times = useMemo(
    () => (v.date ? timesFor(v.date, slotMinutes) : []),
    [v.date, slotMinutes],
  );

  const begin = () => {
    if (!started.current) {
      started.current = true;
      track("booking_start");
    }
  };

  const next = async () => {
    const ok = await trigger(STEP_FIELDS[step]);
    if (ok) setStep((s) => s + 1);
  };

  const submit = handleSubmit((vals) => {
    setError("");
    startTransition(async () => {
      const res = await submitBooking({
        ...vals,
        startedAt: startedAt.current,
      });
      if (res.ok) {
        track("booking_submit", { concern: vals.concern });
        try {
          sessionStorage.removeItem(STORAGE);
        } catch {
          // Ignore.
        }
        setDone({
          date: vals.date,
          time: vals.time,
          name: vals.fullName,
          concern: vals.concern,
        });
      } else {
        setError(res.error);
      }
    });
  });

  if (done) {
    const when = formatSlot(done.date, done.time);
    return (
      <div
        className="max-w-xl rounded-3xl border-2 border-sp-blue-700 bg-sp-white p-6"
        role="status"
      >
        {/* Success state must not be indexed. */}
        <meta name="robots" content="noindex" />
        <h2 className="text-2xl font-semibold text-sp-blue-900">
          <span aria-hidden="true">&#10003; </span>Request sent
        </h2>
        <p className="mt-2">
          We will confirm on WhatsApp or call you shortly. Your preferred time:{" "}
          {when}.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-sp-blue-700 px-5 font-medium text-sp-white hover:bg-sp-blue-900"
            href={whatsappLink(
              `Hi, I just sent an appointment request on your website for ${when} (${concernLabel(done.concern)}). My name is ${done.name}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Message us on WhatsApp now
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-sp-blue-700 px-5 font-medium text-sp-blue-900 hover:bg-sp-teal-100"
            href={icsFile(done.date, done.time, slotMinutes)}
            download="smart-physio-appointment.ics"
          >
            Add to calendar (pending confirmation)
          </a>
        </div>
      </div>
    );
  }

  const err = formState.errors;

  return (
    <form
      onSubmit={submit}
      onChange={begin}
      noValidate
      className="sp-card max-w-2xl !p-6 md:!p-8"
    >
      <p className="text-sm">
        Step {step + 1} of {TITLES.length}
      </p>
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={TITLES.length}
        aria-valuenow={step + 1}
        aria-label="Booking progress"
        className="mt-2 h-2 overflow-hidden rounded-full bg-sp-teal-100"
      >
        <div
          className="h-full rounded-full bg-sp-blue-700 transition-[width] duration-300"
          style={{ width: `${((step + 1) / TITLES.length) * 100}%` }}
        />
      </div>
      <h2 className="mt-1 text-2xl font-semibold text-sp-blue-900">
        {TITLES[step]}
      </h2>

      {step === 0 && (
        <fieldset className="mt-4">
          <legend className="sr-only">What is bothering you?</legend>
          <div className="flex flex-wrap gap-2">
            {[...CONCERNS].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={v.concern === c}
                className={pill(v.concern === c)}
                onClick={() => {
                  begin();
                  setValue("concern", c, { shouldValidate: true });
                }}
              >
                {concernLabel(c)}
              </button>
            ))}
          </div>
          {err.concern && (
            <p role="alert" className="mt-2 text-red-800">
              {err.concern.message}
            </p>
          )}
        </fieldset>
      )}

      {step === 1 && (
        <div className="mt-4 space-y-4">
          <fieldset>
            <legend className="font-medium">Preferred day</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {days.map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={v.date === d}
                  className={pill(v.date === d)}
                  onClick={() => {
                    setValue("date", d, { shouldValidate: true });
                    setValue("time", "");
                  }}
                >
                  {dayLabel(d)}
                </button>
              ))}
            </div>
            {err.date && (
              <p role="alert" className="mt-2 text-red-800">
                {err.date.message}
              </p>
            )}
          </fieldset>
          {v.date && (
            <fieldset>
              <legend className="font-medium">Preferred time (IST)</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {times.length === 0 && (
                  <p>No times left that day. Please pick another day.</p>
                )}
                {times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={v.time === t}
                    className={pill(v.time === t)}
                    onClick={() =>
                      setValue("time", t, { shouldValidate: true })
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
              {err.time && (
                <p role="alert" className="mt-2 text-red-800">
                  {err.time.message}
                </p>
              )}
            </fieldset>
          )}
          <p className="text-sm">
            This is your preferred time. We will confirm the exact time with
            you.
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="mt-4 space-y-4">
          <label className="block">
            Full name
            <input
              className={input}
              autoComplete="name"
              {...register("fullName")}
            />
            {err.fullName && (
              <span role="alert" className="text-red-800">
                {err.fullName.message}
              </span>
            )}
          </label>
          <label className="block">
            Mobile number
            <input
              className={input}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              {...register("phone")}
            />
            {err.phone && (
              <span role="alert" className="text-red-800">
                {err.phone.message}
              </span>
            )}
          </label>
          <label className="block">
            Email (optional)
            <input
              className={input}
              type="email"
              autoComplete="email"
              {...register("email")}
            />
            {err.email && (
              <span role="alert" className="text-red-800">
                {err.email.message}
              </span>
            )}
          </label>
          <fieldset>
            <legend>Is this your first visit?</legend>
            <div className="mt-1 flex gap-6">
              <label className="inline-flex min-h-12 items-center gap-2">
                <input type="radio" value="yes" {...register("firstVisit")} />{" "}
                Yes
              </label>
              <label className="inline-flex min-h-12 items-center gap-2">
                <input type="radio" value="no" {...register("firstVisit")} /> No
              </label>
            </div>
          </fieldset>
          <label className="block">
            Note (optional)
            <textarea
              className={`${input} min-h-24`}
              maxLength={500}
              {...register("note")}
            />
            <span className="text-sm">
              Please do not share detailed medical history here. We will ask at
              your visit.
            </span>
          </label>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1 size-5"
              {...register("consent")}
            />
            <span>
              I agree to the{" "}
              <Link
                href={routes.privacy.path}
                className="text-sp-blue-700 underline"
                target="_blank"
              >
                privacy policy
              </Link>{" "}
              and consent to Smart Physio+ using these details to contact me
              about my appointment, as described under India&apos;s Digital
              Personal Data Protection Act.
            </span>
          </label>
          {err.consent && (
            <p role="alert" className="text-red-800">
              {err.consent.message}
            </p>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="mt-4 space-y-4">
          <dl className="sp-card grid gap-2 sm:grid-cols-[10rem_1fr]">
            <dt className="font-medium">Concern</dt>
            <dd>{v.concern && concernLabel(v.concern)}</dd>
            <dt className="font-medium">Preferred time</dt>
            <dd>{v.date && v.time && formatSlot(v.date, v.time)}</dd>
            <dt className="font-medium">Name</dt>
            <dd>{v.fullName}</dd>
            <dt className="font-medium">Mobile</dt>
            <dd>{v.phone}</dd>
          </dl>
          {/* Honeypot: hidden from people, visible to bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label>
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </label>
          </div>
          <Turnstile onToken={onToken} />
        </div>
      )}

      <div aria-live="polite" className="mt-4 text-red-800">
        {error}
      </div>

      <div className="mt-6 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            className={pill(false)}
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </button>
        )}
        {step < TITLES.length - 1 ? (
          <button type="button" className={pill(true)} onClick={next}>
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={pending}
            className={cn(pill(true), "disabled:opacity-60")}
          >
            {pending ? "Sending..." : "Send request"}
          </button>
        )}
      </div>
    </form>
  );
}
