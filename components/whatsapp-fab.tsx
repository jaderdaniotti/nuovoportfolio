import { MessageCircle } from "lucide-react";
import { site } from "@/lib/home-content";

export function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-background bg-[#67C15E] text-white shadow-lg transition hover:scale-105 lg:right-8"
    >
      <MessageCircle className="h-6 w-6 fill-current" />
    </a>
  );
}
