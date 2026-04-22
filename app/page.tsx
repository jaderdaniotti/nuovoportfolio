import type { Metadata } from "next";
import { HomePageShell } from "@/components/home-page-shell";
import { projects as fallbackProjects, type HomeProject } from "@/lib/home-content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

type SupabaseProjectRow = {
  title: string;
  description: string | null;
  featured: boolean | null;
  cover_image: string | null;
  domain_url: string | null;
  github_url: string | null;
};

function resolveProjectCoverUrl(rawCover: string | null, supabaseUrl: string): string | null {
  if (!rawCover) return null;
  const value = rawCover.trim();
  if (!value) return null;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("data:image/")) {
    return value;
  }

  const { origin } = new URL(supabaseUrl);

  if (value.startsWith("/")) {
    return `${origin}${value}`;
  }

  if (value.startsWith("storage/v1/")) {
    return `${origin}/${value}`;
  }

  // Handles values like "bucket-name/path/file.jpg".
  return `${origin}/storage/v1/object/public/${value.replace(/^\/+/, "")}`;
}

async function getProjects(): Promise<HomeProject[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return fallbackProjects;
  }

  const endpoint = new URL("/rest/v1/projects", supabaseUrl);
  endpoint.searchParams.set(
    "select",
    "title,description,featured,cover_image,domain_url,github_url,order_index,created_at",
  );
  endpoint.searchParams.set("order", "order_index.asc.nullslast,created_at.desc");

  try {
    const response = await fetch(endpoint.toString(), {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return fallbackProjects;
    }

    const data = (await response.json()) as SupabaseProjectRow[];

    if (!Array.isArray(data) || data.length === 0) {
      return fallbackProjects;
    }

    return data.map((project) => ({
      title: project.title,
      description: project.description ?? "Dettagli progetto disponibili su richiesta.",
      role: project.featured ? "Progetto in evidenza" : "Progetto web",
      coverImage: resolveProjectCoverUrl(project.cover_image, supabaseUrl),
      projectUrl: project.domain_url ?? project.github_url ?? null,
    }));
  } catch {
    return fallbackProjects;
  }
}

export default async function Home() {
  const projects = await getProjects();

  return <HomePageShell projects={projects} />;
}
