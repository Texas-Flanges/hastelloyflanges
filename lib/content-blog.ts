/**
 * Local blog content from texas-flange/content/blog/*.md
 * Fallback when API is down/empty (static export friendly).
 */
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { BlogPost, BlogPostMeta } from "./blog";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface LocalPostFrontmatter {
  id?: number | string;
  local?: boolean;
  title: string;
  description?: string;
  date?: string;
  author?: string;
  keywords?: string[] | string;
  featured?: boolean;
  image?: string;
  featureImage?: string;
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.(md|mdx)$/, "");
}

function keywordsFromFrontmatter(keywords: string[] | string | undefined): string[] {
  if (!keywords) return [];
  if (Array.isArray(keywords)) return keywords.map((k) => String(k).trim()).filter(Boolean);
  return String(keywords)
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

function estimateReadingTime(content: string): string {
  const words = (content || "").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export async function getLocalBlogSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
      .map(slugFromFilename);
  } catch (error) {
    console.error("Error reading local blog directory:", error);
    return [];
  }
}

export async function getLocalPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    const fm = data as unknown as LocalPostFrontmatter;

    const date = fm.date || new Date().toISOString().slice(0, 10);
    const keywords = keywordsFromFrontmatter(fm.keywords);
    const readingTimeText = estimateReadingTime(content || "");
    const imageUrl = fm.image || fm.featureImage || "/images/blog/default.jpg";
    const idRaw = fm.id;
    const idNum = typeof idRaw === "number" ? idRaw : Number(idRaw);

    const processedContent = await remark().use(html).process(content || "");
    const contentHtml = processedContent.toString();

    return {
      id: Number.isFinite(idNum) ? idNum : undefined,
      local: true,
      slug,
      title: fm.title || slug,
      description: fm.description || "",
      date,
      author: fm.author || "Cheyanne Harris",
      keywords,
      featured: fm.featured ?? false,
      image: imageUrl,
      featureImage: fm.featureImage,
      content: contentHtml,
      readingTime: readingTimeText,
      isHtml: true,
    };
  } catch {
    return null;
  }
}

export async function getLocalBlogPosts(): Promise<BlogPostMeta[]> {
  const slugs = await getLocalBlogSlugs();
  const posts: BlogPostMeta[] = [];

  for (const slug of slugs) {
    const post = await getLocalPostBySlug(slug);
    if (!post) continue;

    posts.push({
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
    });
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}
