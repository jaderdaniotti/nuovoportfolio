"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AboutSection } from "@/components/sections/about-section";
import { CollabsSection } from "@/components/sections/collabs-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { TechSection } from "@/components/sections/tech-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import type { HomeProject } from "@/lib/home-content";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";

const SLIDE_HASHES = [
  "#hero",
  "#chi-sono",
  "#progetti",
  "#tecnologia",
  "#competenze",
  "#collaborazioni",
  "#testimonianze",
  "#contatti",
] as const;

const HASH_TO_INDEX: Record<string, number> = SLIDE_HASHES.reduce(
  (acc, h, i) => {
    acc[h] = i;
    acc[h.slice(1)] = i;
    return acc;
  },
  {} as Record<string, number>,
);

function parseHashIndex(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.location.hash;
  if (!raw) return 0;
  return HASH_TO_INDEX[raw] ?? HASH_TO_INDEX[raw.slice(1)] ?? 0;
}

type HomeFullpageSwiperProps = {
  projects: HomeProject[];
};

export function HomeFullpageSwiper({ projects }: HomeFullpageSwiperProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const applyHashToSwiper = useCallback(() => {
    const idx = parseHashIndex();
    if (!swiperRef.current) return;
    swiperRef.current.slideToLoop(idx, 0);
  }, []);

  useEffect(() => {
    applyHashToSwiper();
    window.addEventListener("hashchange", applyHashToSwiper);
    return () => window.removeEventListener("hashchange", applyHashToSwiper);
  }, [applyHashToSwiper]);

  const onSlideChange = (sw: SwiperType) => {
    const i = sw.realIndex;
    if (typeof window === "undefined") return;
    const next = SLIDE_HASHES[i];
    if (!window.location.hash && i === 0) return;
    if (window.location.hash !== next) {
      window.history.replaceState(null, "", next);
    }
  };

  return (
    <main className="relative min-h-0 w-full flex-1">
      <div className="absolute inset-0">
        <Swiper
          modules={[Mousewheel, Keyboard]}
          className="h-full w-full"
          style={{ height: "100%" }}
          direction="vertical"
          slidesPerView={1}
          spaceBetween={0}
          speed={700}
          loop
          mousewheel={{
            enabled: true,
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: false,
          }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          onSwiper={(sw) => {
            swiperRef.current = sw;
            applyHashToSwiper();
          }}
          onSlideChange={onSlideChange}
          aria-label="Scorri le sezioni del sito"
        >
          <SwiperSlide>
            <SlideChrome>
              <HeroSection />
            </SlideChrome>
          </SwiperSlide>
          <SwiperSlide>
            <SlideChrome>
              <AboutSection />
            </SlideChrome>
          </SwiperSlide>
          <SwiperSlide>
            <SlideChrome>
              <ProjectsSection projects={projects} />
            </SlideChrome>
          </SwiperSlide>
          <SwiperSlide>
            <SlideChrome>
              <TechSection />
            </SlideChrome>
          </SwiperSlide>
          <SwiperSlide>
            <SlideChrome>
              <SkillsSection />
            </SlideChrome>
          </SwiperSlide>
          <SwiperSlide>
            <SlideChrome>
              <TestimonialsSection />
            </SlideChrome>
          </SwiperSlide>
          <SwiperSlide>
            <SlideChrome className="pb-0">
              <ContactSection />
            </SlideChrome>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="swiper-pagination-vertical pointer-events-auto fixed right-6 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-1" />
    </main>
  );
}

function SlideChrome({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full w-full min-w-0 overflow-x-hidden overflow-y-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}
