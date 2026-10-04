"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Full-width loader line under the navbar (renders inside the sticky header). Shows on first load and after any internal link click, hides once the new path renders.
export function NavLoader() {
  const pathname = usePathname();
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBusy(false), 500);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    let fallback: ReturnType<typeof setTimeout>;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a");
      if (
        !a ||
        e.defaultPrevented ||
        e.button ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        a.target === "_blank" ||
        a.hasAttribute("download")
      )
        return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname)
        return;
      setBusy(true);
      clearTimeout(fallback);
      fallback = setTimeout(() => setBusy(false), 8000); // ponytail: guards a navigation that never commits
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(fallback);
    };
  }, []);

  if (!busy) return null;
  return (
    <div
      role="progressbar"
      aria-label="Loading page"
      className="sp-loader pointer-events-none absolute left-0 top-full w-full"
    />
  );
}
