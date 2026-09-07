"use client";

import Image from "next/image";
import { themeLogos, useTheme } from "@/components/theme-provider";
import { site } from "@/lib/home-content";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  /** Default: brand name. Pass "" when the parent link already names the brand. */
  alt?: string;
};

export function BrandLogo({
  className,
  fill,
  sizes,
  priority,
  alt = site.name,
}: BrandLogoProps) {
  const { logoSrc, theme, mounted } = useTheme();
  const src = mounted ? logoSrc : themeLogos.dark;

  return (
    <Image
      src={src}
      alt={alt}
      unoptimized
      priority={priority}
      className={cn(
        fill
          ? "object-contain"
          : "h-14 w-14 object-contain md:h-[4.5rem] md:w-[4.5rem]",
        className,
      )}
      key={mounted ? theme : "ssr"}
      {...(fill
        ? { fill: true, sizes: sizes ?? "(max-width: 1024px) 90vw, 40vw" }
        : { width: 72, height: 72 })}
    />
  );
}
