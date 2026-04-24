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
      label: "hero",
      href: "/#hero",
      ariaLabel: "Vai alla sezione hero",
      rotation: -8,
      hoverStyles: { bgColor: "#0f172a", textColor: "#ffffff" },
    },
    {
      label: "chi sono",
      href: "/#chi-sono",
      ariaLabel: "Vai alla sezione chi sono",
      rotation: 8,
      hoverStyles: { bgColor: "#7c3aed", textColor: "#ffffff" },
    },
    {
      label: "tecnologia",
      href: "/#tecnologia",
      ariaLabel: "Vai alla sezione tecnologia",
      rotation: -8,
      hoverStyles: { bgColor: "#0891b2", textColor: "#ffffff" },
    },
    {
      label: "competenze",
      href: "/#competenze",
      ariaLabel: "Vai alla sezione competenze",
      rotation: 8,
      hoverStyles: { bgColor: "#16a34a", textColor: "#ffffff" },
    },
    {
      label: "recensioni",
      href: "/#testimonianze",
      ariaLabel: "Vai alla sezione testimonianze",
      rotation: -8,
      hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" },
    },
    {
      label: "costi",
      href: "/#costi",
      ariaLabel: "Vai alla sezione costi",
      rotation: 8,
      hoverStyles: { bgColor: "#ca8a04", textColor: "#ffffff" },
    },
    {
      label: "contatti",
      href: "/#contatti",
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
    <div className="relative flex h-dvh min-w-0 flex-col overflow-x-clip">
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
      <div className="relative z-10 flex min-h-0 flex-1">
        <HomeFullpageSwiper projects={projects} />
      </div>
    </div>
  );
}
