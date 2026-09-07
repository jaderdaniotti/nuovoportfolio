import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import type { ComuneData } from "@/lib/comuni";
import { comuneLabel } from "@/lib/comuni";
import { getComuneSiloLinks } from "@/lib/comune-paths";

export function ComunePagesSection({
  comune,
  nearby,
}: {
  comune: ComuneData;
  nearby: ComuneData[];
}) {
  const pages = getComuneSiloLinks(comune.slug);
  const label = comuneLabel(comune);

  return (
    <section
      id="in-questo-comune"
      className="border-y border-border bg-background py-20 text-foreground lg:py-28"
    >
      <div className="page-shell">
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
          <h2 className="font-display max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
            Ogni pagina del sito, a {comune.nome}.
          </h2>
          <p className="mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
            Stessa grafica di jaderweb, testi e metadati localizzati per coprire
            le ricerche di creazione siti web a {comune.nome} e ogni servizio verticale.
          </p>
        </Reveal>

        <ul className="mt-10 flex flex-wrap gap-3">
          {pages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-foreground/40 hover:text-foreground"
              >
                {page.label} · {comune.nome}
              </Link>
            </li>
          ))}
        </ul>

        {nearby.length > 0 ? (
          <>
            <Reveal className="mt-16">
              <h3 className="font-display text-[clamp(1.4rem,3vw,2.1rem)] font-semibold tracking-tight">
                Altri comuni in {comune.provincia}
              </h3>
            </Reveal>
            <ul className="mt-8 flex flex-wrap gap-3">
              {nearby.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/comuni/${item.slug}`}
                    className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-foreground/40 hover:text-foreground"
                  >
                    Siti web a {item.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </section>
  );
}
