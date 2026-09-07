"use client";

import { useRouter } from "next/navigation";
import AnimatedList from "@/components/animated-list";
import { comuneBasePath } from "@/lib/comune-paths";

export function ComuniAnimatedList({
  comuni,
}: {
  comuni: Array<{ slug: string; nome: string; sigla: string }>;
}) {
  const router = useRouter();
  const items = comuni.map((comune) => `${comune.nome} (${comune.sigla})`);
  const hrefs = comuni.map((comune) => comuneBasePath(comune.slug));

  return (
    <AnimatedList
      items={items}
      hrefs={hrefs}
      onItemSelect={(_, index) => {
        const href = hrefs[index];
        if (href) router.push(href);
      }}
      showGradients
      enableArrowNavigation
      displayScrollbar
      className="w-full max-w-none"
      listClassName="max-h-[min(36rem,70vh)]"
      ariaLabel="Comuni d’Italia"
    />
  );
}
