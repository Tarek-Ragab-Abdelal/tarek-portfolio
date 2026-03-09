import { getAllPosts } from "@/lib/blog";
import { SITE_URL, personalInfo } from "@/lib/portfolio-data";

export const dynamic = "force-static";
export const revalidate = false;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const lastBuildDate = posts[0]?.date ?? new Date().toISOString();

  const items = posts
    .map((post) => {
      const postUrl = `${SITE_URL}/blog/${post.slug}`;

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${postUrl}</link>
          <guid>${postUrl}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description>${escapeXml(post.excerpt)}</description>
        </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(`${personalInfo.name} Blog`)}</title>
        <link>${SITE_URL}/blog</link>
        <description>${escapeXml("Engineering notes, architecture guides, and product implementation insights by Tarek Ragab.")}</description>
        <language>en</language>
        <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
