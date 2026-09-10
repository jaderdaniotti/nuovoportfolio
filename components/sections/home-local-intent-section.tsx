import Link from "next/link";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { homeLocalIntent } from "@/lib/home-content";
import { getLinkTitle } from "@/lib/link-titles";
import { shouldPrefetchHref } from "@/lib/prefetch";

export function HomeLocalIntentSection() {
  return (
    <section
      id="territorio"
      className="border-b border-border bg-background py-20 text-foreground lg:py-24"
    >
      <div className="page-shell">
        <Reveal>
          <SectionLabel>{homeLocalIntent.eyebrow}</SectionLabel>
          <p className="max-w-2xl text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-muted">
            {homeLocalIntent.lead}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 lg:grid-cols-2">
          {homeLocalIntent.places.map((place, index) => (
            <li key={place.href}>
              <Reveal delay={0.08 * (index + 1)} className="h-full">
                <Link
                  href={place.href}
                  title={getLinkTitle(place.href, place.heading)}
                  prefetch={shouldPrefetchHref(place.href)}
                  className="flex h-full flex-col rounded-md border border-border p-6 transition hover:border-foreground/40 lg:p-8"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {place.name}
                  </p>
                  <h2 className="font-display mt-3 text-[clamp(1.45rem,2.6vw,1.9rem)] font-semibold leading-[1.08] tracking-tight">
                    {place.heading}
                  </h2>
                  <p className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-muted">
                    {place.body}
                  </p>
                  <div className="mt-8">
                    <Button as="span" variant="outline">
                      {place.cta}
                    </Button>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-muted">
          Altre zone:{" "}
          <Link
            href="/siti-web"
            title={getLinkTitle("/siti-web", "Siti web in Alto Friuli")}
            prefetch={shouldPrefetchHref("/siti-web")}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            siti web in Alto Friuli
          </Link>
          {" · "}
          {homeLocalIntent.serviceLinks.map((link, index) => (
            <span key={link.href}>
              {index > 0 ? " · " : null}
              <Link
                href={link.href}
                title={getLinkTitle(link.href, link.label)}
                prefetch={shouldPrefetchHref(link.href)}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            </span>
          ))}
          .
        </p>
      </div>
    </section>
  );
}
