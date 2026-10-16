type Gtag = (
  command: "event",
  name: string,
  params?: Record<string, unknown>,
) => void;

// Events: click_call, click_whatsapp, click_directions, spine_region_select, booking_start, booking_submit, tour_complete.
// P1: condition_view, faq_open, related_link_click, red_flag_box_view. Booking events carry concern + source_page.
// Sends only when GA4 has loaded (after the visitor accepts analytics).
export function track(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  (window as unknown as { gtag?: Gtag }).gtag?.("event", name, params);
}

/** Page that sent the visitor to booking, recorded on link click in Analytics. */
export function sourcePage() {
  try {
    return sessionStorage.getItem("sp_source") ?? undefined;
  } catch {
    return undefined;
  }
}
