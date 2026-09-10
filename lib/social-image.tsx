import { ImageResponse } from "next/og";
import { OpenGraphCard } from "@/lib/opengraph-card";
import { getServicePostBySlug } from "@/lib/blog/posts";
import { getComuneBySlug } from "@/lib/comuni";
import { getServicePage } from "@/lib/service-pages";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";
export const defaultSocialImageAlt =
  "jaderweb — Sviluppatore web freelance a Udine e Gemona del Friuli";

function truncateOgTitle(title: string, max = 72) {
  if (title.length <= max) return title;
  return `${title.slice(0, max - 1).trimEnd()}…`;
}

export function defaultSocialImage() {
  return new ImageResponse(
    (
      <OpenGraphCard
        eyebrow="SVILUPPATORE WEB FREELANCE"
        title="Udine e Gemona del Friuli"
        subtitle="Siti web, ecommerce e sviluppo su misura"
      />
    ),
    { ...socialImageSize },
  );
}

export async function serviceSocialImage(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const page = getServicePage(slug);
  const title = page?.name ?? "jaderweb";
  const subtitle = page
    ? "Freelance web a Udine"
    : "Siti web, e-commerce e soluzioni digitali";

  return new ImageResponse(
    <OpenGraphCard title={title} subtitle={subtitle} />,
    { ...socialImageSize },
  );
}

export async function blogSocialImage(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const post = getServicePostBySlug(slug);
  const service = post ? getServicePage(post.service) : undefined;
  const title = post ? truncateOgTitle(post.title) : "Blog jaderweb";
  const subtitle = service
    ? `${service.name} · jaderweb`
    : "Guide siti web · jaderweb";

  return new ImageResponse(
    (
      <OpenGraphCard
        eyebrow="BLOG · JADERWEB"
        title={title}
        subtitle={subtitle}
      />
    ),
    { ...socialImageSize },
  );
}

export async function comuneSocialImage(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  const title = comune ? `Siti web a ${comune.nome}` : "jaderweb";
  const subtitle = comune
    ? `${comune.provincia} (${comune.sigla}) · ${comune.regione}`
    : "Siti web, e-commerce e soluzioni digitali";

  return new ImageResponse(
    (
      <OpenGraphCard
        eyebrow={comune ? `FREELANCER · ${comune.sigla}` : "FREELANCER · UDINE"}
        title={title}
        subtitle={subtitle}
      />
    ),
    { ...socialImageSize },
  );
}
