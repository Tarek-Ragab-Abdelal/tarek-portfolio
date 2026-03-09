import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  coverImage?: string;
  sourceUrl?: string;
  readingTimeMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  html: string;
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 190));
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md"));
}

export function getAllPosts(): BlogPostMeta[] {
  return getMarkdownFiles()
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIRECTORY, fileName), "utf8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: String(data.title ?? slug),
        excerpt: String(data.excerpt ?? ""),
        date: String(data.date ?? "1970-01-01"),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        coverImage: data.coverImage ? String(data.coverImage) : undefined,
        sourceUrl: data.sourceUrl ? String(data.sourceUrl) : undefined,
        readingTimeMinutes: estimateReadingTime(content)
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRecentPosts(limit = 3): BlogPostMeta[] {
  return getAllPosts().slice(0, limit);
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): BlogPostMeta[] {
  const normalizedTags = new Set(tags.map((tag) => tag.toLowerCase()));

  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      const aSharedTags = a.tags.filter((tag) => normalizedTags.has(tag.toLowerCase())).length;
      const bSharedTags = b.tags.filter((tag) => normalizedTags.has(tag.toLowerCase())).length;

      if (bSharedTags !== aSharedTags) {
        return bSharedTags - aSharedTags;
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const postPath = path.join(BLOG_DIRECTORY, `${slug}.md`);

  if (!fs.existsSync(postPath)) {
    return null;
  }

  const raw = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  let html = String(processed);

  // Strip leading image if coverImage is already rendered by the template
  if (data.coverImage) {
    html = html.replace(/^\s*<p><img[^>]*><\/p>\s*/, "");
  }

  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? "1970-01-01"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    sourceUrl: data.sourceUrl ? String(data.sourceUrl) : undefined,
    readingTimeMinutes: estimateReadingTime(content),
    html
  };
}
