import type { Metadata } from "next";
import type { ReactNode } from "react";
import { noindexRobots } from "@/lib/seo-robots";

export const metadata: Metadata = {
  robots: noindexRobots,
};

export default function NestedLayout({ children }: { children: ReactNode }) {
  return children;
}
