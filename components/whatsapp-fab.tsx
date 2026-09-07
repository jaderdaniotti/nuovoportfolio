import { MessageCircle } from "lucide-react";
import { site } from "@/lib/home-content";
import { getLinkTitle } from "@/lib/link-titles";

export function WhatsAppFab() {
  const href = `https://wa.me/${site.whatsapp}`;
  return (
    <a
      href={href}
      title={getLinkTitle(href)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-background bg-[#67C15E] text-white shadow-lg transition hover:scale-105 lg:right-8"
    >
      <MessageCircle className="h-6 w-6 fill-current" />
    </a>
  );
}
