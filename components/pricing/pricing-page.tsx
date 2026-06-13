"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { Check, Minus, Star } from "lucide-react";
import { ViewportAnimate } from "@/components/pricing/viewport-animate";
import {
  CHATBOT_SETUP_PRICE,
  chatbotColumnIcons,
  chatbotPlanFeatures,
  chatbotPlans,
  formatEuro,
  planColumnIcons,
  planFeatures,
  websitePlans,
} from "@/lib/pricing-content";
import { cn } from "@/lib/utils";

function FeatureCell({ included }: { included: boolean }) {
  if (included) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100">
        <Check className="h-3.5 w-3.5" aria-hidden />
        <span className="sr-only">Incluso</span>
      </span>
    );
  }

  return (
    <span className="inline-flex h-6 w-6 items-center justify-center text-zinc-300 dark:text-zinc-600">
      <Minus className="h-3.5 w-3.5" aria-hidden />
      <span className="sr-only">Non incluso</span>
    </span>
  );
}

function ChatbotFeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return (
      <span className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
        {value}
      </span>
    );
  }

  return <FeatureCell included={value} />;
}

function PlanIconBadge({ icon: Icon }: { icon: ComponentType<{ className?: string }> }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
      <Icon className="h-5 w-5" aria-hidden />
    </span>
  );
}

