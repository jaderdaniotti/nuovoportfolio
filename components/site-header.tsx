"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/button";
import { SiteMenu } from "@/components/site-menu";
import StaggeredMenu from "@/components/staggered-menu";
import { useTheme } from "@/components/theme-provider";
import { navItems, site } from "@/lib/home-content";
import { cn } from "@/lib/cn";

const staggeredItems = navItems.map((item) => ({
  label: item.label,
  ariaLabel: item.label,
  link: item.href,
}));

const staggeredSocials = [
  { label: "Email", link: `mailto:${site.email}` },
  { label: "WhatsApp", link: `https://wa.me/${site.whatsapp}` },
];

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleTheme, theme } = useTheme();

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[70] border-b border-foreground/10 bg-background",
          className,
        )}
      >
        <div className="page-shell flex h-[4.5rem] min-w-0 items-center justify-between gap-4 md:h-[5.25rem]">
          <Link
            href="/"
            className="flex items-center gap-3 text-foreground"
            aria-label={site.name}
          >
            <BrandLogo />
            <span className="font-display hidden text-lg uppercase font-semibold tracking-tight sm:inline">
              {site.name}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "light" ? "Passa al tema scuro" : "Passa al tema chiaro"
              }
              title={theme === "light" ? "Tema scuro" : "Tema chiaro"}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-foreground/15 text-foreground transition hover:border-foreground/40"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>

            <Button
              href="/contatti"
              size="sm"
              className="hidden md:inline-flex"
            >
              Parliamo del tuo progetto
            </Button>

            <div className="hidden xl:block">
              <StaggeredMenu
                position="right"
                items={staggeredItems}
                socialItems={staggeredSocials}
                displaySocials
                displayItemNumbering
                showLogo={false}
                colors={
                  theme === "light"
                    ? ["#E3FF04", "#0A0C00"]
                    : ["#E3FF04", "#F6F5F3"]
                }
                accentColor="#E3FF04"
                menuButtonColor={theme === "light" ? "#0A0C00" : "#F6F5F3"}
                openMenuButtonColor={theme === "light" ? "#0A0C00" : "#F6F5F3"}
                changeMenuColorOnOpen={false}
              />
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Apri navigazione"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-foreground/15 text-foreground transition hover:border-foreground/40 xl:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <SiteMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
