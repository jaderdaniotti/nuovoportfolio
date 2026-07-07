"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  MapPin,
  Quote,
  Star,
} from "lucide-react";
import { SimpleTechBadge, SimpleTechIcon } from "@/components/home/simple-tech-icon";
import { CountUp, FaqAccordion } from "@/components/home/home-ui";
import { ContactForm } from "@/components/contact/contact-form";
import { ViewportAnimate } from "@/components/pricing/viewport-animate";
import type { BlogPostMeta } from "@/lib/blog-content";
import type { FooterLink } from "@/lib/footer-nav";
import { collaborations, projects, skillGroups } from "@/lib/home-content";
import {
  homeFaq,
  homeHeroStats,
  homeProcessSteps,
  homeServices,
  homeToolsHighlight,
  homeValues,
} from "@/lib/home-page-content";
import { formatEuro, websitePlans } from "@/lib/pricing-content";
import { cn } from "@/lib/utils";
import reviews from "@/recensioni.json";
import images from "@/src/images";

const technologies = [
  { name: "nextjs", label: "Next.js" },
  { name: "react", label: "React" },
  { name: "typescript", label: "TypeScript" },
  { name: "tailwind", label: "Tailwind" },
  { name: "nodejs", label: "Node.js" },
  { name: "vercel", label: "Vercel" },
  { name: "framermotion", label: "Framer" },
  { name: "gsap", label: "GSAP" },
  { name: "laravel", label: "Laravel" },
  { name: "supabase", label: "Supabase" },
] as const;

function IconBadge({ icon: Icon }: { icon: ComponentType<{ className?: string }> }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
      <Icon className="h-5 w-5" aria-hidden />
    </span>
  );
}

type HomePageProps = {
  recentPosts: BlogPostMeta[];
  featuredComuni: FooterLink[];
};

