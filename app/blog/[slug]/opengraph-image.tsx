import {
  blogSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt = "jaderweb — articolo blog";
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default async function BlogOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return blogSocialImage(params);
}
