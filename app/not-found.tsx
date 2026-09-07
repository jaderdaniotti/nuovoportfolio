import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found-content";
import { noindexRobots } from "@/lib/seo-robots";

export const metadata: Metadata = {
  title: "Pagina non trovata — jaderweb",
  robots: noindexRobots,
};

export default function NotFound() {
  return <NotFoundContent />;
}
