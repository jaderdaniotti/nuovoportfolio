"use client";

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ViewportAnimateProps = {
  children: ReactNode;
  className?: string;
  enterAnimation?: string;
  as?: "div" | "section" | "article" | "header";
  threshold?: number;
  rootMargin?: string;
} & HTMLAttributes<HTMLElement>;

type Phase = "idle" | "enter";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ViewportAnimate({
  children,
  className,
  enterAnimation = "animate__fadeInUp",
  as: Tag = "div",
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
  style,
  ...htmlProps
}: ViewportAnimateProps) {
  const observerRef = useRef<HTMLElement>(null);
  const phaseRef = useRef<Phase>("idle");
  const [phase, setPhase] = useState<Phase>(() => (prefersReducedMotion() ? "enter" : "idle"));
  const [reduceMotion] = useState(prefersReducedMotion);

  const setPhaseSafe = (next: Phase) => {
    if (phaseRef.current === next) return;
    phaseRef.current = next;
    setPhase(next);
  };

  useEffect(() => {
    if (reduceMotion) return;

    const node = observerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phaseRef.current === "idle") {
          setPhaseSafe("enter");
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, reduceMotion]);

  const animationClass =
    !reduceMotion && phase === "enter" ? cn("animate__animated", enterAnimation) : undefined;

  const wrapperClass =
    !reduceMotion && phase === "idle" ? "opacity-0 invisible" : "opacity-100 visible";

  return (
    <Tag
      ref={(node) => {
        observerRef.current = node;
      }}
      className={cn("h-full", wrapperClass)}
      style={style}
      {...htmlProps}
    >
      <div className={cn("h-full w-full", className, animationClass)}>{children}</div>
    </Tag>
  );
}
