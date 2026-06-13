"use client";

import { useEffect } from "react";
import { CHATBASE_BOT_ID, CHATBASE_WIDGET_ENABLED } from "@/lib/chatbase-config";

type ChatbaseFn = {
  (...args: unknown[]): void;
  q: unknown[][];
};

declare global {
  interface Window {
    chatbase?: ChatbaseFn;
  }
}

function initChatbaseEmbed() {
  const state = window.chatbase?.("getState" as never) as string | undefined;
  if (state === "initialized") {
    return;
  }

  const chatbase = ((...args: unknown[]) => {
    chatbase.q.push(args);
  }) as ChatbaseFn;

  chatbase.q = [];

  window.chatbase = new Proxy(chatbase, {
    get(target, prop) {
      if (prop === "q") {
        return target.q;
      }
      return (...args: unknown[]) => chatbase(String(prop), ...args);
    },
  }) as ChatbaseFn;

  if (document.getElementById(CHATBASE_BOT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://www.chatbase.co/embed.min.js";
  script.id = CHATBASE_BOT_ID;
  script.setAttribute("domain", "www.chatbase.co");
  document.body.appendChild(script);
}

function ChatbaseWidgetInner() {
  useEffect(() => {
    const run = () => initChatbaseEmbed();

    if (document.readyState === "complete") {
      run();
      return;
    }

    window.addEventListener("load", run);
    return () => window.removeEventListener("load", run);
  }, []);

  return null;
}

export function ChatbaseWidget() {
  if (!CHATBASE_WIDGET_ENABLED || !CHATBASE_BOT_ID) {
    return null;
  }

  return <ChatbaseWidgetInner />;
}
