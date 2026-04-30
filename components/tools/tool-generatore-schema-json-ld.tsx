"use client";

import { useCallback, useMemo, useState } from "react";

type SchemaKind = "WebPage" | "Article" | "Organization" | "LocalBusiness" | "FAQPage" | "BreadcrumbList";

const SCHEMA_OPTIONS: { value: SchemaKind; label: string; hint: string }[] = [
  { value: "WebPage", label: "WebPage", hint: "Pagina generica: nome, descrizione, URL." },
  { value: "Article", label: "Article", hint: "Contenuti editoriali: titolo, autore, data, immagine." },
  { value: "Organization", label: "Organization", hint: "Brand o entità: nome, sito, logo, profili social." },
  { value: "LocalBusiness", label: "LocalBusiness", hint: "Attività locale: indirizzo strutturato e telefono." },
  { value: "FAQPage", label: "FAQPage", hint: "Domande frequenti: elenco Q&A per snippet FAQ in SERP." },
  { value: "BreadcrumbList", label: "BreadcrumbList", hint: "Percorso di navigazione gerarchico sul sito." },
];

function omitEmptyDeep(value: unknown): unknown {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "string") {
    const t = value.trim();
    return t === "" ? undefined : t;
  }
  if (Array.isArray(value)) {
    const next = value.map(omitEmptyDeep).filter((v) => v !== undefined);
    return next.length ? next : undefined;
  }
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      const cleaned = omitEmptyDeep(v);
      if (cleaned !== undefined) out[k] = cleaned;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return value;
}

function buildSchema(
  kind: SchemaKind,
  fields: {
    name: string;
    description: string;
    url: string;
    headline: string;
    authorName: string;
    datePublished: string;
    imageUrl: string;
    logoUrl: string;
    sameAs: string;
    telephone: string;
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    faqRows: { q: string; a: string }[];
    crumbs: { name: string; item: string }[];
  },
): Record<string, unknown> | null {
  const base = { "@context": "https://schema.org", "@type": kind };

  switch (kind) {
    case "WebPage": {
      const body = {
        ...base,
        name: fields.name,
        description: fields.description,
        url: fields.url,
      };
      const cleaned = omitEmptyDeep(body) as Record<string, unknown> | undefined;
      if (!cleaned || Object.keys(cleaned).length <= 2) return null;
      return cleaned;
    }
    case "Article": {
      if (!fields.headline.trim()) return null;
      const author = fields.authorName.trim()
        ? { "@type": "Person", name: fields.authorName.trim() }
        : undefined;
      const body = {
        ...base,
        headline: fields.headline,
        description: fields.description,
        url: fields.url,
        image: fields.imageUrl,
        datePublished: fields.datePublished || undefined,
        author,
      };
      return omitEmptyDeep(body) as Record<string, unknown>;
    }
    case "Organization": {
      if (!fields.name.trim()) return null;
      const sameAs = fields.sameAs
        .split(/[\n,]+/g)
        .map((s) => s.trim())
        .filter(Boolean);
      const body = {
        ...base,
        name: fields.name,
        url: fields.url,
        logo: fields.logoUrl,
        sameAs: sameAs.length ? sameAs : undefined,
      };
      return omitEmptyDeep(body) as Record<string, unknown>;
    }
    case "LocalBusiness": {
      if (!fields.name.trim()) return null;
      const address = omitEmptyDeep({
        "@type": "PostalAddress",
        streetAddress: fields.street,
        addressLocality: fields.city,
        addressRegion: fields.region,
        postalCode: fields.postalCode,
        addressCountry: fields.country,
      });
      const body = {
        ...base,
        name: fields.name,
        url: fields.url,
        telephone: fields.telephone,
        address,
      };
      return omitEmptyDeep(body) as Record<string, unknown>;
    }
    case "FAQPage": {
      const mainEntity = fields.faqRows
        .map((row) => {
          const q = row.q.trim();
          const a = row.a.trim();
          if (!q || !a) return null;
          return {
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          };
        })
        .filter(Boolean);
      if (!mainEntity.length) return null;
      const body = { ...base, mainEntity };
      return omitEmptyDeep(body) as Record<string, unknown>;
    }
    case "BreadcrumbList": {
      const items = fields.crumbs
        .map((c, i) => {
          const name = c.name.trim();
          const item = c.item.trim();
          if (!name || !item) return null;
          return {
            "@type": "ListItem",
            position: i + 1,
            name,
            item,
          };
        })
        .filter(Boolean);
      if (!items.length) return null;
      const body = { ...base, itemListElement: items };
      return omitEmptyDeep(body) as Record<string, unknown>;
    }
    default:
      return null;
  }
}

