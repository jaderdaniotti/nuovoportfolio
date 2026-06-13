"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteNavItems } from "@/lib/site-nav-items";
import { cn } from "@/lib/utils";
import images from "@/src/images";

function isActive(pathname: string, href: string, match?: (pathname: string) => boolean) {
  if (match) return match(pathname);
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-zinc-50/90 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <Image
            src={images.logo}
            alt="Jader Daniotti — logo"
            width={40}
            height={40}
            className="h-9 w-auto rounded-lg border  bg-white p-1 transition group-hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:group-hover:border-zinc-600"
            priority
          />
          <span className="hidden text-sm font-semibold tracking-tight text-zinc-900 sm:inline dark:text-zinc-100">
            Jaderweb
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigazione principale">
          {siteNavItems.map((item) => {
            const active = isActive(pathname, item.href, item.match);
            const isHomeSection = item.href.includes("#");

            return (
              <Link
                key={item.href}
                href={item.href}
                scroll={isHomeSection}
                aria-label={item.ariaLabel}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition",
                  active
                    ? "font-semibold text-zinc-950 dark:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 md:hidden dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="h-5 w-5"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Navigazione mobile"
          className="border-t border-zinc-200/70 px-4 py-3 md:hidden dark:border-zinc-800"
        >
          <ul className="flex flex-col gap-1">
            {siteNavItems.map((item) => {
              const active = isActive(pathname, item.href, item.match);
              const isHomeSection = item.href.includes("#");

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    scroll={isHomeSection}
                    aria-label={item.ariaLabel}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm transition",
                      active
                        ? "font-semibold text-zinc-950 dark:text-zinc-100"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
