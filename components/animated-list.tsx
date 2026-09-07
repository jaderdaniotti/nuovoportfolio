"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type MouseEventHandler,
  type KeyboardEvent,
  type UIEvent,
} from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/cn";

const ITEM_HEIGHT = 34;
const VIRTUALIZE_AFTER = 48;
const OVERSCAN = 8;

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  delay = 0,
  index,
  onMouseEnter,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={false}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

interface AnimatedListProps {
  items?: string[];
  hrefs?: string[];
  onItemSelect?: (item: string, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  listClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
  ariaLabel?: string;
}

const AnimatedList: React.FC<AnimatedListProps> = ({
  items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
  ],
  hrefs,
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = "",
  itemClassName = "",
  listClassName = "",
  displayScrollbar = true,
  initialSelectedIndex = -1,
  ariaLabel = "Lista",
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(400);

  const virtualize = items.length > VIRTUALIZE_AFTER;
  const startIndex = virtualize
    ? Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN)
    : 0;
  const endIndex = virtualize
    ? Math.min(
        items.length,
        Math.ceil((scrollTop + viewportHeight) / ITEM_HEIGHT) + OVERSCAN,
      )
    : items.length;
  const padTop = virtualize ? startIndex * ITEM_HEIGHT : 0;
  const padBottom = virtualize ? (items.length - endIndex) * ITEM_HEIGHT : 0;

  const handleItemMouseEnter = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleItemClick = useCallback(
    (item: string, index: number) => {
      setSelectedIndex(index);
      if (onItemSelect) {
        onItemSelect(item, index);
      }
    },
    [onItemSelect],
  );

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop: nextScrollTop, scrollHeight, clientHeight } =
      e.target as HTMLDivElement;
    setScrollTop(nextScrollTop);
    setViewportHeight(clientHeight);
    setTopGradientOpacity(Math.min(nextScrollTop / 50, 1));
    const bottomDistance = scrollHeight - (nextScrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1),
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!enableArrowNavigation) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setKeyboardNav(true);
      setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setKeyboardNav(true);
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < items.length) {
        e.preventDefault();
        if (onItemSelect) {
          onItemSelect(items[selectedIndex], selectedIndex);
        }
      }
    }
  };

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    setViewportHeight(container.clientHeight);
  }, []);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    if (virtualize) {
      const itemTop = selectedIndex * ITEM_HEIGHT;
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemBottom = itemTop + ITEM_HEIGHT;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: Math.max(0, itemTop - extraMargin), behavior: "smooth" });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: "smooth",
        });
      }
      setKeyboardNav(false);
      return;
    }
    const selectedItem = container.querySelector(
      `[data-index="${selectedIndex}"]`,
    ) as HTMLElement | null;
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: "smooth" });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: "smooth",
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav, virtualize]);

  return (
    <div className={cn("relative w-full max-w-[500px]", className)}>
      <div
        ref={listRef}
        tabIndex={enableArrowNavigation ? 0 : undefined}
        role="listbox"
        aria-label={ariaLabel}
        aria-activedescendant={
          selectedIndex >= 0 ? `animated-list-item-${selectedIndex}` : undefined
        }
        className={cn(
          "max-h-[400px] overflow-y-auto outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 ",
          displayScrollbar
            ? "[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-[4px] [&::-webkit-scrollbar-thumb]:bg-foreground/25"
            : "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          listClassName,
        )}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        style={{
          scrollbarWidth: displayScrollbar ? "thin" : "none",
          scrollbarColor: displayScrollbar
            ? "color-mix(in oklab, var(--foreground) 25%, transparent) transparent"
            : "none",
        }}
      >
        {padTop > 0 ? <div style={{ height: padTop }} aria-hidden /> : null}
        <div className="flex flex-col gap-1">
          {items.slice(startIndex, endIndex).map((item, offset) => {
            const index = startIndex + offset;
            const href = hrefs?.[index];
            const selected = selectedIndex === index;
            const inner = (
              <div
                id={`animated-list-item-${index}`}
                role="option"
                aria-selected={selected}
                className={cn(
                  "rounded-lg border border-border px-3 py-1.5 transition-colors",
                  selected ? "bg-foreground/10" : "bg-foreground/[0.03]",
                  itemClassName,
                )}
              >
                <p className="m-0 truncate leading-none text-foreground">{item}</p>
              </div>
            );

            return (
              <AnimatedItem
                key={href ?? `${item}-${index}`}
                delay={0.1}
                index={index}
                onMouseEnter={() => handleItemMouseEnter(index)}
                onClick={() => {
                  if (href) {
                    setSelectedIndex(index);
                    return;
                  }
                  handleItemClick(item, index);
                }}
              >
                {href ? (
                  <Link href={href} className="block text-inherit no-underline ">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </AnimatedItem>
            );
          })}
        </div>
        {padBottom > 0 ? <div style={{ height: padBottom }} aria-hidden /> : null}
      </div>
      {showGradients ? (
        <>
          <div
            className="pointer-events-none absolute top-0 right-0 left-0 h-[50px] bg-gradient-to-b from-background to-transparent transition-opacity duration-300 ease-in-out"
            style={{ opacity: topGradientOpacity }}
          />
          <div
            className="pointer-events-none absolute right-0 bottom-0 left-0 h-[100px] bg-gradient-to-t from-background to-transparent transition-opacity duration-300 ease-in-out"
            style={{ opacity: bottomGradientOpacity }}
          />
        </>
      ) : null}
    </div>
  );
};

export default AnimatedList;
