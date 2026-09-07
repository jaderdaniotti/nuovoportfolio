import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getComuneBySlug } from "@/lib/comuni";

export const revalidate = 2592000;

export default async function ComuneSlugLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) notFound();

  return children;
}
