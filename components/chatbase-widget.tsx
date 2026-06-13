import Script from "next/script";
import { CHATBASE_BOT_ID, CHATBASE_WIDGET_ENABLED } from "@/lib/chatbase-config";

function buildChatbaseEmbedScript(botId: string) {
  return `(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="${botId}";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`;
}

/** Chatbase chat bubble — script ufficiale via next/script (affidabile in prod). */
export function ChatbaseWidget() {
  if (!CHATBASE_WIDGET_ENABLED || !CHATBASE_BOT_ID) {
    return null;
  }

  return (
    <Script
      id="chatbase-widget-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: buildChatbaseEmbedScript(CHATBASE_BOT_ID) }}
    />
  );
}
