"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import images from "@/src/images";

const nav = [
  { href: "/#hero", label: "Intro" },
  { href: "/#chi-sono", label: "Chi sono" },
  { href: "/#progetti", label: "Progetti" },
  { href: "/#tecnologia", label: "3D & tech" },
  { href: "/#competenze", label: "Competenze" },
  { href: "/#collaborazioni", label: "Collaborazioni" },
  { href: "/#testimonianze", label: "Feedback" },
  { href: "/#contatti", label: "Contatti" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={images.logo}
            alt="Jader Daniotti — logo"
            width={44}
            height={44}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              scroll={item.href.startsWith("/#") ? false : undefined}
              className="rounded-full px-3 py-2 text-sm font-medium uppercase text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-violet-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contatti"
            scroll={false}
            className="hidden rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 sm:inline-flex"
          >
            Parliamone
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            className="inline-flex rounded-xl border border-zinc-200 bg-white p-2 text-zinc-800 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-zinc-100 bg-white/95 lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              scroll={item.href.startsWith("/#") ? false : undefined}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-zinc-800 hover:bg-violet-50 hover:text-violet-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
