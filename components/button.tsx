import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "accent" | "outline" | "link" | "linkAccent";
type ButtonSize = "sm" | "md" | "lg";
type ButtonArrow = "right" | "down" | false;

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: ButtonArrow;
  className?: string;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
    as?: "button";
  };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    as?: "a";
  };

type ButtonAsSpan = SharedProps &
  Omit<HTMLAttributes<HTMLSpanElement>, "className" | "children"> & {
    href?: undefined;
    as: "span";
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsSpan;

const variantClasses: Record<ButtonVariant, string> = {
  accent:
    "btn-accent rounded-md font-semibold uppercase transition hover:brightness-95",
  outline:
    "rounded-md border border-border font-medium transition hover:border-foreground/40",
  link: "font-medium transition hover:text-foreground",
  linkAccent:
    "font-display font-semibold uppercase tracking-[0.14em] text-foreground transition hover:opacity-70",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 gap-2 px-4 text-[11px] tracking-[0.12em]",
  md: "h-12 gap-2 px-6 text-sm tracking-[0.08em]",
  lg: "h-12 gap-2 px-8 text-sm tracking-[0.08em]",
};

const linkSizeClasses: Record<ButtonSize, string> = {
  sm: "gap-2 text-xs",
  md: "gap-2 text-sm",
  lg: "gap-2 text-sm",
};

function ButtonLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex overflow-hidden leading-none">
      <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

function ButtonArrowIcon({ arrow }: { arrow: Exclude<ButtonArrow, false> }) {
  const Icon = arrow === "down" ? ArrowDown : ArrowRight;
  return (
    <Icon
      aria-hidden
      className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        arrow === "down"
          ? "group-hover:translate-y-1 group-focus-visible:translate-y-1"
          : "group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5",
      )}
    />
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "accent",
    size = "md",
    arrow = "right",
    className,
  } = props;

  const isSpan = "as" in props && props.as === "span";
  const isTextLink = variant === "link" || variant === "linkAccent";
  const classes = cn(
    "inline-flex items-center justify-center",
    !isSpan && "group",
    variantClasses[variant],
    isTextLink ? linkSizeClasses[size] : sizeClasses[size],
    className,
  );

  const content = (
    <>
      <ButtonLabel>{children}</ButtonLabel>
      {arrow ? <ButtonArrowIcon arrow={arrow} /> : null}
    </>
  );

  if ("href" in props && typeof props.href === "string") {
    const {
      children: _c,
      variant: _v,
      size: _s,
      arrow: _a,
      className: _cl,
      as: _as,
      href,
      ...linkRest
    } = props;
    const isInternal =
      href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/api/");

    if (isInternal) {
      return (
        <Link href={href} className={classes} {...linkRest}>
          {content}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...linkRest}>
        {content}
      </a>
    );
  }

  if ("as" in props && props.as === "span") {
    const {
      children: _c,
      variant: _v,
      size: _s,
      arrow: _a,
      className: _cl,
      as: _as,
      ...spanRest
    } = props;
    return (
      <span className={classes} {...spanRest}>
        {content}
      </span>
    );
  }

  const {
    children: _c,
    variant: _v,
    size: _s,
    arrow: _a,
    className: _cl,
    as: _as,
    type = "button",
    ...buttonRest
  } = props as ButtonAsButton;

  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
