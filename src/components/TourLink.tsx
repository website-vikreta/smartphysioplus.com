"use client";

import { usePathname, useRouter } from "next/navigation";
import { TOUR_EVENT, TOUR_PENDING } from "./Tour";

// Footer link that reopens the tour. The tour lives on Home, so other pages navigate there first.
export function TourLink({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (pathname === "/") {
          window.dispatchEvent(new Event(TOUR_EVENT));
        } else {
          try {
            sessionStorage.setItem(TOUR_PENDING, "1");
          } catch {
            // Ignore blocked storage.
          }
          router.push("/");
        }
      }}
    >
      Show me around
    </button>
  );
}
