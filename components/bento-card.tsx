"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BentoCardProps = {
  className?: string;
  children: ReactNode;
  glow?: boolean;
};

export function BentoCard({ className, children, glow = true }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setSpot({ x, y, active: true });
  }, []);

  const onLeave = useCallback(() => {
    setSpot((s) => ({ ...s, active: false }));
  }, []);

  const style = {
    ["--spot-x" as string]: `${spot.x}%`,
    ["--spot-y" as string]: `${spot.y}%`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white/70 p-8 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 ease-out",
        glow &&
          "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100",
        glow &&
          "before:bg-[radial-gradient(520px_circle_at_var(--spot-x)_var(--spot-y),rgba(109,40,217,0.14),transparent_45%)]",
        "hover:border-violet-300/80 hover:shadow-[0_24px_80px_-24px_rgba(109,40,217,0.25)]",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
