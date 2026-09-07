import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { LegalPageContent } from "@/components/sections/legal-page-content";
import { cookiePage } from "@/lib/legal-pages";
import { pageSeo } from "@/lib/seo";

const title = "Cookie — jaderweb";
const description =
  "Informativa cookie di jaderweb: tipi di cookie, finalità e come gestire le preferenze sul sito.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSeo("/cookie", { title, description }),
};

export default function CookiePage() {
  return (
    <InnerPageShell>
      <LegalPageContent page={cookiePage} />
    </InnerPageShell>
  );
}
