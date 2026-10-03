type Gtag = (
  command: "event",
  name: string,
  params?: Record<string, unknown>,
) => void;

// Events: click_call, click_whatsapp, click_directions, spine_region_select, booking_start, booking_submit, tour_complete.
// Sends only when GA4 has loaded (after the visitor accepts analytics).
export function track(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  (window as unknown as { gtag?: Gtag }).gtag?.("event", name, params);
}
