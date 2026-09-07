import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import {
  getTopComuniLinks,
  getTopComuniServiceLinks,
} from "@/lib/comune-internal-links";
import { COMUNI_HUB_PATH } from "@/lib/comune-paths";

export function TopComuniLinksSection({
  serviceSlug,
  serviceName,
  title = "Città e comuni serviti",
  limit = 8,
}: {
  serviceSlug?: string;
  serviceName?: string;
  title?: string;
  limit?: number;
}) {
  const links =
    serviceSlug && serviceName
      ? getTopComuniServiceLinks(serviceSlug, serviceName, limit)
      : getTopComuniLinks(limit);

  if (links.length === 0) return null;

  return (
    <section className="border-b border-border bg-background py-20 text-foreground lg:py-28">
      <div className="page-shell">
        <Reveal>
          <SectionLabel>Local SEO</SectionLabel>
          <h2 className="font-display max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Pagine localizzate per le città più popolate. Stesso metodo, territorio
            diverso.
          </p>
        </Reveal>

        <ul className="mt-10 flex flex-wrap gap-3">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-foreground/40 hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8">
          <Link
            href={COMUNI_HUB_PATH}
            className="text-sm font-medium underline decoration-accent decoration-2 underline-offset-4 transition hover:opacity-70"
          >
            Tutti i comuni d’Italia
          </Link>
          {" · "}
          <Link
            href="/udine"
            className="text-sm font-medium text-muted underline-offset-4 transition hover:text-foreground hover:underline"
          >
            Pilastro Udine
          </Link>
          {" · "}
          <Link
            href="/friuli"
            className="text-sm font-medium text-muted underline-offset-4 transition hover:text-foreground hover:underline"
          >
            Freelance FVG
          </Link>
        </p>
      </div>
    </section>
  );
}
