"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

export type ProcessTimelineItem = {
  number: string;
  title: string;
  description?: string;
};

export function ProcessTimeline({ items }: { items: ProcessTimelineItem[] }) {
  const guideRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: guideRef,
    offset: ["start 70%", "end 50%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });
  const lineScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div ref={guideRef} className="relative mx-auto mt-16 max-w-5xl lg:mt-20">
      <div
        aria-hidden
        className="absolute top-3 bottom-3 left-6 w-px bg-border md:left-1/2 md:-translate-x-px"
      />
      <motion.div
        aria-hidden
        className="absolute top-3 bottom-3 left-6 w-px origin-top bg-foreground md:left-1/2 md:-translate-x-px"
        style={{ scaleY: lineScale }}
      />

      <ol className="relative space-y-10 md:space-y-16">
        {items.map((item, index) => {
          const fromLeft = index % 2 === 0;
          const enterX = fromLeft ? -64 : 64;

          return (
            <li key={`${item.number}-${item.title}`} className="relative">
              <span
                aria-hidden
                className="absolute top-3 left-6 z-10 size-3 -translate-x-1/2 rounded-full border-2 border-foreground bg-background md:left-1/2"
              />

              <motion.div
                className={cn(
                  "pl-14 md:w-[calc(50%-2rem)] md:pl-0",
                  fromLeft
                    ? "md:mr-auto md:pr-12 md:text-right"
                    : "md:ml-auto md:pl-12 md:text-left",
                )}
                initial={{ opacity: 0, x: enterX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{
                  once: false,
                  amount: 0.45,
                  margin: "-8% 0px -8% 0px",
                }}
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-none text-foreground/25">
                  {item.number}
                </p>
                <h3 className="font-display mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-3 max-w-md text-[clamp(1rem,1.8vw,1.15rem)] leading-relaxed text-muted md:inline-block">
                    {item.description}
                  </p>
                ) : null}
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
