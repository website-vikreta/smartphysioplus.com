"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitEnquiry } from "@/app/actions";
import { routes } from "@/content/routes";
import { enquirySchema, type EnquiryInput } from "@/lib/schemas";
import { Turnstile } from "./Turnstile";

const input =
  "mt-1 block min-h-12 w-full border-2 border-sp-blue-900/40 bg-sp-white px-3";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sent">("idle");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const { register, handleSubmit, setValue, formState } = useForm<EnquiryInput>(
    {
      resolver: zodResolver(enquirySchema),
      mode: "onTouched",
      defaultValues: {
        name: "",
        phone: "",
        message: "",
        consent: false,
        startedAt: 0,
        website: "",
        turnstileToken: "",
      },
    },
  );
  const onToken = useCallback(
    (t: string) => setValue("turnstileToken", t),
    [setValue],
  );
  useEffect(() => setValue("startedAt", Date.now()), [setValue]);
  const err = formState.errors;

  const submit = handleSubmit((vals) => {
    setError("");
    startTransition(async () => {
      const res = await submitEnquiry(vals);
      if (res.ok) setState("sent");
      else setError(res.error);
    });
  });

  if (state === "sent") {
    return (
      <p
        role="status"
        className="max-w-xl border-2 border-sp-blue-700 bg-sp-white p-4"
      >
        Thank you. We received your message and will get back to you shortly.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="max-w-xl space-y-4">
      <label className="block">
        Name
        <input className={input} autoComplete="name" {...register("name")} />
        {err.name && (
          <span role="alert" className="text-red-800">
            {err.name.message}
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
        Message
        <textarea
          className={`${input} min-h-28`}
          maxLength={1000}
          {...register("message")}
        />
        {err.message && (
          <span role="alert" className="text-red-800">
            {err.message.message}
          </span>
        )}
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
          and consent to Smart Physio+ contacting me about this message.
        </span>
      </label>
      {err.consent && (
        <p role="alert" className="text-red-800">
          {err.consent.message}
        </p>
      )}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <Turnstile onToken={onToken} />
      <div aria-live="polite" className="text-red-800">
        {error}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="min-h-12 bg-sp-blue-700 px-6 font-medium text-sp-white hover:bg-sp-blue-900 disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
