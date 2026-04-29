"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ComuneData } from "@/lib/comuni";

type ComuniHubContentProps = {
  comuni: ComuneData[];
};

const MAX_RESULTS = 240;

export function ComuniHubContent({ comuni }: ComuniHubContentProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("Tutte");
  const [province, setProvince] = useState("Tutte");

  const normalizedQuery = query.trim().toLowerCase();

  const regions = useMemo(() => {
    return ["Tutte", ...new Set(comuni.map((comune) => comune.regione?.nome ?? "").filter(Boolean))];
  }, [comuni]);

  const provinces = useMemo(() => {
    const list = comuni
      .filter((comune) => region === "Tutte" || comune.regione?.nome === region)
      .map((comune) => comune.provincia?.nome ?? "")
      .filter(Boolean);

    return ["Tutte", ...new Set(list)];
  }, [comuni, region]);

  const filtered = useMemo(() => {
    return comuni.filter((comune) => {
      const byRegion = region === "Tutte" || comune.regione?.nome === region;
      const byProvince = province === "Tutte" || comune.provincia?.nome === province;
      if (!byRegion || !byProvince) return false;
      if (!normalizedQuery) return true;

      return (
        comune.nome.toLowerCase().includes(normalizedQuery) ||
        comune.sigla.toLowerCase().includes(normalizedQuery) ||
        (comune.provincia?.nome ?? "").toLowerCase().includes(normalizedQuery) ||
        (comune.regione?.nome ?? "").toLowerCase().includes(normalizedQuery)
      );
    });
  }, [comuni, normalizedQuery, province, region]);

  const comuniTop = useMemo(() => {
    return [...comuni]
      .sort((a, b) => (b.popolazione ?? 0) - (a.popolazione ?? 0))
      .slice(0, 12);
  }, [comuni]);

  const visibleResults = filtered.slice(0, MAX_RESULTS);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Copertura locale</p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
          In che comuni lavoro in Italia
        </h1>
        <p className="mt-4 text-zinc-700">
          Lavoro con aziende e professionisti in tutti i comuni italiani. Seleziona regione e provincia,
          oppure cerca direttamente il tuo comune: trovi subito la pagina locale dedicata.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Comuni coperti</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900">{comuni.length}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Regioni coperte</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900">{regions.length - 1}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Risultati filtrati</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900">{filtered.length}</p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
        <label htmlFor="comuni-search" className="text-sm font-medium text-zinc-700">
          Cerca il tuo comune
        </label>
        <input
          id="comuni-search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Es. Milano, Roma, Torino, Udine..."
          className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
        />

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block font-medium text-zinc-700">Regione</span>
            <select
              value={region}
              onChange={(event) => {
                setRegion(event.target.value);
                setProvince("Tutte");
              }}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
            >
              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-medium text-zinc-700">Provincia</span>
            <select
              value={province}
              onChange={(event) => setProvince(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
            >
              {provinces.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {!normalizedQuery && region === "Tutte" && province === "Tutte" ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-zinc-900">Comuni principali</h2>
          <p className="mt-1 text-sm text-zinc-600">
            I centri con maggiore popolazione, utili per iniziare da mercati ad alta domanda.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {comuniTop.map((comune) => (
              <li key={comune.slug}>
                <Link
                  href={`/comuni/${comune.slug}`}
                  className="inline-flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
                >
                  <span>
                    {comune.nome} ({comune.sigla})
                  </span>
                  <span className="text-xs text-zinc-500">
                    {(comune.popolazione ?? 0).toLocaleString("it-IT")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10">
        {filtered.length > MAX_RESULTS ? (
          <p className="mb-4 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
            Mostro i primi {MAX_RESULTS} risultati su {filtered.length}. Affina ricerca o filtri per trovare
            subito il tuo comune.
          </p>
        ) : null}

        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {visibleResults.map((comune) => (
            <li key={comune.slug}>
              <Link
                href={`/comuni/${comune.slug}`}
                className="inline-flex w-full flex-col rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
              >
                <span className="font-medium">
                  {comune.nome} ({comune.sigla})
                </span>
                <span className="mt-0.5 text-xs text-zinc-500">
                  {comune.provincia?.nome} · {comune.regione?.nome}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
