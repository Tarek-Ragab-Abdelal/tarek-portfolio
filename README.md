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

## Writing

Articles published on the site ([all posts](https://www.tarekragab.com/blog/)):

- [How I Actually Use AI Tools as a Software Engineer](https://www.tarekragab.com/blog/ai-tools-for-software-engineers/)
- [How I Rebuilt My Portfolio for SEO with Next.js](https://www.tarekragab.com/blog/rebuilding-my-portfolio-with-nextjs/)
- [REST vs WebSockets vs MQTT: Choosing the Right Protocol for IoT Projects](https://www.tarekragab.com/blog/rest-vs-websockets-vs-mqtt-iot/)
- [Engineering Lessons from Data and IoT Product Work](https://www.tarekragab.com/blog/engineering-lessons-from-data-and-iot-projects/)
- [Design Patterns in Embedded Development: A Practical Approach](https://www.tarekragab.com/blog/design-patterns-in-embedded-development-practical-approach/)
- [C++ Project Template with CMake and VSCode](https://www.tarekragab.com/blog/cpp-project-template-cmake-vscode/)
- [Rebuilding the GF3 Licenser Desktop App with Flutter](https://www.tarekragab.com/blog/rebuilding-gf3-licenser-desktop-app-flutter/)
- [IoT Solution Design Talk at AUC (Made In Egypt 2023)](https://www.tarekragab.com/blog/iot-solution-design-talk-at-auc/)
- [Maze-Solver Robot: pi-bot](https://www.tarekragab.com/blog/maze-solver-robot-pi-bot/)
- [Throwback: Introduction to IoT Session at HTI](https://www.tarekragab.com/blog/throwback-introduction-to-iot-session-hti/)

## Content editing

- Main profile/projects: `lib/portfolio-data.ts`
- Blog posts: `content/blog/*.md`

## Deploy

Push to `main` and GitHub Actions deploys the `out/` folder to GitHub Pages.
