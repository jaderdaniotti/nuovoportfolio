"use client";

import {
  SiCss,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiShopify,
  SiVercel,
} from "react-icons/si";
import LogoLoop, { type LogoItem } from "@/components/logo-loop";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { useTheme } from "@/components/theme-provider";
import { technologies } from "@/lib/home-content";

const techLogos: LogoItem[] = [
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiShopify />, title: "Shopify", href: "https://www.shopify.com" },
  { node: <SiLinux />, title: "Linux", href: "https://www.linux.org" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
  {
    node: <SiJavascript />,
    title: "JavaScript",
    href: "https://developer.mozilla.org/docs/Web/JavaScript",
  },
  {
    node: <SiHtml5 />,
    title: "HTML",
    href: "https://developer.mozilla.org/docs/Web/HTML",
  },
  {
    node: <SiCss />,
    title: "CSS",
    href: "https://developer.mozilla.org/docs/Web/CSS",
  },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com" },
];

export function TechSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="border-y border-border bg-background py-20 text-foreground lg:py-28">
      <div className="page-shell">
        <Reveal className="mx-auto max-w-5xl text-center">
          <SectionLabel className="justify-center">Stack</SectionLabel>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
            {technologies.title}
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-[clamp(1.05rem,2.2vw,1.35rem)] leading-relaxed text-muted">
            {technologies.body}
          </p>
        </Reveal>
      </div>

      <div className="relative mt-14 h-[180px] overflow-hidden lg:mt-16 lg:h-[200px]">
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={88}
          gap={64}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor={isDark ? "#0A0C00" : "#F6F5F3"}
          ariaLabel="Stack tecnologico"
          className="text-foreground"
        />
      </div>
    </section>
  );
}
