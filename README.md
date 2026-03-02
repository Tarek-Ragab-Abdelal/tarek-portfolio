# Tarek Ragab Portfolio (Next.js)

SEO-first personal portfolio rebuilt with Next.js App Router, static export, and GitHub Pages deployment.

## Stack

- Next.js (App Router, static export)
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Markdown blog pipeline (`gray-matter`, `remark`)

## Features

- Static SEO-friendly pages and blog posts
- JSON-LD structured data (Person, Website, Projects, FAQ)
- Interactive project showcase and animated sections
- Blog as Markdown content under `content/blog`
- GitHub Pages workflow publishing from `out/`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for production

```bash
npm run build
```

This generates a static site in `out/` for GitHub Pages.

## Content editing

- Main profile/projects: `lib/portfolio-data.ts`
- Blog posts: `content/blog/*.md`

## Deploy

Push to `main` and GitHub Actions deploys the `out/` folder to GitHub Pages.
