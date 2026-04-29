"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AboutSection } from "@/components/sections/about-section";
import { ComuneHeroSection } from "@/components/sections/comune-hero-section";
import { ContactSection } from "@/components/sections/contact-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { TechSection } from "@/components/sections/tech-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import type { ComuneData } from "@/lib/comuni";
import { cn } from "@/lib/utils";

import "swiper/css";

const SLIDE_HASHES = [
  "#hero",
  "#chi-sono",
  "#tecnologia",
  "#competenze",
  "#testimonianze",
  "#costi",
  "#contatti",
] as const;

const HASH_TO_INDEX: Record<string, number> = SLIDE_HASHES.reduce(
  (acc, hash, index) => {
    acc[hash] = index;
    acc[hash.slice(1)] = index;
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

type ComuneFullpageSwiperProps = {
  comune: ComuneData;
};

export function ComuneFullpageSwiper({ comune }: ComuneFullpageSwiperProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const applyHashToSwiper = useCallback(() => {
    const index = parseHashIndex();
    if (!swiperRef.current) return;
    swiperRef.current.slideToLoop(index, 0);
  }, []);

  useEffect(() => {
    applyHashToSwiper();
    window.addEventListener("hashchange", applyHashToSwiper);
    return () => window.removeEventListener("hashchange", applyHashToSwiper);
  }, [applyHashToSwiper]);

  const onSlideChange = (swiper: SwiperType) => {
    const nextHash = SLIDE_HASHES[swiper.realIndex];
    if (typeof window === "undefined") return;
    if (!window.location.hash && swiper.realIndex === 0) return;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
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
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            applyHashToSwiper();
          }}
          onSlideChange={onSlideChange}
          aria-label={`Scorri le sezioni locali per ${comune.nome}`}
        >
          <SwiperSlide>
            <SlideChrome>
              <ComuneHeroSection comune={comune} />
            </SlideChrome>
          </SwiperSlide>
          <SwiperSlide>
            <SlideChrome>
              <AboutSection />
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
            <SlideChrome>
              <PricingSection />
            </SlideChrome>
          </SwiperSlide>
          <SwiperSlide>
            <SlideChrome className="pb-0">
              <ContactSection />
            </SlideChrome>
          </SwiperSlide>
        </Swiper>
      </div>
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
  return <div className={cn("h-full w-full min-w-0 overflow-hidden", className)}>{children}</div>;
}
