"use client";

import dynamic from "next/dynamic";
import type { HomeProject } from "@/lib/home-content";

const HomeFullpageSwiper = dynamic(
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
  return (
    <div className="flex h-dvh min-w-0 flex-col overflow-x-clip">
      <HomeFullpageSwiper projects={projects} />
    </div>
  );
}
