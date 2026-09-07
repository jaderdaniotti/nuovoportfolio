import type { Metadata } from "next";
import { ToolsIndex } from "@/components/tools/tools-index";
import { indexableRobots } from "@/lib/seo-robots";
import { pageSeo } from "@/lib/seo";

const title = "Tools SEO gratuiti e utility web — jaderweb";
const description =
  "Utility gratuite per SEO e produttività: convertitori, check e strumenti operativi. Usali subito, senza account.";

export const metadata: Metadata = {
  title,
  description,
  robots: indexableRobots,
  ...pageSeo("/tools", { title, description }),
};

export default function ToolsPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="page-shell py-14 md:py-20">
        <ToolsIndex />
      </div>
    </main>
  );
}
