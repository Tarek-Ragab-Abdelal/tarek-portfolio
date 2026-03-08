#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT_DIR = process.cwd();
const BLOG_DIR = path.join(ROOT_DIR, "content", "blog");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const FRONTMATTER_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SKIPPED_BLOG_FILES = new Set(["AGENTS.md", "codex.md"]);

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function readBlogFiles(targets) {
  if (targets.length > 0) {
    return targets.map((target) => path.resolve(ROOT_DIR, target));
  }

  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((entry) => entry.endsWith(".md") && !SKIPPED_BLOG_FILES.has(entry))
    .sort()
    .map((entry) => path.join(BLOG_DIR, entry));
}

function validateDate(raw) {
  if (!FRONTMATTER_DATE_RE.test(raw)) {
    return false;
  }

  const parsed = new Date(`${raw}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === raw;
}

function validateUrl(raw) {
  try {
    const value = new URL(raw);
    return value.protocol === "http:" || value.protocol === "https:";
  } catch {
    return false;
  }
}

function publicPathExists(assetPath) {
  const normalized = assetPath.startsWith("/") ? assetPath.slice(1) : assetPath;
  return fs.existsSync(path.join(PUBLIC_DIR, normalized));
}

const targets = process.argv.slice(2);
const files = readBlogFiles(targets);
const errors = [];
const warnings = [];

if (files.length === 0) {
  console.log("No blog posts found to validate.");
  process.exit(0);
}

for (const filePath of files) {
  const relativePath = path.relative(ROOT_DIR, filePath);
  const fileName = path.basename(filePath, ".md");

  if (!SLUG_RE.test(fileName)) {
    errors.push(`${relativePath}: filename must be kebab-case.`);
    continue;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (!isNonEmptyString(data.title)) {
    errors.push(`${relativePath}: title is required.`);
  }

  if (!isNonEmptyString(data.excerpt)) {
    errors.push(`${relativePath}: excerpt is required.`);
  }

  if (!isNonEmptyString(data.date) || !validateDate(String(data.date))) {
    errors.push(`${relativePath}: date must use YYYY-MM-DD.`);
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0 || data.tags.some((tag) => !isNonEmptyString(String(tag)))) {
    errors.push(`${relativePath}: tags must be a non-empty string array.`);
  }

  const coverImage = typeof data.coverImage === "string" ? data.coverImage.trim() : "";
  if (coverImage) {
    if (!coverImage.startsWith("/images/")) {
      errors.push(`${relativePath}: coverImage must be rooted at /images/...`);
    } else if (!publicPathExists(coverImage)) {
      errors.push(`${relativePath}: coverImage does not exist in public/: ${coverImage}`);
    }
  }

  const sourceUrl = typeof data.sourceUrl === "string" ? data.sourceUrl.trim() : "";
  if (sourceUrl && !validateUrl(sourceUrl)) {
    errors.push(`${relativePath}: sourceUrl must be a valid http or https URL.`);
  }

  if (!isNonEmptyString(content)) {
    errors.push(`${relativePath}: post body is empty.`);
  }

  if (coverImage && raw.includes(`![](${coverImage})`)) {
    warnings.push(`${relativePath}: cover image is duplicated as a Markdown image.`);
  }
}

if (warnings.length > 0) {
  console.log("Warnings:");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
  console.log("");
}

if (errors.length > 0) {
  console.error("Blog validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validated ${files.length} blog post(s).`);
