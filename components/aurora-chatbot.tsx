"use client";

import Script from "next/script";
import { useEffect } from "react";

const EMBED_ID = "cmc0rzztk0005hgiqjatcca2k";

/** Imposta `true` per riattivare il widget Aurora. */
const AURORA_CHATBOT_ENABLED = false;

const chatWindowStyle: React.CSSProperties = {
  marginRight: "1rem",
  marginBottom: "6rem",
  display: "none",
  position: "fixed",
  right: 0,
  bottom: 0,
  pointerEvents: "none",
  overflow: "hidden",
  height: "85vh",
  border: "2px solid #e2e8f0",
  borderRadius: "0.375rem",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  width: "30rem",
  zIndex: 2147483639,
};

function AuroraChatbotInner() {
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const chatIframe = document.getElementById(
        "itsaurora-chatbot-iframe",
      ) as HTMLIFrameElement | null;
      const buttonIframe = document.getElementById(
        "itsaurora-chatbot-button-iframe",
      ) as HTMLIFrameElement | null;

      if (event.data === "openChat") {
        if (!chatIframe || !buttonIframe) {
          console.error("iframe not found");
          return;
        }

        chatIframe.contentWindow?.postMessage("openChat", "*");
        buttonIframe.contentWindow?.postMessage("openChat", "*");
        chatIframe.style.pointerEvents = "auto";
        chatIframe.style.display = "block";

        if (window.innerWidth < 640) {
          chatIframe.style.position = "fixed";
          chatIframe.style.width = "100%";
          chatIframe.style.height = "100%";
          chatIframe.style.top = "0";
          chatIframe.style.left = "0";
          chatIframe.style.zIndex = "9999";
        } else {
          chatIframe.style.position = "fixed";
          chatIframe.style.width = "30rem";
          chatIframe.style.height = "85vh";
          chatIframe.style.bottom = "0";
          chatIframe.style.right = "0";
          chatIframe.style.top = "";
          chatIframe.style.left = "";
        }
        return;
      }

      if (event.data === "closeChat" && chatIframe && buttonIframe) {
        chatIframe.style.display = "none";
        chatIframe.style.pointerEvents = "none";
        chatIframe.contentWindow?.postMessage("closeChat", "*");
        buttonIframe.contentWindow?.postMessage("closeChat", "*");
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <>
      <Script src="https://www.itsaurora.ai/aurora.js" strategy="lazyOnload" />
      <iframe
        src={`https://www.itsaurora.ai/embed/${EMBED_ID}/button?chatbox=false`}
        scrolling="no"
        id="itsaurora-chatbot-button-iframe"
        title="Apri chat Aurora"
        className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-end rounded-full border border-gray-300 shadow-md transition-colors duration-300 dark:border-gray-600"
      />
      <iframe
        src={`https://www.itsaurora.ai/embed/${EMBED_ID}/window?chatbox=false&withExitX=true`}
        style={chatWindowStyle}
        id="itsaurora-chatbot-iframe"
        title="Chat Aurora"
        className="z-50"
      />
    </>
  );
}

export function AuroraChatbot() {
  if (!AURORA_CHATBOT_ENABLED) return null;
  return <AuroraChatbotInner />;
}