function schemaHint(kind: SchemaKind): string {
  switch (kind) {
    case "WebPage":
      return "Compila almeno nome o URL per generare un WebPage minimale.";
    case "Article":
      return "Serve un headline. Data in formato ISO (YYYY-MM-DD) se la usi.";
    case "Organization":
      return "Serve il nome dell'organizzazione. sameAs: un URL per riga o separati da virgola.";
    case "LocalBusiness":
      return "Serve il nome dell'attività. Indirizzo: campi opzionali ma consigliati.";
    case "FAQPage":
      return "Ogni riga valida richiede domanda e risposta compilate.";
    case "BreadcrumbList":
      return "Ogni elemento ha etichetta e URL della pagina corrispondente.";
    default:
      return "";
  }
}

export function ToolGeneratoreSchemaJsonLd() {
  const [kind, setKind] = useState<SchemaKind>("WebPage");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [headline, setHeadline] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [sameAs, setSameAs] = useState("");
  const [telephone, setTelephone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("IT");
  const [faqRows, setFaqRows] = useState<{ q: string; a: string }[]>([
    { q: "", a: "" },
    { q: "", a: "" },
  ]);
  const [crumbs, setCrumbs] = useState<{ name: string; item: string }[]>([
    { name: "", item: "" },
    { name: "", item: "" },
  ]);
  const [wrapScript, setWrapScript] = useState(false);
  const [copyHint, setCopyHint] = useState<string | null>(null);

  const fields = useMemo(
    () => ({
      name,
      description,
      url,
      headline,
      authorName,
      datePublished,
      imageUrl,
      logoUrl,
      sameAs,
      telephone,
      street,
      city,
      region,
      postalCode,
      country,
      faqRows,
      crumbs,
    }),
    [
      name,
      description,
      url,
      headline,
      authorName,
      datePublished,
      imageUrl,
      logoUrl,
      sameAs,
      telephone,
      street,
      city,
      region,
      postalCode,
      country,
      faqRows,
      crumbs,
    ],
  );

  const schemaObject = useMemo(() => buildSchema(kind, fields), [kind, fields]);
  const jsonPretty = useMemo(
    () => (schemaObject ? JSON.stringify(schemaObject, null, 2) : ""),
    [schemaObject],
  );
  const outputBlock = useMemo(() => {
    if (!jsonPretty) return "";
    if (!wrapScript) return jsonPretty;
    return `<script type="application/ld+json">\n${jsonPretty}\n</script>`;
  }, [jsonPretty, wrapScript]);

  const flash = useCallback((msg: string) => {
    setCopyHint(msg);
    window.setTimeout(() => setCopyHint(null), 2200);
  }, []);

  const copy = useCallback(
    async (text: string, ok: string) => {
      try {
        await navigator.clipboard.writeText(text);
        flash(ok);
      } catch {
        flash("Copia non disponibile: seleziona il testo manualmente.");
      }
    },
    [flash],
  );

  const addFaqRow = useCallback(() => {
    setFaqRows((rows) => (rows.length >= 12 ? rows : [...rows, { q: "", a: "" }]));
  }, []);

  const addCrumb = useCallback(() => {
    setCrumbs((rows) => (rows.length >= 12 ? rows : [...rows, { name: "", item: "" }]));
  }, []);

  return (
    <section className="mt-8 rounded-xl border border-zinc-200 bg-gradient-to-b from-violet-50/80 to-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Generatore schema JSON-LD</h2>
          <p className="mt-2 text-sm text-zinc-700">
            Costruisci markup strutturato valido per Google Ricerca: scegli il tipo schema, compila i campi e copia il
            JSON (o l&apos;intero tag <code className="rounded bg-violet-100 px-1 text-xs">&lt;script&gt;</code>) da
            incollare nel <code className="rounded bg-violet-100 px-1 text-xs">&lt;head&gt;</code> o nel tuo framework.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-zinc-700">
            Tipo di schema
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as SchemaKind)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
            >
              {SCHEMA_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs text-zinc-600">{SCHEMA_OPTIONS.find((o) => o.value === kind)?.hint}</p>
          <p className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-xs text-violet-950">
            {schemaHint(kind)}
          </p>

          {(kind === "WebPage" || kind === "Article" || kind === "Organization" || kind === "LocalBusiness") && (
            <>
              {(kind === "WebPage" || kind === "Organization" || kind === "LocalBusiness") && (
                <label className="block text-sm font-medium text-zinc-700">
                  Nome {kind === "WebPage" ? "(titolo pagina)" : ""}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={
                      kind === "LocalBusiness" ? "Es. Studio Rossi — consulenza SEO" : "Es. Chi siamo | Brand"
                    }
                    className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                    autoComplete="off"
                  />
                </label>
              )}

              {kind === "Article" && (
                <label className="block text-sm font-medium text-zinc-700">
                  Headline (titolo articolo) *
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Es. Guida pratica alla SEO locale in Friuli"
                    className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                    autoComplete="off"
                  />
                </label>
              )}

              {(kind === "WebPage" || kind === "Article" || kind === "Organization") && (
                <label className="block text-sm font-medium text-zinc-700">
                  URL canonica
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.esempio.it/pagina"
                    className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                    autoComplete="off"
                  />
                </label>
              )}

              {kind === "LocalBusiness" && (
                <label className="block text-sm font-medium text-zinc-700">
                  URL sito / scheda
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.esempio.it/contatti"
                    className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                    autoComplete="off"
                  />
                </label>
              )}

              {(kind === "WebPage" || kind === "Article" || kind === "Organization") && (
                <label className="block text-sm font-medium text-zinc-700">
                  Descrizione breve
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Sintesi del contenuto o del brand in una o due frasi."
                    className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                  />
                </label>
              )}

              {kind === "Article" && (
                <>
                  <label className="block text-sm font-medium text-zinc-700">
                    Nome autore
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Es. Mario Bianchi"
                      className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                      autoComplete="off"
                    />
                  </label>
                  <label className="block text-sm font-medium text-zinc-700">
                    Data di pubblicazione
                    <input
                      type="date"
                      value={datePublished}
                      onChange={(e) => setDatePublished(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                    />
                  </label>
                  <label className="block text-sm font-medium text-zinc-700">
                    Immagine in evidenza (URL)
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://www.esempio.it/immagine.jpg"
                      className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                      autoComplete="off"
                    />
                  </label>
                </>
              )}

              {kind === "Organization" && (
                <>
                  <label className="block text-sm font-medium text-zinc-700">
                    Logo (URL immagine)
                    <input
                      type="url"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://www.esempio.it/logo.png"
                      className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                      autoComplete="off"
                    />
                  </label>
                  <label className="block text-sm font-medium text-zinc-700">
                    Profili social / sameAs (URL, uno per riga o comma-separated)
                    <textarea
                      value={sameAs}
                      onChange={(e) => setSameAs(e.target.value)}
                      rows={3}
                      placeholder="https://www.linkedin.com/company/...\nhttps://www.instagram.com/..."
                      className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                    />
                  </label>
                </>
              )}

              {kind === "LocalBusiness" && (
                <>
                  <label className="block text-sm font-medium text-zinc-700">
                    Telefono
                    <input
                      type="text"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="+39 0432 123456"
                      className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                      autoComplete="off"
                    />
                  </label>
                  <label className="block text-sm font-medium text-zinc-700">
                    Indirizzo (via e numero)
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Via Roma 10"
                      className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                      autoComplete="off"
                    />
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-zinc-700">
                      Città
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Udine"
                        className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                        autoComplete="off"
                      />
                    </label>
                    <label className="block text-sm font-medium text-zinc-700">
                      Provincia / regione
                      <input
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        placeholder="UD / Friuli-Venezia Giulia"
                        className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                        autoComplete="off"
                      />
                    </label>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-zinc-700">
                      CAP
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="33100"
                        className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                        autoComplete="off"
                      />
                    </label>
                    <label className="block text-sm font-medium text-zinc-700">
                      Paese (codice)
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="IT"
                        className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
                        autoComplete="off"
                      />
                    </label>
                  </div>
                </>
              )}
            </>
          )}

          {kind === "FAQPage" && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-zinc-700">Domande e risposte</p>
                <button
                  type="button"
                  onClick={addFaqRow}
                  className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 transition hover:border-zinc-400"
                >
                  Aggiungi coppia
                </button>
              </div>
              {faqRows.map((row, i) => (
                <div key={i} className="rounded-lg border border-zinc-200 bg-white p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">FAQ {i + 1}</p>
                  <label className="mt-2 block text-xs font-medium text-zinc-600">
                    Domanda
                    <input
                      type="text"
                      value={row.q}
                      onChange={(e) => {
                        const v = e.target.value;
                        setFaqRows((rows) => rows.map((r, j) => (j === i ? { ...r, q: v } : r)));
                      }}
                      className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2"
                      autoComplete="off"
                    />
                  </label>
                  <label className="mt-2 block text-xs font-medium text-zinc-600">
                    Risposta
                    <textarea
                      value={row.a}
                      onChange={(e) => {
                        const v = e.target.value;
                        setFaqRows((rows) => rows.map((r, j) => (j === i ? { ...r, a: v } : r)));
                      }}
                      rows={2}
                      className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2"
                    />
                  </label>
                </div>
              ))}
            </div>
          )}

          {kind === "BreadcrumbList" && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-zinc-700">Elementi percorso</p>
                <button
                  type="button"
                  onClick={addCrumb}
                  className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 transition hover:border-zinc-400"
                >
                  Aggiungi livello
                </button>
              </div>
              {crumbs.map((row, i) => (
                <div key={i} className="rounded-lg border border-zinc-200 bg-white p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Livello {i + 1}</p>
                  <label className="mt-2 block text-xs font-medium text-zinc-600">
                    Etichetta
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => {
                        const v = e.target.value;
                        setCrumbs((rows) => rows.map((r, j) => (j === i ? { ...r, name: v } : r)));
                      }}
                      placeholder="Es. Blog"
                      className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2"
                      autoComplete="off"
                    />
                  </label>
                  <label className="mt-2 block text-xs font-medium text-zinc-600">
                    URL
                    <input
                      type="url"
                      value={row.item}
                      onChange={(e) => {
                        const v = e.target.value;
                        setCrumbs((rows) => rows.map((r, j) => (j === i ? { ...r, item: v } : r)));
                      }}
                      placeholder="https://..."
                      className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2"
                      autoComplete="off"
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-zinc-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Anteprima output</p>
            <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={wrapScript}
                onChange={(e) => setWrapScript(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-400 text-violet-700 focus:ring-violet-500"
              />
              Includi tag <code className="rounded bg-zinc-100 px-1 text-xs">&lt;script type=&quot;application/ld+json&quot;&gt;</code>
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!outputBlock}
                onClick={() => copy(outputBlock, wrapScript ? "Snippet con tag script copiato." : "JSON-LD copiato.")}
                className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copia output
              </button>
              {jsonPretty ? (
                <button
                  type="button"
                  onClick={() => copy(jsonPretty, "Solo JSON copiato.")}
                  className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 transition hover:border-zinc-400"
                >
                  Copia solo JSON
                </button>
              ) : null}
            </div>
            <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-md border border-zinc-900 bg-zinc-950 p-3 text-xs leading-relaxed text-emerald-100">
              {outputBlock || "// Compila i campi richiesti per generare JSON-LD valido e minimale."}
            </pre>
          </div>

          {copyHint ? (
            <p className="text-xs font-medium text-emerald-800" role="status">
              {copyHint}
            </p>
          ) : null}

          <p className="text-xs text-zinc-500">
            Verifica sempre il markup con la{" "}
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-violet-700 underline decoration-violet-300 underline-offset-2 hover:text-violet-900"
            >
              Rich Results Test
            </a>{" "}
            di Google prima della messa online. Questo tool genera una base: proprietà aggiuntive (rating, offer,
            publisher) vanno integrate sul caso d&apos;uso reale.
          </p>
        </div>
      </div>
    </section>
  );
}
