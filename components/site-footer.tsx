import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-950">{siteConfig.name}</p>
          <p className="mt-1 max-w-md text-sm text-zinc-600">
            Web design, UI/UX e sviluppo moderno — Udine, Friuli Venezia Giulia.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
          <Link href="/blog" className="hover:text-violet-700">
            Blog
          </Link>
          <a href={siteConfig.links.email} className="hover:text-violet-700">
            Email
          </a>
          <Link href="#contatti" className="hover:text-violet-700">
            Contatti
          </Link>
        </div>
      </div>
      <div className="border-t border-zinc-200/80 py-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {siteConfig.name}. Tutti i diritti riservati.
      </div>
    </footer>
  );
}
