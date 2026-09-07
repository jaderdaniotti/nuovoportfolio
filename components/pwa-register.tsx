"use client";

import { useEffect } from "react";

/**
 * Registra il service worker shell-only (`/sw.js`).
 * Nessuna push notification in S01.
 */
export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV === "development") {
      // In dev il SW può confondere HMR; registriamo solo in production build.
      return;
    }

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .catch(() => {
          /* silenzioso: PWA degradabile */
        });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }
  }, []);

  return null;
}
