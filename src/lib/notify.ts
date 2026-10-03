import { Resend } from "resend";
import { clinic } from "@/content/clinic";

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] as string,
  );

// Emails are best-effort: if Resend is not configured or fails, the request is already saved.
export async function sendEmails(opts: {
  subject: string;
  lines: [string, string][];
  patientPhoneE164: string;
  patientEmail?: string;
}) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CLINIC_NOTIFY_EMAIL;
  if (!key || !to) return;
  const from =
    process.env.RESEND_FROM ?? `${clinic.brandName} <onboarding@resend.dev>`;
  const resend = new Resend(key);
  const rows = opts.lines
    .map(([k, v]) => `<p><strong>${esc(k)}:</strong> ${esc(v)}</p>`)
    .join("");
  const wa = `https://wa.me/${opts.patientPhoneE164.replace(/\D/g, "")}`;
  try {
    await resend.emails.send({
      from,
      to,
      subject: opts.subject,
      html: `${rows}<p><a href="${wa}">Reply on WhatsApp</a></p>`,
    });
    if (opts.patientEmail) {
      await resend.emails.send({
        from,
        to: opts.patientEmail,
        subject: `We received your request | ${clinic.brandName}`,
        html: `<p>Thank you. We received your request and will confirm the exact time with you on WhatsApp or by phone.</p><p>${esc(clinic.phone.display)}</p>`,
      });
    }
  } catch (err) {
    console.error("Email failed", err);
  }
}
