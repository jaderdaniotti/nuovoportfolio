"use client";

import { useEffect } from "react";

/** Keep the page at the top on reload / hard refresh. */
export function ScrollToTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  return null;
}
