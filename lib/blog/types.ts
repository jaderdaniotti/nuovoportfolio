export type BlogFaq = { question: string; answer: string };

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

/** Unique, conversion-oriented blog post (service silo). */
export type ServiceBlogPost = {
  slug: string;
  /** Correlato a /servizi/{service} */
  service: string;
  title: string;
  description: string;
  /** Data pubblicazione (ISO YYYY-MM-DD). */
  date: string;
  /**
   * Ultima revisione editoriale (ISO YYYY-MM-DD).
   * Se assente, dateModified = date (helper `getBlogPostDates`).
   */
  updated?: string;
  keywords: string[];
  /** Lead paragraph under H1 */
  intro: string;
  sections: BlogSection[];
  faq: BlogFaq[];
  /** Optional internal links shown in CTA block */
  related?: { label: string; href: string }[];
};

export function postToListItem(post: ServiceBlogPost) {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    updated: post.updated ?? post.date,
    keywords: post.keywords,
    service: post.service,
  };
}

/** datePublished + dateModified (updated ?? date). */
export function getBlogPostDates(post: Pick<ServiceBlogPost, "date" | "updated">) {
  return {
    datePublished: post.date,
    dateModified: post.updated && post.updated >= post.date ? post.updated : post.date,
  };
}
