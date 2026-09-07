"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { cn } from "@/lib/cn";

const DISMISS_KEY = "jaderweb-pwa-install-dismissed";
const SHOW_DELAY_MS = 12_000;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function wasDismissed() {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    window.localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // ignore
  }
}

/**
 * Prompt install PWA discreto: solo dopo beforeinstallprompt + delay,
 * non invasivo, dismiss persistente. Tema jaderweb.
 */
export function PwaInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (wasDismissed()) return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    let cancelled = false;
    let timer: number | undefined;
    let promptEvent: BeforeInstallPromptEvent | null = null;

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      promptEvent = event as BeforeInstallPromptEvent;
      setDeferred(promptEvent);
      timer = window.setTimeout(() => {
        if (!cancelled && !wasDismissed()) setVisible(true);
      }, SHOW_DELAY_MS);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => {
      cancelled = true;
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  if (!visible || !deferred) return null;

  async function install() {
    try {
      await deferred!.prompt();
      await deferred!.userChoice;
    } catch {
      // ignore
    } finally {
      markDismissed();
      setVisible(false);
      setDeferred(null);
    }
  }

  function dismiss() {
    markDismissed();
    setVisible(false);
    setDeferred(null);
  }

  return (
    <div
      role="dialog"
      aria-label="Installa jaderweb"
      aria-modal="false"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[75] p-4 sm:p-6",
        "pointer-events-none",
      )}
    >
      <div className="pointer-events-auto mx-auto flex max-w-lg flex-col gap-4 rounded-2xl border border-border bg-background p-5 text-foreground shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:flex-row sm:items-center sm:p-5">
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-semibold tracking-tight">
            Installa jaderweb
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Aggiungi l’app alla home: accesso rapido e pagina offline se manca
            la rete.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button type="button" size="sm" arrow={false} onClick={install}>
            Installa
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            arrow={false}
            onClick={dismiss}
          >
            Non ora
          </Button>
        </div>
      </div>
    </div>
  );
}
