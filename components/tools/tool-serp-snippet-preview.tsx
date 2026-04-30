"use client";

import { useMemo, useState } from "react";

type Viewport = "desktop" | "mobile";

function normalizeDisplayUrl(input: string) {
  const raw = input.trim();
  if (!raw) return "https://esempio.it/categoria/pagina-esempio";
  try {
    if (/^https?:\/\//i.test(raw)) {
      const parsed = new URL(raw);
      return parsed.href.replace(/\/$/, "") || parsed.origin;
    }
    const path = raw.startsWith("/") ? raw : `/${raw}`;
    return `https://esempio.it${path}`;
  } catch {
    return raw;
  }
}

function breadcrumbLabel(fullUrl: string) {
  try {
    const u = new URL(fullUrl);
    const host = u.hostname.replace(/^www\./, "");
    const path = `${u.pathname}${u.search}` || "/";
    const compact = path.length > 48 ? `${path.slice(0, 44)}…` : path;
    return `${host}${compact}`;
  } catch {
    return fullUrl;
  }
}

export function ToolSerpSnippetPreview() {
  const [title, setTitle] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [description, setDescription] = useState("");
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const displayUrl = useMemo(() => normalizeDisplayUrl(urlInput), [urlInput]);
  const crumb = useMemo(() => breadcrumbLabel(displayUrl), [displayUrl]);

  const titleTrim = title.trim();
  const descTrim = description.trim();
  const titleLen = titleTrim.length;
  const descLen = descTrim.length;

  const titleHint =
    titleLen === 0
      ? { label: "Manca il title", tone: "bg-red-50 text-red-800 border-red-200" }
      : titleLen < 35 || titleLen > 65
        ? { label: "Fuori range tipico (35–65)", tone: "bg-amber-50 text-amber-900 border-amber-200" }
        : { label: "Range SERP consigliato", tone: "bg-emerald-50 text-emerald-900 border-emerald-200" };

  const descHint =
    descLen === 0
      ? { label: "Manca la description", tone: "bg-red-50 text-red-800 border-red-200" }
      : descLen < 110 || descLen > 170
        ? { label: "Fuori range tipico (110–170)", tone: "bg-amber-50 text-amber-900 border-amber-200" }
        : { label: "Range SERP consigliato", tone: "bg-emerald-50 text-emerald-900 border-emerald-200" };

  const previewShell =
    viewport === "desktop"
      ? "max-w-[652px] rounded-none border border-zinc-200 bg-white p-6 shadow-sm"
      : "mx-auto max-w-[360px] rounded-[28px] border border-zinc-300 bg-white p-4 shadow-md ring-1 ring-black/5";

  const titleClamp = viewport === "desktop" ? "line-clamp-1" : "line-clamp-2";
  const descClamp = viewport === "desktop" ? "line-clamp-2" : "line-clamp-4";

  const fallbackTitle = "Titolo della pagina — anteprima SERP";
  const fallbackDesc =
    "Inserisci una meta description chiara: riassume il contenuto e include il beneficio per chi cerca su Google.";

  return (
    <section className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Anteprima snippet Google</h2>
          <p className="mt-2 text-sm text-zinc-700">
            Simula come possono apparire title, URL e description nei risultati di ricerca su desktop e mobile. Il
            testo si adatta alla larghezza tipica del SERP: oltre certi limiti Google può troncare con puntini di
            sospensione.
          </p>
        </div>
        <div
          className="inline-flex shrink-0 rounded-full border border-zinc-300 bg-white p-1 text-xs font-medium text-zinc-700"
          role="tablist"
          aria-label="Viewport anteprima SERP"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewport === "desktop"}
            className={`rounded-full px-3 py-1.5 transition ${
              viewport === "desktop" ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
            }`}
            onClick={() => setViewport("desktop")}
          >
            Desktop
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewport === "mobile"}
            className={`rounded-full px-3 py-1.5 transition ${
              viewport === "mobile" ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-900"
            }`}
            onClick={() => setViewport("mobile")}
          >
            Mobile
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-zinc-700">
            Meta title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Es. Consulenza SEO locale a Udine | Studio"
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
              autoComplete="off"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            URL mostrata nel SERP
            <input
              type="text"
              value={urlInput}
              onChange={(event) => setUrlInput(event.target.value)}
              placeholder="/pagina oppure https://dominio.it/percorso"
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
              autoComplete="off"
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Meta description
            <textarea
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descrizione orientata al click: benefici, differenziazione, keyword naturale."
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className={`rounded-lg border p-3 text-xs ${titleHint.tone}`}>
              <p className="font-semibold uppercase tracking-wide">Title</p>
              <p className="mt-1 text-lg font-semibold">{titleLen} caratteri</p>
              <p className="mt-1">{titleHint.label}</p>
            </div>
            <div className={`rounded-lg border p-3 text-xs ${descHint.tone}`}>
              <p className="font-semibold uppercase tracking-wide">Description</p>
              <p className="mt-1 text-lg font-semibold">{descLen} caratteri</p>
              <p className="mt-1">{descHint.label}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Preview {viewport === "desktop" ? "desktop" : "smartphone"}
          </p>
          <div className={`mt-2 ${previewShell}`}>
            <div className={viewport === "mobile" ? "space-y-1.5" : "space-y-1"}>
              <p
                className={`${titleClamp} text-xl leading-snug text-[#1a0dab] hover:underline ${viewport === "mobile" ? "text-[18px]" : ""}`}
              >
                {titleTrim || fallbackTitle}
              </p>
              <p className="truncate text-sm text-[#006621]">{crumb}</p>
              <p className={`${descClamp} text-sm leading-relaxed text-[#202124]`}>
                {descTrim || fallbackDesc}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Il rendering reale dipende da query, device e test A/B di Google; questa è un&apos;approssimazione visiva per
            ottimizzare CTR e chiarezza.
          </p>
        </div>
      </div>
    </section>
  );
}
