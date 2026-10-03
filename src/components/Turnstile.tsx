"use client";

import { useEffect, useRef } from "react";

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: { sitekey: string; callback: (token: string) => void },
  ) => string;
  remove: (id: string) => void;
};

const SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// Cloudflare Turnstile (free CAPTCHA alternative). Renders nothing when no site key is configured.
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !ref.current) return;
    const el = ref.current;
    let id: string | undefined;
    const mount = () => {
      const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
      if (api && !id)
        id = api.render(el, { sitekey: siteKey, callback: onToken });
    };
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${SRC}"]`,
    );
    if (!script) {
      script = document.createElement("script");
      script.src = SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", mount);
    mount();
    return () => {
      script?.removeEventListener("load", mount);
      const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
      if (id && api) api.remove(id);
    };
  }, [siteKey, onToken]);

  return siteKey ? <div ref={ref} /> : null;
}
