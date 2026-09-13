import { notFound, permanentRedirect } from "next/navigation";
import type { ReactNode } from "react";
import { getComuneBySlug } from "@/lib/comuni";
import {
  COMUNI_SILO_ENABLED,
  resolveDisabledComuneSiloPath,
} from "@/lib/comune-paths";

export const revalidate = 2592000;

export default async function ComuneSlugLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!COMUNI_SILO_ENABLED) {
    permanentRedirect(
      resolveDisabledComuneSiloPath(`/comuni/${slug}`) ?? "/servizi",
    );
  }

  const comune = getComuneBySlug(slug);
  if (!comune) notFound();

  return children;
}
