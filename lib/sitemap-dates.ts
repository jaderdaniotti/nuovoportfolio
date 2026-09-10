/**
 * Date stabili per lastmod sitemap (niente `new Date()` a ogni build/request).
 * Bumpare quando pubblichi/modifichi in massa contenuti core o dataset comuni.
 */
export const CORE_CONTENT_LASTMOD = new Date("2026-09-10T18:30:00.000Z");

/** Dataset comuni / silo path structure last meaningful refresh */
export const COMUNI_CONTENT_LASTMOD = new Date("2026-09-07T15:50:00.000Z");

export function parsePostDate(isoDate: string): Date {
  const d = new Date(`${isoDate}T12:00:00.000Z`);
  return Number.isNaN(d.getTime()) ? CORE_CONTENT_LASTMOD : d;
}
