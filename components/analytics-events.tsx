"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  trackContactSubmit,
  trackCtaClick,
  trackGaEvent,
  trackWhatsAppClick,
} from "@/lib/ga-events";

/**
 * Delegated GA4 clicks (WhatsApp / CTA) + thank-you page view.
 * Events fire only if cookie consent === all (see trackGaEvent).
 */
export function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/grazie") {
      trackGaEvent("thank_you_view", { page_path: "/grazie" });
    }
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.href;
      if (/wa\.me\/|api\.whatsapp\.com/i.test(href)) {
        trackWhatsAppClick(href);
        return;
      }

      if (anchor.dataset.gaCta === "true" || anchor.classList.contains("btn-accent")) {
        const label =
          anchor.dataset.gaLabel ||
          anchor.getAttribute("aria-label") ||
          anchor.textContent?.trim().slice(0, 80) ||
          "cta";
        trackCtaClick(label, href);
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

export { trackContactSubmit };
