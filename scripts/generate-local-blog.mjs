import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content", "blog");
const OUT_DIR = path.join(ROOT, "public", "local-blog");
const POSTS_DIR = path.join(OUT_DIR, "posts");

function keywordsFromFrontmatter(keywords) {
  if (!keywords) return [];
  if (Array.isArray(keywords)) return keywords.map((k) => String(k).trim()).filter(Boolean);
  return String(keywords)
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

function estimateReadingTime(content) {
  const words = String(content || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function isFiniteNumber(n) {
  return typeof n === "number" && Number.isFinite(n);
}

async function main() {
  const files = (await fs.readdir(CONTENT_DIR)).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  // Clear previous generated JSON so stale IDs don't stick around
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(POSTS_DIR, { recursive: true });

  const seenIds = new Map(); // id -> filename
  const index = [];

  for (const filename of files) {
    const slug = filename.replace(/\.(md|mdx)$/, "");
    const raw = await fs.readFile(path.join(CONTENT_DIR, filename), "utf8");
    const { data, content } = matter(raw);

    const idRaw = data?.id;
    const idNum = typeof idRaw === "number" ? idRaw : Number(idRaw);
    if (!isFiniteNumber(idNum)) {
      throw new Error(
        `Local blog post "${filename}" is missing a valid frontmatter id. Add e.g. id: 2000001`
      );
    }
    if (seenIds.has(idNum)) {
      throw new Error(
        `Duplicate local blog id "${idNum}" in "${filename}" and "${seenIds.get(idNum)}". IDs must be unique.`
      );
    }
    seenIds.set(idNum, filename);

    const title = data?.title || slug;
    const description = data?.description || "";
    const date = data?.date || new Date().toISOString().slice(0, 10);
    const author = data?.author || "Cheyanne Harris";
    const keywords = keywordsFromFrontmatter(data?.keywords);
    const readingTime = estimateReadingTime(content);
    const imageUrl = data?.image || data?.featureImage || "/images/blog/default.jpg";
    const featureImage = data?.featureImage;

    const processedContent = await remark()
      .use(remarkGfm)
      .use(html)
      .process(String(content || ""));
    const contentHtml = processedContent.toString();

    const post = {
      id: idNum,
      local: true,
      slug,
      title,
      description,
      date,
      author,
      keywords,
      featured: Boolean(data?.featured),
      image: imageUrl,
      featureImage,
      content: contentHtml,
      readingTime,
      isHtml: true,
    };

    const meta = {
      id: post.id,
      local: true,
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      author: post.author,
      keywords: post.keywords,
      featured: post.featured,
      image: post.image,
      featureImage: post.featureImage,
      readingTime: post.readingTime,
    };

    index.push(meta);
    await fs.writeFile(path.join(POSTS_DIR, `${idNum}.json`), JSON.stringify(post, null, 2), "utf8");
  }

  index.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const payload = {
    generatedAt: new Date().toISOString(),
    posts: index,
  };

  await fs.writeFile(path.join(OUT_DIR, "index.json"), JSON.stringify(payload, null, 2), "utf8");
  console.log(`Generated ${index.length} local blog posts into public/local-blog/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

