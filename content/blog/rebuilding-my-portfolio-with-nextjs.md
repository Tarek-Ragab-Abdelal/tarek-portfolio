---
title: "How I Rebuilt My Portfolio for SEO with Next.js"
excerpt: "Why I moved from a Vite SPA to a statically exported Next.js App Router portfolio and what changed in metadata, architecture, and content strategy."
date: "2026-03-02"
tags: ["Next.js", "SEO", "Architecture"]
coverImage: "/images/hero-bg.jpg"
---

## Why move from SPA routing to static pages

A portfolio should load fast, index well, and be easy to maintain. My old setup was a client-side SPA. It worked for interactions, but I wanted stronger out-of-the-box SEO and cleaner content architecture for future blog posts.

## What changed in the stack

I migrated to Next.js App Router and configured static export for GitHub Pages. This gave me:

- Pre-rendered routes for homepage and blog pages.
- Better metadata controls per page.
- Structured data at layout level.
- A cleaner path to scale content with Markdown posts.

## SEO-first decisions

The rebuild focused on discoverability:

1. Canonical metadata and Open Graph setup.
2. JSON-LD for person profile, website, projects, and FAQ.
3. Automatic sitemap and robots generation.
4. Semantic sectioning for crawlable content.

## UI and interaction direction

The interface was redesigned with motion as product feedback, not decoration:

- Section reveal animations on scroll.
- Interactive project spotlight selection.
- Skill grouping with live switching.

The goal is simple: immediate clarity for first-time visitors and a better narrative for recruiters, clients, and collaborators.
