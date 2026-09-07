"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useCookieConsent } from "@/components/cookie-consent";
import { GA_MEASUREMENT_ID } from "@/lib/analytics-config";

/** Loads gtag.js only after the visitor accepts analytics cookies. */
export function ConsentedGoogleAnalytics() {
  const consent = useCookieConsent();

  if (consent !== "all" || !GA_MEASUREMENT_ID) {
    return null;
  }

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
