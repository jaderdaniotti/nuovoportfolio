import type { Metadata } from "next";
import Link from "next/link";
import { noindexRobots } from "@/lib/seo-robots";

export const metadata: Metadata = {
  title: "Pagina non trovata",
  robots: noindexRobots,
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-10 md:px-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-[-10%] h-72 w-72 rounded-full bg-violet-500/15 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -right-24 bottom-[-12%] h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl md:h-96 md:w-96" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_40%),radial-gradient(circle_at_bottom,rgba(9,9,11,0.09),transparent_45%)]" />
      </div>

      <section className="relative w-full max-w-3xl rounded-3xl border border-zinc-200/80 bg-white/85 p-6 shadow-[0_28px_80px_-35px_rgba(38,20,74,0.45)] backdrop-blur-xl dark:border-zinc-700/70 dark:bg-zinc-900/80 md:p-10">
        <p className="mb-4 inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-200">
          Errore 404
        </p>

        <h1 className="horizon text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-6xl">
          Pagina non trovata
        </h1>

        <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-300 md:text-lg">
          L&apos;indirizzo che hai aperto non esiste o e stato spostato. Torna al percorso
          principale oppure vai direttamente a una sezione utile del sito.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-linear-to-r from-violet-600 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Torna alla home
          </Link>
          <Link
            href="/#contatti"
            className="inline-flex items-center rounded-full border border-zinc-300 bg-white/90 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
          >
            Vai ai contatti
          </Link>
        </div>

        <div className="mt-8 grid gap-3 text-sm text-zinc-600 dark:text-zinc-300 sm:grid-cols-2">
          <Link
            href="/comuni"
            className="rounded-2xl border border-zinc-200/80 bg-zinc-50/90 px-4 py-3 transition hover:border-violet-300 hover:bg-violet-50/60 dark:border-zinc-700 dark:bg-zinc-800/70 dark:hover:border-violet-500/50 dark:hover:bg-violet-500/10"
          >
            Esplora la sezione Comuni
          </Link>
          <Link
            href="/blog"
            className="rounded-2xl border border-zinc-200/80 bg-zinc-50/90 px-4 py-3 transition hover:border-violet-300 hover:bg-violet-50/60 dark:border-zinc-700 dark:bg-zinc-800/70 dark:hover:border-violet-500/50 dark:hover:bg-violet-500/10"
          >
            Leggi gli articoli del blog
          </Link>
        </div>
      </section>
    </main>
  );
}
