import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  // Indexable: article pages set their own robots via getArticleMetadata.
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
