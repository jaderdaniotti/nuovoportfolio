import type { Metadata } from "next";
import { ToolsIndex } from "@/components/tools/tools-index";
import { indexableRobots } from "@/lib/seo-robots";
import { pageSeo } from "@/lib/seo";

const title = "Tools SEO e utility web — jaderweb";
const description =
  "Strumenti gratuiti per SEO, conversioni e produttività: convertitori, analizzatori e utility operative.";

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
