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
  description: "Engineering notes, architecture guides, and product implementation insights by Tarek Ragab."
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="container py-14 md:py-20">
        <Reveal className="space-y-8">
          <header className="space-y-4">
            <span className="badge-pill">Technical Blog</span>
            <h1 className="font-display text-4xl font-semibold text-white md:text-5xl">Implementation notes and product lessons</h1>
            <p className="max-w-3xl text-sm leading-relaxed text-muted md:text-base">
              Posts are written in Markdown and statically generated with Next.js for fast loading and strong SEO indexing.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="section-shell noise-mask p-6">
                {post.coverImage ? (
                  <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-2xl border border-line/70">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 560px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <p className="text-xs uppercase tracking-[0.13em] text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-white">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted">
                  <span>{post.readingTimeMinutes} min read</span>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-accent hover:text-white">
                    Read post <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
