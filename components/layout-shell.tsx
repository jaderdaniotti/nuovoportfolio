"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent";
import { ConsentedGoogleAnalytics } from "@/components/google-analytics";
import { WhatsAppFab } from "@/components/whatsapp-fab";

export function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDemo = pathname.startsWith("/demo");

  if (isDemo) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <SiteHeader />
      {children}
      <SiteFooter />
      <CookieConsent />
      <ConsentedGoogleAnalytics />
      <WhatsAppFab />
    </div>
  );
}
