import type { ReactNode } from "react";
import { FloatingQuickActions } from "@/components/floating-quick-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type Props = {
  children: ReactNode;
};

export default function ToolsLayout({ children }: Props) {
  return (
    <div className="relative isolate min-h-dvh overflow-x-clip overflow-y-auto bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <div className="pointer-events-none absolute inset-x-0 top-[-25rem] h-[42rem] bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.06),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_65%)]" />
      <SiteHeader />
      <FloatingQuickActions />
      <main className="relative z-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
