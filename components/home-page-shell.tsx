"use client";

import dynamic from "next/dynamic";
import BubbleMenu from "@/components/bubble-menu";
import type { MenuItem } from "@/components/bubble-menu";
import { FloatingQuickActions } from "@/components/floating-quick-actions";
import SplashCursor from "@/components/splash-cursor";
import type { HomeProject } from "@/lib/home-content";

const HomeFullpageSwiper = dynamic<{ projects: HomeProject[] }>(
  () =>
    import("@/components/home-fullpage-swiper").then((m) => m.HomeFullpageSwiper),
  {
    ssr: false,
    loading: () => (
      <main className="flex min-h-[calc(100dvh-4rem)] w-full flex-1 items-center justify-center text-sm text-zinc-500">
        
      </main>
    ),
  },
);

type HomePageShellProps = {
  projects: HomeProject[];
};

export function HomePageShell({ projects }: HomePageShellProps) {
  const navItems: MenuItem[] = [

    {
      label: "tariffe",
      href: "https://jaderweb.com/pricing",
      ariaLabel: "Vai alla pagina tariffe",
      rotation: 8,
      hoverStyles: { bgColor: "#ca8a04", textColor: "#ffffff" },
    },
    {
      label: "tools",
      href: "/tools",
      ariaLabel: "Vai ai tools",
      target: "_blank",
      rotation: 8,
      hoverStyles: { bgColor: "#0ea5e9", textColor: "#ffffff" },
    },
    {
      label: "contatti",
      href: "https://jaderweb.com/contatti",
      ariaLabel: "Vai alla sezione contatti",
      rotation: -8,
      hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
    },
    {
      label: "blog",
      href: "/blog",
      ariaLabel: "Vai al blog",
      target: "_blank",
      rotation: -8,
      hoverStyles: { bgColor: "#111827", textColor: "#ffffff" },
    },
  ];

  return (
    <div className="relative flex min-h-dvh min-w-0 flex-col overflow-x-clip max-md:h-dvh max-md:overflow-y-auto md:h-dvh">
      <SplashCursor DENSITY_DISSIPATION={4.5} PRESSURE={0.7} />
      <BubbleMenu
        items={navItems}
        menuAriaLabel="Apri navigazione del sito"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition
        className="top-5 md:top-6"
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />
      <FloatingQuickActions />
      <div className="relative z-10 flex flex-1 md:min-h-0">
        <HomeFullpageSwiper projects={projects} />
      </div>
    </div>
  );
}
