#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const BLOG_DIR = path.join(ROOT_DIR, "content", "blog");
const DEFAULT_TIMEZONE = "Africa/Cairo";

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function todayInTimezone(timeZone) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

function parseArgs(argv) {
  const result = {
    slug: "",
    title: "",
    excerpt: "",
    date: todayInTimezone(DEFAULT_TIMEZONE),
    tags: ["Engineering"],
    coverImage: "",
    sourceUrl: "",
    stdout: false,
    force: false
  };

  const args = [...argv];
  while (args.length > 0) {
    const current = args.shift();

    if (!current) {
      continue;
    }

    if (!current.startsWith("--") && !result.slug) {
      result.slug = current;
      continue;
    }

    switch (current) {
      case "--slug":
        result.slug = args.shift() ?? "";
        break;
      case "--title":
        result.title = args.shift() ?? "";
        break;
      case "--excerpt":
        result.excerpt = args.shift() ?? "";
        break;
      case "--date":
        result.date = args.shift() ?? "";
        break;
      case "--tags": {
        const raw = args.shift() ?? "";
        result.tags = raw
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
        break;
      }
      case "--cover-image":
        result.coverImage = args.shift() ?? "";
        break;
      case "--source-url":
        result.sourceUrl = args.shift() ?? "";
        break;
      case "--stdout":
        result.stdout = true;
        break;
      case "--force":
        result.force = true;
        break;
      case "-h":
      case "--help":
        console.log(`Usage:\n  npm run blog:new -- <slug> [options]\n\nOptions:\n  --title <title>\n  --excerpt <excerpt>\n  --date <YYYY-MM-DD>\n  --tags <tag1,tag2>\n  --cover-image </images/blog/file.png>\n  --source-url <https://...>\n  --stdout\n  --force`);
        process.exit(0);
      default:
        fail(`Unknown option: ${current}`);
    }
  }

  return result;
}

function validateSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function renderFrontmatter(data) {
  const tags = data.tags.map((tag) => `"${tag.replace(/"/g, '\\"')}"`).join(", ");
  return [
    "---",
    `title: \"${data.title.replace(/\"/g, '\\\"')}\"`,
    `excerpt: \"${data.excerpt.replace(/\"/g, '\\\"')}\"`,
    `date: \"${data.date}\"`,
    `tags: [${tags}]`,
    `coverImage: \"${data.coverImage}\"`,
    `sourceUrl: \"${data.sourceUrl}\"`,
    "---",
    ""
  ].join("\n");
}

function renderBody(data) {
  return [
    "Start with a strong opening paragraph that states the core thesis and why the topic matters now.",
    "",
    "## The problem",
    "",
    "Explain the real-world context, constraints, or failure mode that motivated the post.",
    "",
    "## What changed",
    "",
    "Describe the approach, decision, or implementation with concrete detail.",
    "",
    "## What I would repeat",
    "",
    "List the practical takeaways, tradeoffs, or patterns worth carrying forward.",
    "",
    "## Closing note",
    "",
    `End with a concise conclusion tied back to ${data.title.toLowerCase()}.`,
    ""
  ].join("\n");
}

const options = parseArgs(process.argv.slice(2));

if (!options.slug) {
  fail("A slug is required. Example: npm run blog:new -- edge-observability-patterns");
}

if (!validateSlug(options.slug)) {
  fail("Slug must be kebab-case and contain only lowercase letters, numbers, and hyphens.");
}

const title = options.title || titleFromSlug(options.slug);
const excerpt = options.excerpt || `A practical breakdown of ${title.toLowerCase()} from an engineering perspective.`;
const targetPath = path.join(BLOG_DIR, `${options.slug}.md`);
const output = `${renderFrontmatter({ ...options, title, excerpt })}${renderBody({ ...options, title, excerpt })}`;

if (options.stdout) {
  process.stdout.write(output);
  process.exit(0);
}

if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

if (fs.existsSync(targetPath) && !options.force) {
  fail(`File already exists: ${targetPath}. Use --force to overwrite.`);
}

fs.writeFileSync(targetPath, output, "utf8");
console.log(`Created ${path.relative(ROOT_DIR, targetPath)}`);
