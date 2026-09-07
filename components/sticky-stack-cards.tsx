"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/cn";

const STICKY_TOP = "6rem";

export type StickyStackCard = {
  title: string;
  description?: string;
  icon?: string;
  iconLabel?: string;
};

export function StickyStackCards({ items }: { items: StickyStackCard[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative mx-auto mt-14 max-w-5xl lg:mt-16">
      {items.map((item, index) => {
        const fromLeft = index % 2 === 0;
        const enterX = fromLeft ? -56 : 56;

        return (
          <div
            key={`${item.iconLabel ?? ""}-${item.title}`}
            className="sticky mb-[35vh]"
            style={{ top: STICKY_TOP, zIndex: index + 1 }}
          >
            <motion.article
              className={cn(
                "flex min-h-[min(72vh,680px)] flex-col items-center justify-center gap-5 rounded-[2rem] border border-border px-6 py-10 text-center shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:min-h-[min(78vh,760px)] sm:gap-7 sm:px-14 sm:py-14 lg:min-h-[min(74vh,820px)] lg:gap-8 lg:rounded-[2.5rem] lg:px-16 lg:py-16",
                isDark ? "bg-[#121410] text-cream" : "bg-[#EFEEEA] text-ink",
              )}
              initial={{ opacity: 0, x: enterX }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5 lg:gap-6">
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex size-[4rem] shrink-0 items-center justify-center rounded-full sm:size-[5.25rem] lg:size-24",
                    isDark ? "bg-cream" : "bg-ink",
                    item.iconLabel && !item.icon
                      ? isDark
                        ? "text-ink"
                        : "text-cream"
                      : "",
                  )}
                >
                  {item.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element -- emoji-style icon
                    <img
                      src={item.icon}
                      alt=""
                      className="size-11 object-contain sm:size-14 lg:size-16"
                    />
                  ) : item.iconLabel ? (
                    <span className="font-display text-[clamp(1.15rem,2.4vw,1.75rem)] font-semibold leading-none">
                      {item.iconLabel}
                    </span>
                  ) : null}
                </span>
                <h3 className="font-display text-center text-[clamp(2.4rem,9vw,4.25rem)] font-semibold leading-[0.95] tracking-tight">
                  {item.title}
                </h3>
              </div>
              {item.description ? (
                <p
                  className={cn(
                    "max-w-3xl text-[clamp(1.25rem,2.8vw,1.85rem)] leading-snug",
                    isDark ? "text-cream/70" : "text-ink/65",
                  )}
                >
                  {item.description}
                </p>
              ) : null}
            </motion.article>
          </div>
        );
      })}
      <div className="h-[20vh]" aria-hidden />
    </div>
  );
}
