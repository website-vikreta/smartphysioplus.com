"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

// Sends `event` once: on mount, or when `children` first scroll into view.
export function TrackView({
  event,
  params,
  children,
}: {
  event: string;
  params: Record<string, string>;
  children?: ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);
  const key = JSON.stringify(params);

  useEffect(() => {
    const p = JSON.parse(key);
    const el = box.current;
    if (!el) return track(event, p);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      track(event, p);
      io.disconnect();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [event, key]);

  return children ? <div ref={box}>{children}</div> : null;
}