export function HomePageClean({ recentPosts, featuredComuni }: HomePageProps) {
  const featuredReviews = reviews.slice(0, 6);

  return (
    <div className="w-full">
      {/* Hero */}
      <ViewportAnimate as="section" enterAnimation="animate__fadeInDown" className="bg-white py-16 text-center dark:bg-zinc-950 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <Image
            src={images.logo}
            alt="Logo"
            width={24}
            height={24}
            className="h-6 w-6"
            priority
          />
          <span>Web Developer · Udine, Friuli</span>
        </div>

        <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl dark:text-zinc-100">
          Creazione siti web su misura, veloci e orientati al risultato
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          Realizzo siti su misura da Udine — veloci, curati nei dettagli e pensati per portarti contatti.
          Niente agenzia, niente intermediari: scrivi a me e rispondo io.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contatti"
            className="inline-flex h-11 min-w-[200px] items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Richiedi un preventivo
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/comuni"
            className="inline-flex h-11 min-w-[200px] items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50 px-6 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            <MapPin className="h-4 w-4" aria-hidden />
            Siti web per comune
          </Link>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
          {homeHeroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <dt className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dt>
              <dd className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</dd>
            </div>
          ))}
        </div>
        </div>
      </ViewportAnimate>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Servizi */}
      <section aria-labelledby="servizi-heading" className="bg-zinc-50/50 py-16 dark:bg-zinc-900/50 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Servizi
          </p>
          <h2
            id="servizi-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            Cosa posso fare per te
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Dalla vetrina semplice all'e-commerce, dalla SEO al chatbot: ogni servizio nasce da un problema concreto.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <ViewportAnimate
                key={service.title}
                as="article"
                enterAnimation="animate__fadeInUp"
                className={cn(
                  "flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition dark:border-zinc-800 dark:bg-zinc-900",
                  index === 0 && "lg:col-span-2",
                )}
              >
                <div className="flex items-start gap-3">
                  <IconBadge icon={ServiceIcon} />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-100">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {service.description}
                    </p>
                  </div>
                </div>
              </ViewportAnimate>
            );
          })}
        </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Perché */}
      <section aria-labelledby="perche-heading" className="bg-white py-16 dark:bg-zinc-950 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Perché jaderweb
          </p>
          <h2
            id="perche-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            Perché lavorare con me
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Preferisco pochi progetti ben fatti che tanti lavori tirati via.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {homeValues.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="font-semibold text-zinc-950 dark:text-zinc-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.body}</p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Chi sono */}
      <section aria-labelledby="about-heading" className="bg-zinc-50/50 py-16 dark:bg-zinc-900/50 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <Image
              src={images.logo}
              alt="Jader Daniotti"
              fill
              className="object-cover p-12"
              sizes="(max-width: 1024px) 100vw, 448px"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Chi sono
            </p>
            <h2
              id="about-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
            >
              Design che converte, codice che scala
            </h2>
            <div className="mt-6 space-y-4 text-zinc-600 dark:text-zinc-300">
              <p>
                Sono <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Jader Daniotti</strong>,
                web designer e sviluppatore a Udine. Mi occupo di siti su misura.
              </p>
              <p>
                Mi piace unire estetica e codice: interfacce pulite, tempi di caricamento bassi, SEO fatta
                bene e form che portano messaggi veri.
              </p>
            </div>
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {[
                "Consulenza iniziale senza impegno",
                "Preventivo chiaro prima di iniziare",
                "Sviluppo Next.js + Vercel",
                "Supporto post-lancio incluso",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-900 dark:text-zinc-100" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Processo */}
      <section aria-labelledby="processo-heading" className="bg-white py-16 dark:bg-zinc-950 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Processo
          </p>
          <h2
            id="processo-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            Come lavoriamo insieme
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Quattro passi semplici — niente gergo da agenzia, niente sorprese.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {homeProcessSteps.map((step) => (
            <article
              key={step.step}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 font-mono text-sm font-bold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                {step.step}
              </span>
              <h3 className="mt-4 font-semibold text-zinc-950 dark:text-zinc-100">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Progetti */}
      <section aria-labelledby="progetti-heading" className="bg-zinc-50/50 py-16 dark:bg-zinc-900/50 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Progetti
          </p>
          <h2
            id="progetti-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            Cose che so fare bene
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Alcuni tipi di lavoro che ho già affrontato.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={cn(
                "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900",
                index % 3 === 0 && "md:col-span-2",
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
                {project.role}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-100">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Tech Stack */}
      <section aria-labelledby="tech-heading" className="bg-white py-16 dark:bg-zinc-950 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Stack tecnologico
          </p>
          <h2
            id="tech-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            Stack che uso ogni giorno
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Next.js, React e Vercel sono la base. Il resto dipende dal progetto.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <SimpleTechBadge key={tech.name} name={tech.name} label={tech.label} />
          ))}
        </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Competenze */}
      <section aria-labelledby="skills-heading" className="bg-zinc-50/50 py-16 dark:bg-zinc-900/50 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Competenze
          </p>
          <h2
            id="skills-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            Linguaggi, tool e roba che conosco
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="font-semibold text-zinc-950 dark:text-zinc-100">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Tariffe */}
      <section aria-labelledby="pricing-heading" className="bg-white py-16 dark:bg-zinc-950 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Tariffe
          </p>
          <h2
            id="pricing-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            Quanto costa — senza giri di parole
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Tre pacchetti chiari. Prezzi scritti nero su bianco.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {websitePlans.map((plan) => {
            const PlanIcon = plan.icon;
            return (
              <article
                key={plan.id}
                className={cn(
                  "flex flex-col rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900",
                  plan.highlighted
                    ? "border-zinc-900 shadow-lg ring-1 ring-zinc-900/10 dark:border-zinc-100 dark:ring-zinc-100/10 lg:-translate-y-2"
                    : "border-zinc-200 dark:border-zinc-800",
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white dark:bg-zinc-100 dark:text-zinc-900">
                    <Star className="h-3 w-3" aria-hidden />
                    Più scelto
                  </span>
                )}

                <div className="flex items-start gap-3">
                  <IconBadge icon={PlanIcon} />
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-100">{plan.name}</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{plan.tagline}</p>
                  </div>
                </div>

                <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Creazione</p>
                  <p className="mt-1 text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {formatEuro(plan.setupPrice)}
                  </p>
                </div>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-900 dark:text-zinc-100" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contatti"
                  className={cn(
                    "mt-8 inline-flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition",
                    plan.highlighted
                      ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                      : "border border-zinc-300 bg-zinc-50 text-zinc-900 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
                  )}
                >
                  Richiedi preventivo
                </Link>
              </article>
            );
          })}
        </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Zone servite */}
      <section aria-labelledby="zone-heading" className="bg-zinc-50/50 py-16 dark:bg-zinc-900/50 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Zone servite
          </p>
          <h2
            id="zone-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            Lavoro da Udine, ma il sito può essere ovunque
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Ho pagine dedicate per molte città italiane — lavoro benissimo anche da remoto.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {featuredComuni.map((city) => (
            <Link
              key={city.href}
              href={city.href}
              title={city.title}
              className="group inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-700"
            >
              <MapPin className="h-4 w-4 text-zinc-400 dark:text-zinc-500" aria-hidden />
              <span>{city.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden />
            </Link>
          ))}
          <Link
            href="/comuni"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Directory completa comuni
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Recensioni */}
      <section aria-labelledby="reviews-heading" className="bg-white py-16 dark:bg-zinc-950 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Recensioni
          </p>
          <h2
            id="reviews-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            Parole di chi ha già lavorato con me
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredReviews.map((review, index) => (
            <article
              key={`${review.nome}-${index}`}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Quote className="h-7 w-7 text-zinc-300 dark:text-zinc-600" aria-hidden />
              <div className="mt-3 flex items-center gap-0.5">
                {Array.from({ length: review.valutazione }, (_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-zinc-900 text-zinc-900 dark:fill-zinc-100 dark:text-zinc-100"
                    aria-hidden
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                &ldquo;{review.recensione}&rdquo;
              </p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {review.nome}
              </p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Collaborazioni */}
      <section aria-labelledby="collab-heading" className="bg-zinc-50/50 py-16 dark:bg-zinc-900/50 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Collaborazioni
          </p>
          <h2
            id="collab-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            Collaborazioni
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            A volte lavoro con studi grafici, team AI e formatori.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {collaborations.map((collab) => (
            <article
              key={collab.name}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="font-semibold text-zinc-950 dark:text-zinc-100">{collab.name}</h3>
              <span className="mt-2 inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {collab.tag}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {collab.body}
              </p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Blog */}
      {recentPosts.length > 0 && (
        <section aria-labelledby="blog-heading" className="bg-white py-16 dark:bg-zinc-950 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Blog
            </p>
            <h2
              id="blog-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
            >
              Guide su siti web, SEO e conversioni
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Guide pratiche su Next.js, SEO locale, e-commerce — scritte da me.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
              >
                <time dateTime={post.date} className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {new Date(post.date).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h3 className="mt-3 font-semibold leading-snug text-zinc-950 dark:text-zinc-100">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Leggi articolo
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50 px-6 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              Tutti gli articoli del blog
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          </div>
        </section>
      )}

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Tools */}
      <section aria-labelledby="tools-heading" className="bg-zinc-50/50 py-16 dark:bg-zinc-900/50 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Strumenti
          </p>
          <h2
            id="tools-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            {homeToolsHighlight.title}
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            {homeToolsHighlight.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeToolsHighlight.featured.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-700"
            >
              <span>{tool.label}</span>
              <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" aria-hidden />
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href={homeToolsHighlight.href}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Catalogo completo tool gratuiti
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="bg-white py-16 dark:bg-zinc-950 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            Domande che mi fanno spesso
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <FaqAccordion items={homeFaq} />
        </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Contatti */}
      <section aria-labelledby="contact-heading" className="bg-zinc-50/50 py-16 dark:bg-zinc-900/50 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-1 text-center ">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Contatti
            </p>
            <h2
              id="contact-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
            >
              Hai un'idea? Parliamone.
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Raccontami cosa ti serve: ti rispondo con tempi, costi e prossimi passi — senza impegno.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row justify-center items-center">
              <a
                href="https://wa.me/393513152008"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-300 bg-zinc-50 px-6 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                Scrivimi su WhatsApp
              </a>
              <Link
                href="/contatti"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Pagina contatti completa
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-950 dark:text-zinc-100">Scrivimi qui</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Più dettagli mi dai, più precisa sarà la risposta.
            </p>
            <div className="mt-6">
              <ContactForm idPrefix="home" />
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
