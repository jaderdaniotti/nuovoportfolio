import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  keywords: string[];
  readingMinutes: number;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

function toKeywords(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

async function readPostFile(fileName: string): Promise<BlogPost | null> {
  const fullPath = path.join(BLOG_DIR, fileName);
  const source = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(source);

  const slug = fileName.replace(/\.mdx$/, "");
  const title = String(data.title ?? "").trim();
  const description = String(data.description ?? "").trim();
  const date = String(data.date ?? "").trim();
  const image = String(data.image ?? "placeholder.jpg").trim();
  const keywords = toKeywords(data.keywords);
  const words = content.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(4, Math.round(words / 220));

  if (!title || !description || !date) {
    return null;
  }

  return {
    slug,
    title,
    description,
    date,
    image,
    keywords,
    readingMinutes,
    content,
  };
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  let entries: string[] = [];
  try {
    entries = await fs.readdir(BLOG_DIR);
  } catch {
    return [];
  }

  const files = entries.filter((entry) => entry.endsWith(".mdx"));
  const posts = await Promise.all(files.map((file) => readPostFile(file)));

  return posts
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      image: post.image,
      keywords: post.keywords,
      readingMinutes: post.readingMinutes,
    }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const fileName = `${slug}.mdx`;
  try {
    const post = await readPostFile(fileName);
    if (!post) return null;
    return post;
  } catch {
    return null;
  }
}

export async function renderPostContent(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  return String(result);
}
