"use client";

import Image from "next/image";
import Link from "next/link";
import images from "@/src/images";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src={images.logo}
            alt="Jader Daniotti — logo"
            width={44}
            height={44}
            className="h-10 w-auto rounded-xl border border-zinc-200/80 bg-white p-1.5 shadow-sm transition group-hover:border-violet-300 group-hover:shadow-[0_12px_30px_-18px_rgba(109,40,217,0.45)] dark:border-zinc-700 dark:bg-zinc-900"
            priority
          />
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Jader Daniotti
            </span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Web Design & Development
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/#contatti"
            scroll={false}
            className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-violet-300"
          >
            Parliamone
          </Link>
        </div>
      </div>
    </header>
  );
}
