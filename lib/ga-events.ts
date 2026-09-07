import { getCookieConsent } from "@/components/cookie-consent";
import { GA_MEASUREMENT_ID } from "@/lib/analytics-config";

type GaParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "consent",
      targetOrName: string,
      params?: GaParams,
    ) => void;
  }
}

/** Fire GA4 event only with analytics consent + gtag loaded. */
export function trackGaEvent(eventName: string, params: GaParams = {}) {
  if (typeof window === "undefined") return;
  if (!GA_MEASUREMENT_ID) return;
  if (getCookieConsent() !== "all") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, params);
}

export function trackContactSubmit() {
  trackGaEvent("generate_lead", {
    method: "contact_form",
    page_path: window.location.pathname,
  });
}

export function trackWhatsAppClick(href: string) {
  trackGaEvent("whatsapp_click", {
    link_url: href,
    page_path: window.location.pathname,
  });
}

export function trackCtaClick(label: string, href?: string) {
  trackGaEvent("cta_click", {
    cta_label: label,
    link_url: href,
    page_path: window.location.pathname,
  });
}
