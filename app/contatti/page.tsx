import type { Metadata } from "next";
import { InnerPageShell } from "@/components/inner-page-shell";
import { ContactPageContent } from "@/components/sections/contact-page-content";
import { pageSeo } from "@/lib/seo";

const title = "Contatti — jaderweb";
const description =
  "Hai un'idea? Parliamone. Raccontaci il progetto: siti web, e-commerce, automazioni e digitalizzazione a Como.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSeo("/contatti", { title, description }),
};

export default function ContattiPage() {
  return (
    <InnerPageShell>
      <ContactPageContent />
    </InnerPageShell>
  );
}
