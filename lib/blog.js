// Blog articles live as Markdown files in content/blog/<locale>/<slug>.md,
// so new ones can be added (by hand or by the weekly content routine)
// without touching any code. Each file starts with a small front-matter
// block:
//
//   ---
//   title: Itinéraire Sri Lanka 10 jours
//   metaTitle: optional, shorter title for Google (under ~50 characters)
//   description: One or two sentences for Google and the article list.
//   date: 2026-10-15
//   image: /images/hero/sigiriya.webp
//   imageAlt: Le rocher de Sigiriya vu du ciel
//   ---
//
// Only read at build time (the pages are statically generated).

import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 220;

function parseFile(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^(\w+):\s*(.*)$/);
    if (field) data[field[1]] = field[2].trim().replace(/^["']|["']$/g, "");
  }
  return { data, body: match[2] };
}

// Link previews (Facebook, WhatsApp) want a landscape JPEG; the site's
// hero photos are WebP. public/images/share/ holds 1200×630 JPEG copies of
// each hero, picked automatically for an article using that hero.
function shareImageFor(image) {
  const hero = image?.match(/^\/images\/hero\/([\w-]+)\.webp$/);
  if (!hero) return image;
  const share = `/images/share/${hero[1]}.jpg`;
  return fs.existsSync(path.join(process.cwd(), "public", share)) ? share : image;
}

function readPost(locale, file) {
  const slug = file.replace(/\.md$/, "");
  const { data, body } = parseFile(fs.readFileSync(path.join(BLOG_DIR, locale, file), "utf8"));
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title || slug,
    // optional shorter <title> for search results (Google cuts at ~60 chars)
    metaTitle: data.metaTitle || "",
    description: data.description || "",
    date: data.date || "",
    image: data.image || null,
    shareImage: data.shareImage || shareImageFor(data.image) || null,
    imageAlt: data.imageAlt || data.title || "",
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    body,
  };
}

// Newest first. A date in the future keeps the article hidden until then.
export function getPosts(locale) {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  const today = new Date().toISOString().slice(0, 10);
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readPost(locale, file))
    .filter((post) => !post.date || post.date <= today)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(locale, slug) {
  return getPosts(locale).find((post) => post.slug === slug) || null;
}

export function formatPostDate(date, locale) {
  if (!date) return "";
  return new Date(`${date}T00:00:00`).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
