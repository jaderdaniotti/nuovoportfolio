import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
  inverted?: boolean;
};

export function SectionLabel({
  children,
  className,
  inverted = false,
}: SectionLabelProps) {
  return (
    <div className={cn("mb-5 flex items-center gap-3", className)}>
      <span
        className={cn("h-px w-8", inverted ? "bg-accent" : "bg-foreground")}
      />
      <span
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.22em]",
          inverted ? "text-panel-fg/55" : "text-muted",
        )}
      >
        {children}
      </span>
    </div>
  );
}
