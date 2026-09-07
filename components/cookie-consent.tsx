"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/button";
import { cn } from "@/lib/cn";
import { getLinkTitle } from "@/lib/link-titles";

export const COOKIE_CONSENT_KEY = "jaderweb-cookie-consent";

export type CookieConsentValue = "all" | "necessary";

function readConsent(): CookieConsentValue | null {
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "all" || value === "necessary") return value;
  } catch {
    // ignore
  }
  return null;
}

function writeConsent(value: CookieConsentValue) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    window.dispatchEvent(
      new CustomEvent("jaderweb:cookie-consent", { detail: value }),
    );
  } catch {
    // ignore
  }
}

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  return readConsent();
}

export function useCookieConsent(): CookieConsentValue | null {
  return useSyncExternalStore(subscribeConsent, readConsent, () => null);
}

function subscribeConsent(onStoreChange: () => void) {
  window.addEventListener("jaderweb:cookie-consent", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("jaderweb:cookie-consent", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function CookieConsent() {
  const visible = useSyncExternalStore(
    subscribeConsent,
    () => readConsent() === null,
    () => false,
  );

  function accept(value: CookieConsentValue) {
    writeConsent(value);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className={cn(
        "fixed inset-x-0 bottom-0 z-80 p-4 sm:p-6",
        "pointer-events-none",
      )}
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-3xl border border-border bg-background p-5 text-foreground shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:p-6">
        <p
          id="cookie-consent-title"
          className="font-display text-lg font-semibold tracking-tight sm:text-xl"
        >
          Uso i cookie
        </p>
        <p
          id="cookie-consent-desc"
          className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.95rem]"
        >
          Usiamo cookie tecnici necessari al funzionamento del sito e, solo con
          il tuo consenso, cookie analitici per migliorare l&apos;esperienza.{" "}
          <Link
            href="/cookie"
            title={getLinkTitle("/cookie")}
            className="font-medium text-foreground underline decoration-accent decoration-2 underline-offset-2 transition hover:opacity-70"
          >
            Maggiori informazioni
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <Button
            type="button"
            size="sm"
            arrow={false}
            className="w-full sm:w-auto"
            onClick={() => accept("all")}
          >
            Accetta tutti
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            arrow={false}
            className="w-full sm:w-auto"
            onClick={() => accept("necessary")}
          >
            Solo necessari
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CookieManageButton({ className }: { className?: string }) {
  function resetCookieConsent() {
    try {
      window.localStorage.removeItem(COOKIE_CONSENT_KEY);
      window.location.reload();
    } catch {
      // ignore
    }
  }

  return (
    <button type="button" onClick={resetCookieConsent} className={className}>
      Gestisci cookie
    </button>
  );
}
