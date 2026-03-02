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
  params: {
    slug: string;
  };
}

export const dynamicParams = false;
export const dynamic = "force-static";
export const revalidate = false;
export const runtime = "nodejs";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPosts().map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found"
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
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

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="container py-14 md:py-20">
        <article className="mx-auto max-w-3xl section-shell noise-mask p-7 md:p-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted hover:text-white">
            <ArrowLeft size={13} />
            Back to Blog
          </Link>

          <header className="mt-6 space-y-4 border-b border-line/70 pb-6">
            <h1 className="font-display text-3xl font-semibold text-white md:text-4xl">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </span>
              <span>{post.readingTimeMinutes} min read</span>
              {post.tags.map((tag) => (
                <span key={tag} className="badge-pill">
                  {tag}
                </span>
              ))}
            </div>
            {post.sourceUrl ? (
              <Link
                href={post.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-accent hover:text-white"
              >
                Original LinkedIn Post
                <ExternalLink size={13} />
              </Link>
            ) : null}
          </header>

          {post.coverImage ? (
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-line/70">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          ) : null}

          <section
            className="prose prose-invert mt-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
