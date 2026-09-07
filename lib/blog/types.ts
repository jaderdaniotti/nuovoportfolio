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
  date: string;
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
    keywords: post.keywords,
    service: post.service,
  };
}
