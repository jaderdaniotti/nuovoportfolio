"use client";

import { useCallback } from "react";
import ProfileCard from "@/components/profile-card";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { useTheme } from "@/components/theme-provider";
import { founderSection } from "@/lib/home-content";

export function FounderSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const avatarUrl = isDark
    ? founderSection.avatarDark
    : founderSection.avatarLight;

  const onContactClick = useCallback(() => {
    window.open(founderSection.siteUrl, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <section
      id="chi-ce-dietro-i-lavori-del-web"
      className="border-y border-border bg-background py-24 text-foreground lg:py-28"
    >
      <div className="page-shell grid min-w-0 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="min-w-0">
          <SectionLabel>{founderSection.eyebrow}</SectionLabel>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
            {founderSection.title}
          </h2>
          <p className="mt-6 max-w-lg text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
            {founderSection.body}
          </p>
        </Reveal>

        <Reveal delay={0.18} className="flex min-w-0 justify-center lg:justify-end">
          <ProfileCard
            name={founderSection.name}
            title={founderSection.titleRole}
            handle={founderSection.handle}
            status={founderSection.status}
            contactText={founderSection.contactText}
            avatarUrl={avatarUrl}
            miniAvatarUrl={avatarUrl}
            showUserInfo
            enableTilt
            enableMobileTilt={false}
            behindGlowEnabled={false}
            innerGradient="none"
            onContactClick={onContactClick}
          />
        </Reveal>
      </div>
    </section>
  );
}
