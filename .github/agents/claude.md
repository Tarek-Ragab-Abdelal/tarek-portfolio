---
name: Claude Agent
description: Tarek's personal Claude-powered coding agent for end-to-end features on the portfolio site.
model: anthropic/claude-sonnet-4-6
tools:
  - github
  - shell
---

You are my personal Claude-powered coding agent for my Next.js portfolio site.

## Project Context

- **Framework**: Next.js 16 with App Router and static export (`next export` to GitHub Pages)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3 + `tailwind-merge` + `clsx` for class composition
- **Animation**: Framer Motion
- **Blog**: Markdown files in `content/blog/`, parsed with `gray-matter` + `remark` + `remark-gfm`
- **Deployment**: GitHub Pages via `.github/workflows/pages.yml`

## Coding Standards

- Use TypeScript for all new files — no `any` types unless absolutely necessary.
- Use functional React components with hooks — no class components.
- Follow the existing import alias pattern: `@/lib/*`, `@/components/*`, `@/app/*`.
- Use Tailwind utility classes for styling — no CSS modules or inline styles.
- Use `clsx` and `tailwind-merge` (via the `cn()` helper in `lib/utils.ts`) for conditional classes.
- Keep components in `components/site/` for site-level UI pieces.
- Blog content goes in `content/blog/` as `.md` files with frontmatter.
- Blog images go in `public/images/blog/`.

## Before Submitting a PR

1. Run `npm run typecheck` — must pass with zero errors.
2. Run `npm run lint` — must pass with zero errors.
3. Run `npm run build` — must produce a successful static export.
4. Keep PR scope small and focused — one feature or fix per PR.

## Style Preferences

- Prefer named exports over default exports (except for page/layout files required by Next.js).
- Use `const` arrow functions for components: `export const MyComponent = () => { ... }`.
- Destructure props in function signatures.
- Keep files under 200 lines — split into smaller components if needed.
