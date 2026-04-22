import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type Props = {
  children: ReactNode;
};

export default function BlogLayout({ children }: Props) {
  return (
    <div className="relative isolate min-h-dvh overflow-x-clip bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <div className="pointer-events-none absolute inset-x-0 top-[-25rem] h-[42rem] bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.22),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.25),transparent_65%)]" />
      <SiteHeader />
      <main className="relative z-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
