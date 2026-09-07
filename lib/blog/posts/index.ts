import type { ServiceBlogPost } from "@/lib/blog/types";
import { matrimoniPosts } from "@/lib/blog/posts/matrimoni";
import { sagreEventiPosts } from "@/lib/blog/posts/sagre-eventi";
import { ristorantiPosts } from "@/lib/blog/posts/ristoranti";
import { bbCaseVacanzaPosts } from "@/lib/blog/posts/bb-case-vacanza";
import { professionistiPosts } from "@/lib/blog/posts/professionisti";
import { associazioniSportivePosts } from "@/lib/blog/posts/associazioni-sportive";
import { bandEventiPosts } from "@/lib/blog/posts/band-eventi";
import { agenzieImmobiliariPosts } from "@/lib/blog/posts/agenzie-immobiliari";
import { eventiPrivatiPosts } from "@/lib/blog/posts/eventi-privati";
import { artigianiPosts } from "@/lib/blog/posts/artigiani";
import { landingAdsPosts } from "@/lib/blog/posts/landing-ads";
import { onePagePosts } from "@/lib/blog/posts/one-page";
import { sito48hPosts } from "@/lib/blog/posts/sito-48h";
import { palestrePosts } from "@/lib/blog/posts/palestre";
import { preventiviOnlinePosts } from "@/lib/blog/posts/preventivi-online";
import { prenotazioniPosts } from "@/lib/blog/posts/prenotazioni";
import { cvPortfolioPosts } from "@/lib/blog/posts/cv-portfolio";
import { eventiLocaliPosts } from "@/lib/blog/posts/eventi-locali";
import { digitalizzazionePosts } from "@/lib/blog/posts/digitalizzazione";

export const SERVICE_BLOG_POSTS: ServiceBlogPost[] = [
  ...matrimoniPosts,
  ...sagreEventiPosts,
  ...ristorantiPosts,
  ...bbCaseVacanzaPosts,
  ...professionistiPosts,
  ...associazioniSportivePosts,
  ...bandEventiPosts,
  ...agenzieImmobiliariPosts,
  ...eventiPrivatiPosts,
  ...artigianiPosts,
  ...landingAdsPosts,
  ...onePagePosts,
  ...sito48hPosts,
  ...palestrePosts,
  ...preventiviOnlinePosts,
  ...prenotazioniPosts,
  ...cvPortfolioPosts,
  ...eventiLocaliPosts,
  ...digitalizzazionePosts,
];

export function getAllServicePostSlugs() {
  return SERVICE_BLOG_POSTS.map((post) => post.slug);
}

export function getServicePostBySlug(slug: string) {
  return SERVICE_BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

export function getServicePostsByService(service: string) {
  return SERVICE_BLOG_POSTS.filter((post) => post.service === service);
}
