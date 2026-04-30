"use client";

import { useMemo, useState } from "react";

function statusForTitle(length: number) {
  if (length === 0) return { label: "Assente", tone: "text-red-700 bg-red-50 border-red-200" };
  if (length < 35) return { label: "Troppo corto", tone: "text-amber-700 bg-amber-50 border-amber-200" };
  if (length > 65) return { label: "Troppo lungo", tone: "text-amber-700 bg-amber-50 border-amber-200" };
  return { label: "Ottimale", tone: "text-emerald-700 bg-emerald-50 border-emerald-200" };
}

function statusForDescription(length: number) {
  if (length === 0) return { label: "Assente", tone: "text-red-700 bg-red-50 border-red-200" };
  if (length < 110) return { label: "Troppo corta", tone: "text-amber-700 bg-amber-50 border-amber-200" };
  if (length > 170) return { label: "Troppo lunga", tone: "text-amber-700 bg-amber-50 border-amber-200" };
  return { label: "Ottimale", tone: "text-emerald-700 bg-emerald-50 border-emerald-200" };
}

export function ToolCheckerTitleDescription() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleLength = title.trim().length;
  const descriptionLength = description.trim().length;

  const titleStatus = useMemo(() => statusForTitle(titleLength), [titleLength]);
  const descriptionStatus = useMemo(
    () => statusForDescription(descriptionLength),
    [descriptionLength],
  );

  return (
    <section className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Meta checker</h2>
      <p className="mt-2 text-sm text-zinc-700">
        Verifica rapidamente lunghezza e qualità base di title e meta description prima della pubblicazione.
      </p>

      <div className="mt-4 space-y-4">
        <label className="block text-sm font-medium text-zinc-700">
          Meta title
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Inserisci title della pagina..."
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
          />
        </label>

        <label className="block text-sm font-medium text-zinc-700">
          Meta description
          <textarea
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Inserisci meta description..."
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 transition focus:border-zinc-400 focus:ring-2"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className={`rounded-lg border p-4 ${titleStatus.tone}`}>
          <p className="text-xs uppercase tracking-wide">Title</p>
          <p className="mt-1 text-2xl font-semibold">{titleLength} caratteri</p>
          <p className="mt-1 text-sm">{titleStatus.label} (consigliato 35-65)</p>
        </div>
        <div className={`rounded-lg border p-4 ${descriptionStatus.tone}`}>
          <p className="text-xs uppercase tracking-wide">Description</p>
          <p className="mt-1 text-2xl font-semibold">{descriptionLength} caratteri</p>
          <p className="mt-1 text-sm">{descriptionStatus.label} (consigliato 110-170)</p>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-zinc-200 bg-white p-4">
        <p className="text-sm font-medium text-zinc-900">Anteprima snippet semplificata</p>
        <p className="mt-2 text-sm font-medium text-blue-700">
          {title.trim() || "Titolo della pagina - esempio preview"}
        </p>
        <p className="mt-1 text-xs text-emerald-700">https://tuosito.it/pagina</p>
        <p className="mt-1 text-sm text-zinc-700">
          {description.trim() ||
            "Questa e una preview semplificata della meta description per verificare lunghezza e chiarezza."}
        </p>
      </div>
    </section>
  );
}
