import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { SITE_URL, personalInfo } from "@/lib/portfolio-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;
export const dynamic = "force-static";
export const revalidate = false;
export const runtime = "nodejs";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: personalInfo.name, url: SITE_URL }],
    keywords: post.tags,
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [personalInfo.name],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const relatedPosts = getRelatedPosts(post.slug, post.tags, 3);
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: personalInfo.name,
      url: SITE_URL
    },
    publisher: {
      "@type": "Person",
      name: personalInfo.name,
      url: SITE_URL
    },
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    image: post.coverImage ? [`${SITE_URL}${post.coverImage}`] : undefined,
    keywords: post.tags.join(", ")
  };

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

          {relatedPosts.length > 0 && (
            <section className="mt-10 border-t border-line pt-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-accent">Continue reading</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Related engineering notes</h2>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-white">
                  Browse all posts <ExternalLink size={14} />
                </Link>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.slug} className="rounded-xl border border-line bg-bg/40 p-4">
                    <p className="text-xs text-muted">
                      {new Date(relatedPost.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </p>
                    <h3 className="mt-2 text-sm font-semibold text-white">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-accent">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{relatedPost.excerpt}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
    </>
  );
}
