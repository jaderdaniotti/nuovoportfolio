"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toolCategoryLabels, toolsCatalog, type ToolCategory } from "@/lib/tools-catalog";

const categoryOrder: ToolCategory[] = [
  "seo-audit",
  "image",
  "converter",
  "document",
  "utility",
  "content",
  "tracking",
];

export function ToolsIndex() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | ToolCategory>("all");

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return toolsCatalog.filter((tool) => {
      const inCategory = activeCategory === "all" || tool.category === activeCategory;
      if (!inCategory) return false;
      if (!normalizedQuery) return true;
      const target = `${tool.name} ${tool.summary} ${tool.intent}`.toLowerCase();
      return target.includes(normalizedQuery);
    });
  }, [activeCategory, normalizedQuery]);

  return (
    <main className="w-full">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Toolbox</p>
        <h1 className="mt-3 font-display text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          Tools gratuiti per SEO, conversioni e produttività web
        </h1>
        <p className="mt-4 text-muted">
          Una libreria in crescita con convertitori, analizzatori SEO e utility pratiche. Al momento è pronta
          la struttura completa: ogni tool ha già una pagina dedicata ottimizzata SEO.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-panel text-panel-fg p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Tool nel catalogo</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{toolsCatalog.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-panel text-panel-fg p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Categorie</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{categoryOrder.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-panel text-panel-fg p-4">
          <p className="text-xs uppercase tracking-wide text-muted">Risultati filtrati</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{filtered.length}</p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-panel text-panel-fg p-5 md:p-6">
        <label htmlFor="tool-search" className="text-sm font-medium text-muted">
          Cerca un tool
        </label>
        <input
          id="tool-search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Es. JSON formatter, audit SEO, image converter..."
          className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground outline-none ring-accent transition focus:border-zinc-400 focus:ring-2"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${
              activeCategory === "all"
                ? "border-zinc-900 bg-foreground text-background"
                : "border-border bg-panel text-panel-fg text-muted hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            Tutti
          </button>
          {categoryOrder.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  active
                    ? "border-zinc-900 bg-foreground text-background"
                    : "border-border bg-panel text-panel-fg text-muted hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {toolCategoryLabels[category]}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <article key={tool.slug} className="rounded-xl border border-border bg-panel text-panel-fg p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-muted">
              {toolCategoryLabels[tool.category]}
            </p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-foreground">{tool.name}</h2>
            <p className="mt-2 text-sm text-muted">{tool.summary}</p>
            <p className="mt-1 text-xs text-muted">Obiettivo: {tool.intent}</p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="rounded-full border border-border px-2 py-1 text-xs text-muted">
                {tool.ready === "ui-ready" ? "Pronto" : "In sviluppo"}
              </span>
              <Link
                href={`/tools/${tool.slug}`}
                className="rounded-full border border-zinc-900 bg-foreground px-3 py-1.5 text-xs font-medium text-background transition hover:opacity-90"
              >
                Apri tool
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
