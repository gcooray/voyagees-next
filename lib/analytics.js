export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
// Meta (Facebook) Pixel — for measuring and retargeting Facebook/Instagram
// ads. Loads only after cookie consent, like GA; unset = no-op.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function gtagReady() {
  return Boolean(GA_MEASUREMENT_ID) && typeof window !== "undefined" && typeof window.gtag === "function";
}

function fbqReady() {
  return Boolean(META_PIXEL_ID) && typeof window !== "undefined" && typeof window.fbq === "function";
}

export function pageview(url) {
  if (gtagReady()) window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
  if (fbqReady()) window.fbq("track", "PageView");
}

export function trackEvent(name, params = {}) {
  if (gtagReady()) window.gtag("event", name, params);
}

/**
 * A request was sent: driver booking, airport transfer, contact form or
 * itinerary + hotels. GA4's recommended `generate_lead` event (mark it as a
 * key event in GA to count conversions) + Meta's standard `Lead`.
 * @param {string} type e.g. "driver_booking", "airport_transfer"
 */
export function trackLead(type, params = {}) {
  if (gtagReady()) window.gtag("event", "generate_lead", { lead_type: type, ...params });
  if (fbqReady()) window.fbq("track", "Lead", { content_category: type });
}

/** Someone opened a WhatsApp chat with us. */
export function trackWhatsAppClick(placement) {
  if (gtagReady()) window.gtag("event", "whatsapp_click", { placement });
  if (fbqReady()) window.fbq("track", "Contact", { content_category: placement });
}
