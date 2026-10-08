"use server";

import { clinic } from "@/content/clinic";
import { db } from "@/lib/db";
import { clientIp, rateLimited, verifyTurnstile } from "@/lib/guard";
import { sendEmails } from "@/lib/notify";
import { bookingSchema, cleanPhone, enquirySchema } from "@/lib/schemas";
import {
  DEFAULT_SLOT_MINUTES,
  formatSlot,
  isValidSlot,
  toInstant,
} from "@/lib/slots";

export type ActionResult = { ok: true } | { ok: false; error: string };

const MIN_FILL_MS = 4000;
const callUs = `Please call ${clinic.phone.display} or message us on WhatsApp instead.`;

const toE164 = (p: string) => {
  const d = cleanPhone(p).replace(/^\+?(91|0)/, "");
  return `+91${d.slice(-10)}`;
};

// Shared bot and abuse checks. Returns an error string, "bot" (pretend success), or null.
async function guard(input: {
  website: string;
  startedAt: number;
  turnstileToken: string;
}) {
  if (input.website) return "bot";
  if (Date.now() - input.startedAt < MIN_FILL_MS)
    return "That was very quick. Please check your details and try again.";
  const ip = await clientIp();
  if (rateLimited(ip)) return "Too many requests. Please try again later.";
  if (!(await verifyTurnstile(input.turnstileToken, ip)))
    return "Verification failed. Please refresh and try again.";
  return null;
}

// Without a database in production the request would be lost, so fail loudly instead.
const noDb = (): ActionResult => {
  if (process.env.NODE_ENV === "production")
    return {
      ok: false,
      error: `Booking is temporarily unavailable. ${callUs}`,
    };
  console.info(
    "[dev] Supabase not configured; request validated but not stored.",
  );
  return { ok: true };
};

export async function submitBooking(raw: unknown): Promise<ActionResult> {
  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success)
    return { ok: false, error: "Please check the form and try again." };
  const d = parsed.data;

  const blocked = await guard(d);
  if (blocked === "bot") return { ok: true };
  if (blocked) return { ok: false, error: blocked };

  const slot = Number(process.env.SLOT_MINUTES) || DEFAULT_SLOT_MINUTES;
  if (!isValidSlot(d.date, d.time, slot))
    return {
      ok: false,
      error: "That time is no longer available. Please pick another.",
    };

  const client = db();
  if (!client) return noDb();

  const phone = toE164(d.phone);
  const { error } = await client.from("appointment_requests").insert({
    full_name: d.fullName,
    phone,
    email: d.email || null,
    concern: d.concern,
    preferred_start: toInstant(d.date, d.time).toISOString(),
    first_visit: d.firstVisit === "yes",
    note: d.note || null,
    consent_at: new Date().toISOString(),
  });
  if (error) {
    console.error("Booking insert failed", error.message);
    return { ok: false, error: `Something went wrong. ${callUs}` };
  }

  await sendEmails({
    subject: `New appointment request: ${d.fullName}`,
    patientPhoneE164: phone,
    patientEmail: d.email || undefined,
    lines: [
      ["Name", d.fullName],
      ["Phone", phone],
      ["Concern", d.concern],
      ["Preferred time", formatSlot(d.date, d.time)],
      ["First visit", d.firstVisit],
      ["Note", d.note || "-"],
    ],
  });
  return { ok: true };
}

export async function submitEnquiry(raw: unknown): Promise<ActionResult> {
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success)
    return { ok: false, error: "Please check the form and try again." };
  const d = parsed.data;

  const blocked = await guard(d);
  if (blocked === "bot") return { ok: true };
  if (blocked) return { ok: false, error: blocked };

  const client = db();
  if (!client) return noDb();

  const phone = toE164(d.phone);
  const { error } = await client.from("enquiries").insert({
    name: d.name,
    phone,
    message: d.message,
    consent_at: new Date().toISOString(),
  });
  if (error) {
    console.error("Enquiry insert failed", error.message);
    return { ok: false, error: `Something went wrong. ${callUs}` };
  }

  await sendEmails({
    subject: `New enquiry: ${d.name}`,
    patientPhoneE164: phone,
    lines: [
      ["Name", d.name],
      ["Phone", phone],
      ["Message", d.message],
    ],
  });
  return { ok: true };
}
