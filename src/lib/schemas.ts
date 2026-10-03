import { z } from "zod";

// Shared by the client forms and the server actions.
export const CONCERNS = [
  "cervical",
  "thoracic",
  "lumbar",
  "sacral",
  "joints",
  "not_sure",
] as const;
export type Concern = (typeof CONCERNS)[number];

export const cleanPhone = (v: string) => v.replace(/[\s-]/g, "");

// Indian mobile numbers: optional +91 / 91 / 0 prefix, then 10 digits starting 6-9.
const phone = z
  .string()
  .trim()
  .refine(
    (v) => /^(?:\+?91|0)?[6-9]\d{9}$/.test(cleanPhone(v)),
    "Enter a valid 10-digit mobile number",
  );

const consent = z
  .boolean()
  .refine((v) => v === true, "Please tick the box to continue");

export const bookingSchema = z.object({
  concern: z.enum(CONCERNS, { error: "Choose what is bothering you" }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a preferred day"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Pick a preferred time"),
  fullName: z.string().trim().min(2, "Enter your name").max(80),
  phone,
  email: z.union([z.literal(""), z.email("Enter a valid email")]),
  firstVisit: z.enum(["yes", "no"]),
  note: z.string().max(500, "Please keep this under 500 characters"),
  consent,
  startedAt: z.number(),
  website: z.string().max(0), // honeypot: real people never fill this
  turnstileToken: z.string(),
});
export type BookingInput = z.infer<typeof bookingSchema>;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone,
  message: z.string().trim().min(2, "Write a short message").max(1000),
  consent,
  startedAt: z.number(),
  website: z.string().max(0),
  turnstileToken: z.string(),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;
