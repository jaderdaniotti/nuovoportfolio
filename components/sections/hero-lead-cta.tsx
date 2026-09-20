"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/button";
import { hero } from "@/lib/home-content";
import { getLinkTitle } from "@/lib/link-titles";

export function HeroLeadCta() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const { leadCta, ctaSecondary, ctaSecondaryHref } = hero;

  function goToContacts(brief?: string) {
    const text = (brief ?? value).trim();
    if (text) {
      router.push(`/contatti?progetto=${encodeURIComponent(text)}#form`);
      return;
    }
    router.push("/contatti#form");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    goToContacts();
  }

  return (
    <div className="mt-10 max-w-xl">
      <ul className="space-y-2.5">
        {leadCta.proofs.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent text-ink">
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <form
        onSubmit={onSubmit}
        className="mt-7 flex flex-col gap-2 rounded-2xl border border-border bg-background p-2 shadow-[0_12px_40px_-24px_rgb(10_12_0/0.45)] sm:flex-row sm:items-center"
      >
        <label htmlFor="hero-project-brief" className="sr-only">
          Descrivi il tuo progetto
        </label>
        <input
          id="hero-project-brief"
          name="progetto"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={leadCta.placeholder}
          autoComplete="off"
          className="h-12 min-w-0 flex-1 rounded-xl bg-transparent px-4 text-[0.95rem] text-foreground outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-ink transition hover:brightness-95"
        >
          {leadCta.button}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </form>

      <p className="mt-3 text-xs leading-relaxed text-muted">{leadCta.hint}</p>

      <div className="mt-5">
        <Button
          href={ctaSecondaryHref}
          variant="outline"
          title={getLinkTitle(ctaSecondaryHref, ctaSecondary)}
        >
          {ctaSecondary}
        </Button>
      </div>
    </div>
  );
}
