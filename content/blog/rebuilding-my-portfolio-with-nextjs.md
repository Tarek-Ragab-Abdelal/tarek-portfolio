---
title: "How I Rebuilt My Portfolio for SEO with Next.js"
excerpt: "Why I moved from a Vite SPA to a statically exported Next.js App Router portfolio and what changed in metadata, architecture, and content strategy."
date: "2026-03-02"
tags: ["Next.js", "SEO", "Architecture"]
coverImage: "/images/hero-bg.jpg"
---

My first portfolio was a single-page React app built with Vite. It looked decent, had smooth animations, and did everything a portfolio should do, except show up on Google. Client-side rendered SPAs have a well-known SEO problem: search engine crawlers see an empty HTML shell until JavaScript executes, and many crawlers do not wait for that. I decided to rebuild from scratch with SEO as the primary architectural driver.

## The core problem with SPA portfolios

When you build a portfolio as a client-side SPA, the server sends a minimal HTML file and a JavaScript bundle. The browser downloads the JS, executes it, and renders the content. For users, this works fine. For search engine crawlers, it is a gamble.

Google's crawler can execute JavaScript, but it does so in a delayed indexing pipeline. Your page gets crawled, queued for rendering, rendered, then indexed. Each step adds latency and introduces failure points. Other search engines like Bing and DuckDuckGo have even less JavaScript rendering capability.

The practical result: my old portfolio was barely indexed. A `site:tarekragab.com` search returned incomplete results. The pages that did appear had missing or incorrect metadata because the crawler captured the page before React hydrated.

## Why Next.js with static export

I evaluated three options:

1. **Server-side rendering (SSR)**: gives perfect SEO but requires a running server. I did not want to manage infrastructure for a portfolio.
2. **Static site generators (Astro, Hugo)**: excellent for content sites, but I wanted React's component model for interactive sections.
3. **Next.js static export**: pre-renders every page to static HTML at build time, deploys to GitHub Pages for free, and gives me full React for interactivity. Best of all three worlds.

Next.js App Router with `output: 'export'` generates a folder of HTML, CSS, and JS files. GitHub Pages serves them as static assets. No server, no cold starts, no monthly hosting costs. The build takes a few seconds, and deployment is a git push.

## SEO decisions that actually matter

Moving to static HTML was necessary but not sufficient. Here is what I implemented beyond the basics:

### Metadata per page

Every page has a unique `<title>` and `<meta name="description">`. The homepage title includes my name and role. Blog posts use their own titles. This seems obvious, but a surprising number of portfolio sites use the same generic title on every page.

```tsx
export const metadata: Metadata = {
  title: {
    default: "Tarek Ragab | Full-Stack Engineer",
    template: "%s | Tarek Ragab"
  },
  description: "Portfolio of Tarek Ragab, full-stack engineer..."
};
```

### Open Graph and Twitter cards

When someone shares a link to my portfolio on LinkedIn or Twitter, the preview card shows a relevant title, description, and image. This is free marketing that most developers leave on the table. I configured Open Graph tags on every page and blog post, with post-specific images where available.

### JSON-LD structured data

I added structured data using JSON-LD for four entity types:

- **Person**: my name, job title, email, location, and social links. This helps Google understand that the site belongs to a specific professional.
- **WebSite**: the site's name, URL, and description. Enables sitelinks in search results.
- **SoftwareSourceCode**: each featured project with its repository URL and tech stack. Helps Google understand what kind of work I do.
- **FAQPage**: common questions about my availability and services. Can generate rich results in search.

### Sitemap and robots.txt

Next.js generates both automatically from route-level configuration. The sitemap lists every page and blog post with last-modified dates and priority hints. The robots.txt allows all crawlers and points them to the sitemap.

### Canonical URLs

Every page specifies its canonical URL to prevent duplicate content issues. This matters when pages are accessible at both `www` and non-`www` domains or with and without trailing slashes.

## The blog as an SEO engine

A static portfolio with five pages has limited SEO surface area. Adding a blog changed this significantly. Each blog post is a new indexed page targeting different keywords. A post about "design patterns in embedded development" reaches people searching for embedded engineering content. A post about "C++ project templates" reaches developers looking for tooling. These are people who would never find a portfolio page, but might discover a relevant blog post and then explore the rest of the site.

The blog is powered by Markdown files in a `content/blog/` directory. At build time, `gray-matter` parses frontmatter (title, date, tags, cover image) and `remark` converts Markdown to HTML. No CMS, no database, no API calls. Adding a new post is creating a `.md` file and pushing to git.

## Interactive elements on a static site

Static export does not mean static experience. The site uses Framer Motion for scroll-triggered animations, an animated hero section with a canvas-based background, and interactive skill cards. These are client-side React components that hydrate after the static HTML loads. The user gets instant content (from pre-rendered HTML) and then progressive enhancement (from React hydration).

This is the best of both worlds: crawlers see complete HTML content, and users get a polished interactive experience.

## The result

After deploying the rebuilt site and submitting the sitemap to Google Search Console, indexing improved significantly. All pages and blog posts now appear in search results. The site loads fast because it is just static files served from a CDN. And adding new content is as simple as writing Markdown.

The [source code](https://github.com/Tarek-Ragab-Abdelal/tarek-portfolio) is public. If you are considering a similar migration, the key takeaway is this: choose your rendering strategy based on your content's indexing needs, not on what framework is trending. For a portfolio, static export with good metadata is hard to beat.