export function PricingPage() {
  const BasicColumnIcon = planColumnIcons.basic;
  const ProColumnIcon = planColumnIcons.pro;
  const BusinessColumnIcon = planColumnIcons.business;
  const StandardChatbotIcon = chatbotColumnIcons.standard;
  const PremiumChatbotIcon = chatbotColumnIcons.premium;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <ViewportAnimate as="header" enterAnimation="animate__fadeInDown" className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
          Tariffe trasparenti
        </p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-100">
          Pacchetti siti web su misura
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          Tre soluzioni chiare — Basic, Pro e Business — con prezzi di creazione e manutenzione
          annuale. Nessun CMS pesante: siti sviluppati a codice, veloci e facili da gestire.
        </p>
      </ViewportAnimate>

      <section aria-labelledby="website-plans-heading" className="mt-12 md:mt-16">
        <h2 id="website-plans-heading" className="sr-only">
          Pacchetti siti web
        </h2>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {websitePlans.map((plan) => {
            const PlanIcon = plan.icon;

            return (
              <ViewportAnimate
                key={plan.id}
                as="article"
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition dark:bg-zinc-900",
                  plan.highlighted
                    ? "border-zinc-900 shadow-lg ring-1 ring-zinc-900/10 dark:border-zinc-100 dark:ring-zinc-100/10 lg:-translate-y-2 lg:scale-[1.02]"
                    : "border-zinc-200 dark:border-zinc-800",
                )}
              >
                {plan.highlighted ? (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white dark:bg-zinc-100 dark:text-zinc-900">
                    <Star className="h-3 w-3" aria-hidden />
                    Più scelto
                  </span>
                ) : null}

                <div className="flex items-start gap-3">
                  <PlanIconBadge icon={PlanIcon} />
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-950 dark:text-zinc-100">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{plan.tagline}</p>
                  </div>
                </div>

                <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Creazione</p>
                  <p className="mt-1 text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {formatEuro(plan.setupPrice)}
                  </p>
                  <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                    Manutenzione{" "}
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {formatEuro(plan.maintenancePrice)}/anno
                    </span>
                  </p>
                </div>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-zinc-900 dark:text-zinc-100"
                        aria-hidden
                      />
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
              </ViewportAnimate>
            );
          })}
        </div>
      </section>

      <ViewportAnimate
        as="section"
        aria-labelledby="comparison-heading"
        enterAnimation="animate__fadeIn"
        className="mt-16 md:mt-20"
      >
        <div className="max-w-2xl">
          <h2
            id="comparison-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100"
          >
            Confronto dettagliato
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Tutte le funzionalità incluse in ogni pacchetto, in un colpo d&apos;occhio.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th scope="col" className="px-4 py-4 font-medium text-zinc-500 dark:text-zinc-400">
                  Servizio
                </th>
                <th scope="col" className="px-4 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-100">
                  <span className="inline-flex items-center justify-center gap-1.5">
                    <BasicColumnIcon className="h-4 w-4" aria-hidden />
                    Basic
                  </span>
                </th>
                <th scope="col" className="px-4 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-100">
                  <span className="inline-flex items-center justify-center gap-1.5">
                    <ProColumnIcon className="h-4 w-4" aria-hidden />
                    Pro
                  </span>
                </th>
                <th scope="col" className="px-4 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-100">
                  <span className="inline-flex items-center justify-center gap-1.5">
                    <BusinessColumnIcon className="h-4 w-4" aria-hidden />
                    Business
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {planFeatures.map((feature, rowIndex) => (
                <tr
                  key={feature.label}
                  className={cn(
                    "border-b border-zinc-100 last:border-0 dark:border-zinc-800/80",
                    rowIndex % 2 === 1 && "bg-zinc-50/80 dark:bg-zinc-900/50",
                  )}
                >
                  <th scope="row" className="px-4 py-3.5 font-normal text-zinc-700 dark:text-zinc-300">
                    {feature.label}
                  </th>
                  <td className="px-4 py-3.5 text-center">
                    <FeatureCell included={feature.basic} />
                  </td>
                  <td className="bg-zinc-100/80 px-4 py-3.5 text-center dark:bg-zinc-800/60">
                    <FeatureCell included={feature.pro} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <FeatureCell included={feature.business} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ViewportAnimate>

      <ViewportAnimate
        as="section"
        aria-labelledby="chatbot-heading"
        className="mt-16 rounded-3xl border border-zinc-200  p-6 md:mt-20 md:p-10 dark:border-zinc-800 "
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Extra opzionale
          </p>
          <h2
            id="chatbot-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl dark:text-zinc-100"
          >
            Chatbot AI per il tuo sito
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            Aggiungi un assistente virtuale sul sito: risponde 24/7, qualifica i lead e libera tempo
            al team. <br /> Installazione una tantum di <strong>{formatEuro(CHATBOT_SETUP_PRICE)}</strong>,
            poi un canone mensile in base al piano scelto.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {chatbotPlans.map((plan) => {
            const ChatbotIcon = plan.icon;

            return (
              <ViewportAnimate
                key={plan.id}
                as="article"
                className={cn(
                  "relative flex flex-col rounded-2xl border p-5  bg-zinc-100 dark:bg-zinc-900",
                  plan.highlighted
                    ? "border-zinc-900 shadow-md ring-1 ring-zinc-900/10 dark:border-zinc-100 dark:ring-zinc-100/10"
                    : "border-zinc-200 dark:border-zinc-700",
                )}
              >
                {plan.highlighted ? (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white dark:bg-zinc-100 dark:text-zinc-900">
                    <Star className="h-3 w-3" aria-hidden />
                    Completo
                  </span>
                ) : null}

                <PlanIconBadge icon={ChatbotIcon} />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {plan.audience}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-zinc-100">
                  {plan.name}
                </h3>
                <p className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {formatEuro(plan.monthlyPrice)}
                  <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">/mese</span>
                </p>
                <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {plan.features.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-900 dark:text-zinc-100" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </ViewportAnimate>
            );
          })}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
            Confronto piani chatbot
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Dettaglio delle funzionalità incluse in Standard e Premium.
          </p>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th scope="col" className="px-4 py-4 font-medium text-zinc-500 dark:text-zinc-400">
                    Funzionalità
                  </th>
                  <th scope="col" className="px-4 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-100">
                    <span className="inline-flex items-center justify-center gap-1.5">
                      <StandardChatbotIcon className="h-4 w-4" aria-hidden />
                      Standard
                      <span className="sr-only"> — {formatEuro(39)}/mese</span>
                    </span>
                  </th>
                  <th scope="col" className="bg-zinc-100/80 px-4 py-4 text-center font-semibold text-zinc-900 dark:bg-zinc-800/60 dark:text-zinc-100">
                    <span className="inline-flex items-center justify-center gap-1.5">
                      <PremiumChatbotIcon className="h-4 w-4" aria-hidden />
                      Premium
                      <span className="sr-only"> — {formatEuro(149)}/mese</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {chatbotPlanFeatures.map((feature, rowIndex) => (
                  <tr
                    key={feature.label}
                    className={cn(
                      "border-b border-zinc-100 last:border-0 dark:border-zinc-800/80",
                      rowIndex % 2 === 1 && "bg-zinc-50/80 dark:bg-zinc-900/50",
                    )}
                  >
                    <th scope="row" className="px-4 py-3.5 font-normal text-zinc-700 dark:text-zinc-300">
                      {feature.label}
                    </th>
                    <td className="px-4 py-3.5 text-center">
                      <ChatbotFeatureCell value={feature.standard} />
                    </td>
                    <td className="bg-zinc-100/80 px-4 py-3.5 text-center dark:bg-zinc-800/60">
                      <ChatbotFeatureCell value={feature.premium} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
          Il chatbot si combina con qualsiasi pacchetto sito — Basic, Pro o Business.
        </p>
      </ViewportAnimate>

      <ViewportAnimate
        as="section"
        enterAnimation="animate__fadeIn"
        className="mt-16 rounded-2xl border border-zinc-200 bg-white px-6 py-10 text-center dark:border-zinc-800 dark:bg-zinc-900 md:px-10"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
          Non sai quale pacchetto scegliere?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
          Raccontami obiettivi, settore e budget: ti propongo la soluzione più adatta, con o senza
          chatbot.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contatti"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Contattami
          </Link>
          <a
            href="https://wa.me/393513152008"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-300 px-6 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
          >
            Scrivimi su WhatsApp
          </a>
        </div>
      </ViewportAnimate>
    </div>
  );
}
