import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { Reveal } from "@/components/site/reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering notes, architecture guides, and product implementation insights by Tarek Ragab.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/feed.xml"
    }
  }
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="container py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-accent">Technical Blog</p>
              <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Implementation notes & product lessons</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                Posts are written in Markdown and statically generated with Next.js for fast loading and strong SEO indexing.
              </p>
            </div>
            <Link href="/feed.xml" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-white">
              Subscribe via RSS <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.04}>
              <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/40">
                {post.coverImage && (
                  <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg">
                    <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 520px" className="object-cover" />
                  </div>
                )}
                <p className="text-xs text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted">
                  <span>{post.readingTimeMinutes} min read</span>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 font-medium text-accent hover:text-white">
                    Read post <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
