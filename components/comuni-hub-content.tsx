import Link from "next/link";
import { ComuniAnimatedList } from "@/components/comuni-animated-list";
import { COMUNI_HUB_PATH, comuneBasePath } from "@/lib/comune-paths";
import type { ComuneListItem } from "@/lib/comuni";

export function ComuniHubContent({
  query,
  regione,
  provincia,
  regioni,
  province,
  topCities,
  results,
}: {
  query: string;
  regione: string;
  provincia: string;
  regioni: string[];
  province: string[];
  topCities: ComuneListItem[];
  results: ComuneListItem[];
}) {
  const hasFilters = Boolean(query || regione || provincia);

  return (
    <>
      <section className="bg-hero pt-16 pb-12 text-foreground lg:pt-24 lg:pb-16">
        <div className="page-shell">
          <h1 className="font-display max-w-4xl text-[clamp(2.2rem,5.5vw,4.25rem)] font-semibold leading-[1.04] tracking-tight">
            Ecco le zone che copriamo
          </h1>
        </div>
      </section>

      <section className="border-t border-border bg-background py-16 text-foreground lg:py-20">
        <div className="page-shell">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-tight">
            Le 10 città più popolate d’Italia
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {topCities.map((comune) => (
              <li key={comune.slug}>
                <Link
                  href={comuneBasePath(comune.slug)}
                  className="flex h-full items-center rounded-[1.25rem] border border-border px-5 py-4 font-display text-lg font-semibold tracking-tight transition hover:border-foreground/40"
                >
                  {comune.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-background py-16 text-foreground lg:py-20">
        <div className="page-shell">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-tight">
            Cerca la tua città
          </h2>
          <form
            action={COMUNI_HUB_PATH}
            method="get"
            className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
          >
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Cerca comune
              </span>
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Nome, sigla, provincia, regione"
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-foreground/40"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Regione
              </span>
              <select
                name="regione"
                defaultValue={regione}
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-foreground/40"
              >
                <option value="">Tutte</option>
                {regioni.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Provincia
              </span>
              <select
                name="provincia"
                defaultValue={provincia}
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-foreground/40"
              >
                <option value="">Tutte</option>
                {province.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-end">
              <button
                type="submit"
                className="btn-accent h-12 w-full rounded-md px-6 text-sm font-semibold uppercase tracking-[0.08em] transition hover:brightness-95 md:w-auto"
              >
                Filtra
              </button>
            </div>
          </form>

          <div className="mt-14">
            {results.length === 0 ? (
              <p className="text-muted">
                Nessun comune trovato. Prova un altro nome o togli qualche filtro.
              </p>
            ) : (
              <>
                {hasFilters ? (
                  <p className="mb-6 text-sm text-muted">
                    {results.length.toLocaleString("it-IT")} risultati
                  </p>
                ) : null}
                <ComuniAnimatedList comuni={results} />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
