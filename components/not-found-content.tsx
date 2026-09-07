"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/button";
import { suggestRedirectsForPath } from "@/lib/not-found-suggestions";

export function NotFoundContent() {
  const pathname = usePathname() || "/";
  const suggestions = suggestRedirectsForPath(pathname, 4);

  return (
    <main className="bg-background text-foreground">
      <section className="bg-hero py-20 lg:py-28">
        <div className="page-shell max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Errore 404
          </p>
          <h1 className="font-display mt-4 text-[clamp(2.2rem,5vw,3.75rem)] font-semibold tracking-tight">
            Pagina non trovata
          </h1>
          <p className="mt-6 text-[1.1rem] leading-relaxed text-muted">
            L&apos;indirizzo{" "}
            <code className="rounded-md border border-border px-1.5 py-0.5 text-sm text-foreground">
              {pathname}
            </code>{" "}
            non esiste o è stato spostato. Ecco dove puoi andare.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/">Torna alla home</Button>
            <Button href="/contatti" variant="outline">
              Contatti
            </Button>
          </div>

          {suggestions.length > 0 ? (
            <div className="mt-14 border-t border-border pt-10">
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Destinazioni suggerite
              </h2>
              <ul className="mt-6 space-y-3">
                {suggestions.map((item) => (
                  <li key={`${item.from}-${item.to}`}>
                    <Link
                      href={item.to}
                      className="group block rounded-[1.25rem] border border-border px-5 py-4 transition hover:border-foreground/40"
                    >
                      <span className="font-display text-lg font-semibold tracking-tight">
                        {item.to}
                      </span>
                      <span className="mt-1 block text-sm text-muted">
                        {item.reason}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="mt-14 grid gap-3 sm:grid-cols-2">
              <li>
                <Link
                  href="/servizi"
                  className="block rounded-[1.25rem] border border-border px-5 py-4 transition hover:border-foreground/40"
                >
                  Servizi
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block rounded-[1.25rem] border border-border px-5 py-4 transition hover:border-foreground/40"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/comuni"
                  className="block rounded-[1.25rem] border border-border px-5 py-4 transition hover:border-foreground/40"
                >
                  Comuni
                </Link>
              </li>
              <li>
                <Link
                  href="/costo-sito-web"
                  className="block rounded-[1.25rem] border border-border px-5 py-4 transition hover:border-foreground/40"
                >
                  Costo sito web
                </Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
