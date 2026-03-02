import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { SITE_URL } from "@/lib/portfolio-data";

interface BlogPostPageProps {
  params: { slug: string };
}

export const dynamicParams = false;
export const dynamic = "force-static";
export const revalidate = false;
export const runtime = "nodejs";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="container py-16 md:py-20">
        <article className="mx-auto max-w-3xl rounded-xl border border-line bg-surface p-6 md:p-10">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-white">
            <ArrowLeft size={12} /> Back to Blog
          </Link>

          <header className="mt-6 space-y-3 border-b border-line pb-6">
            <h1 className="text-2xl font-bold text-white md:text-3xl">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span>{post.readingTimeMinutes} min read</span>
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-line px-2 py-0.5 text-[11px]">{tag}</span>
              ))}
            </div>
            {post.sourceUrl && (
              <Link href={post.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-white">
                Original LinkedIn Post <ExternalLink size={11} />
              </Link>
            )}
          </header>

          {post.coverImage && (
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-lg">
              <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            </div>
          )}

          <section className="prose prose-invert mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
      <Footer />
    </>
  );
}
