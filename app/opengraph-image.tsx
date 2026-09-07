import {
  defaultSocialImage,
  defaultSocialImageAlt,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const alt = defaultSocialImageAlt;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return defaultSocialImage();
}
