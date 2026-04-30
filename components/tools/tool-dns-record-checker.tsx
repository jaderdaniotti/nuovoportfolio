"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ALL_DNS_RECORD_TYPES,
  DNS_LOOKUP_DEFAULT_TYPES,
  formatDnsLookupReport,
  normalizeDnsHostname,
  type DnsLookupApiResponse,
  type DnsLookupOk,
  type DnsRecordType,
} from "@/lib/dns-record-checker";

const SAMPLE_HOST = "google.com";

export function ToolDnsRecordChecker() {
  const [hostname, setHostname] = useState("");
  const [selected, setSelected] = useState<Set<DnsRecordType>>(() => new Set(DNS_LOOKUP_DEFAULT_TYPES));
  const [result, setResult] = useState<DnsLookupOk | null>(null);
  const [remoteError, setRemoteError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleType = useCallback((t: DnsRecordType) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(t)) {
        if (next.size <= 1) return prev;
        next.delete(t);
      } else if (next.size >= 8) {
        return prev;
      } else {
        next.add(t);
      }
      return next;
    });
  }, []);

  const lookup = useCallback(async () => {
    const norm = normalizeDnsHostname(hostname);
    if (!norm) {
      setRemoteError("Inserisci un dominio valido (es. example.com) o un URL https da cui estrarre l’host.");
      setResult(null);
      return;
    }
    if (selected.size === 0) {
      setRemoteError("Seleziona almeno un tipo di record (massimo 8).");
      setResult(null);
      return;
    }

    setLoading(true);
    setRemoteError(null);
    setResult(null);

    try {
      const res = await fetch("/api/tools/dns-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hostname,
          types: [...selected],
        }),
      });

      const data = (await res.json()) as DnsLookupApiResponse;
      if (!data.ok) {
        setRemoteError(data.error ?? `Errore HTTP ${res.status}`);
        return;
      }
      setResult(data);
    } catch {
      setRemoteError("Richiesta fallita (rete o timeout).");
    } finally {
      setLoading(false);
    }
  }, [hostname, selected]);

  const loadSample = useCallback(() => {
    setHostname(SAMPLE_HOST);
    setSelected(new Set(DNS_LOOKUP_DEFAULT_TYPES));
    setResult(null);
    setRemoteError(null);
  }, []);

  const clearAll = useCallback(() => {
    setHostname("");
    setSelected(new Set(DNS_LOOKUP_DEFAULT_TYPES));
    setResult(null);
    setRemoteError(null);
  }, []);

  const copyReport = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatDnsLookupReport(result));
    } catch {
      // ignore
    }
  }, [result]);

  const sortedTypes = useMemo(() => [...ALL_DNS_RECORD_TYPES], []);

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-sky-50/40 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">DNS record checker</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Interroga i record DNS pubblici dal resolver del server Next.js (non dal tuo browser): comodo per MX, NS,{" "}
              <span className="whitespace-nowrap">A/AAAA</span> e stringhe TXT (SPF, DKIM, DMARC). Localhost, domini{" "}
              <code className="text-zinc-700">.local</code> e IP privati non sono consentiti; puoi analizzare anche nomi
              come <code className="text-zinc-700">_dmarc.example.com</code> senza record web. Timeout indicativo ~9s per
              tipo; fino a 8 tipi in parallelo per richiesta.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={loadSample}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Carica esempio
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Svuota
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">Dominio o URL</span>
            <input
              type="text"
              value={hostname}
              onChange={(e) => setHostname(e.target.value)}
              placeholder="example.com o https://example.com/path"
              autoComplete="off"
              spellCheck={false}
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2"
            />
          </label>

          <fieldset className="rounded-xl border border-zinc-200 bg-white/80 p-4">
            <legend className="px-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Tipi record (max 8)
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {sortedTypes.map((t) => (
                <label
                  key={t}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-800 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sky-500"
                >
                  <input
                    type="checkbox"
                    checked={selected.has(t)}
                    onChange={() => toggleType(t)}
                    className="rounded border-zinc-400 text-sky-600 focus:ring-sky-500"
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={lookup}
            disabled={loading}
            className="rounded-full border border-sky-600 bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Interrogazione…" : "Interroga DNS"}
          </button>
          {result ? (
            <button
              type="button"
              onClick={copyReport}
              className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Copia report
            </button>
          ) : null}
        </div>
      </div>

      {remoteError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">{remoteError}</div>
      ) : null}

      {result ? (
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm md:p-6">
          <div className="rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-950">
            {result.hostname} · {result.ms} ms · {result.sections.length} tipi richiesti
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {result.sections.map((sec) => (
              <div key={sec.type} className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4">
                <h3 className="text-sm font-semibold text-zinc-900">{sec.type}</h3>
                {!sec.ok ?
                  <p className="mt-2 text-xs text-rose-700">
                    {sec.error}
                    {sec.code ? ` (${sec.code})` : ""}
                  </p>
                : sec.records.length === 0 ?
                  <p className="mt-2 text-xs text-zinc-600">Nessun record.</p>
                : <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-zinc-100 bg-zinc-900 p-3 font-mono text-[11px] leading-relaxed text-zinc-100">
                    {sec.records.map((r, i) => (
                      <span key={i}>
                        {JSON.stringify(r)}
                        {"\n"}
                      </span>
                    ))}
                  </pre>
                }
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
