import Link from "next/link";
import { ComuniAnimatedList } from "@/components/comuni-animated-list";
import { COMUNI_HUB_PATH, comuneBasePath } from "@/lib/comune-paths";
import type { ComuneListItem } from "@/lib/comuni";
import { shouldPrefetchHref } from "@/lib/prefetch";

function hubHref(opts: {
  q?: string;
  regione?: string;
  provincia?: string;
}) {
  const params = new URLSearchParams();
  if (opts.q) params.set("q", opts.q);
  if (opts.regione) params.set("regione", opts.regione);
  if (opts.provincia) params.set("provincia", opts.provincia);
  const qs = params.toString();
  return qs ? `${COMUNI_HUB_PATH}?${qs}` : COMUNI_HUB_PATH;
}

export function ComuniHubContent({
  query,
  regione,
  provincia,
  regioni,
  province,
  topCities,
  fvgCities,
  results,
  totalIndexable,
}: {
  query: string;
  regione: string;
  provincia: string;
  regioni: string[];
  province: string[];
  topCities: ComuneListItem[];
  fvgCities: ComuneListItem[];
  results: ComuneListItem[];
  totalIndexable: number;
}) {
  const hasFilters = Boolean(query || regione || provincia);
  const shown = hasFilters ? results : [];

  return (
    <>
      <section className="bg-hero pt-16 pb-12 text-foreground lg:pt-24 lg:pb-16">
        <div className="page-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Hub comuni · Italia
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.2rem,5.5vw,4.25rem)] font-semibold leading-[1.04] tracking-tight">
            Siti web localizzati per comune
          </h1>
          <p className="mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-muted">
            Sono Jader Daniotti. Qui trovi {totalIndexable.toLocaleString("it-IT")}{" "}
            pagine locali: cerca il tuo comune, filtra per regione o parti dalle
            città più popolate.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-background py-16 text-foreground lg:py-20">
        <div className="page-shell">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-tight">
            Città più popolate
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {topCities.map((comune) => (
              <li key={comune.slug}>
                <Link
                  href={comuneBasePath(comune.slug)}
                  prefetch={shouldPrefetchHref(comuneBasePath(comune.slug))}
                  className="flex h-full items-center rounded-[1.25rem] border border-border px-5 py-4 font-display text-lg font-semibold tracking-tight transition hover:border-foreground/40"
                >
                  {comune.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {fvgCities.length > 0 ? (
        <section className="border-t border-border bg-background py-16 text-foreground lg:py-20">
          <div className="page-shell">
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-tight">
              Friuli Venezia Giulia (dove lavoro)
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Parto da Udine: qui sotto le pagine locali FVG più utili per chi
              cerca un referente sul territorio.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {fvgCities.map((comune) => (
                <li key={comune.slug}>
                  <Link
                    href={comuneBasePath(comune.slug)}
                    prefetch={shouldPrefetchHref(comuneBasePath(comune.slug))}
                    className="flex h-full flex-col rounded-[1.25rem] border border-border px-5 py-4 transition hover:border-foreground/40"
                  >
                    <span className="font-display text-lg font-semibold tracking-tight">
                      {comune.nome}
                    </span>
                    <span className="mt-1 text-sm text-muted">
                      {comune.provincia} ({comune.sigla})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link
                href={hubHref({ regione: "Friuli-Venezia Giulia" })}
                className="text-sm font-semibold underline-offset-4 transition hover:underline"
              >
                Tutti i comuni FVG →
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      <section className="border-t border-border bg-background py-16 text-foreground lg:py-20">
        <div className="page-shell">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-tight">
            Esplora per regione
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2">
            {regioni.map((item) => (
              <li key={item}>
                <Link
                  href={hubHref({ regione: item })}
                  className={`inline-flex rounded-md border px-3 py-2 text-sm transition hover:border-foreground/40 ${
                    regione === item
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground"
                  }`}
                >
                  {item}
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
            <div className="flex items-end gap-3">
              <button
                type="submit"
                className="btn-accent h-12 w-full rounded-md px-6 text-sm font-semibold uppercase tracking-[0.08em] transition hover:brightness-95 md:w-auto"
              >
                Filtra
              </button>
              {hasFilters ? (
                <Link
                  href={COMUNI_HUB_PATH}
                  className="inline-flex h-12 items-center rounded-md border border-border px-4 text-sm transition hover:border-foreground/40"
                >
                  Reset
                </Link>
              ) : null}
            </div>
          </form>

          <div className="mt-14">
            {!hasFilters ? (
              <p className="text-muted">
                Usa ricerca o regione per elencare i comuni. Senza filtri mostro
                solo le selezioni sopra, così la pagina resta leggera.
              </p>
            ) : results.length === 0 ? (
              <p className="text-muted">
                Nessun comune trovato. Prova un altro nome o togli qualche filtro.
              </p>
            ) : (
              <>
                <p className="mb-6 text-sm text-muted">
                  {results.length.toLocaleString("it-IT")} risultati
                  {regione ? ` · ${regione}` : ""}
                  {provincia ? ` · ${provincia}` : ""}
                  {query ? ` · “${query}”` : ""}
                </p>
                <ComuniAnimatedList comuni={shown} />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
