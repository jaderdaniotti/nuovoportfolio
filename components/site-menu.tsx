"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { navItems, site } from "@/lib/home-content";

type SiteMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function SiteMenu({ open, onClose }: SiteMenuProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-ink text-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between px-6 py-5 lg:px-10">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 text-cream" onClick={onClose}>
                <Image
                  src="/img/logo/logobiancosunero.svg"
                  alt={site.name}
                  width={48}
                  height={48}
                  unoptimized
                  className="h-10 w-10 object-contain"
                />
                <span className="font-display text-lg font-semibold tracking-tight">
                  {site.name}
                </span>
              </Link>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi menu"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 text-cream transition hover:bg-cream hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="font-display text-[clamp(2.4rem,8vw,5rem)] font-semibold leading-none tracking-tight text-cream transition hover:text-accent"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.06, duration: 0.35 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <p className="px-6 pb-8 text-center text-sm text-cream/60">
            {site.location}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
