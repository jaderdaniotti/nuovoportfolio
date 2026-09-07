import {
  comuneSocialImage,
  defaultSocialImageAlt,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt = defaultSocialImageAlt;
export const size = socialImageSize;
export const contentType = socialImageContentType;
export const runtime = "nodejs";

export default async function ComuneTwitterImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return comuneSocialImage(params);
}
