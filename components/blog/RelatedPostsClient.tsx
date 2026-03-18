'use client';

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPostMeta } from "@/lib/blog";

type Props = {
  currentSlug: string;
  keywords: string[];
  initialPosts: BlogPostMeta[];
  limit?: number;
  localOnly?: boolean;
};

type ApiBlogResponse = { results?: any[] } | any[];
type LocalIndexResponse = { posts?: BlogPostMeta[] };

function buildBlogListUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || "hastelloy-flanges";
  const url = new URL(`/api/v1/${tenantSlug}/blog/`, baseUrl);
  url.searchParams.set("ordering", "-published_date");
  return url.toString();
}

function mapApiMetaToFrontend(post: any): BlogPostMeta {
  const keywords =
    typeof post?.meta_keywords === "string"
      ? post.meta_keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
      : [];

  return {
    id: post.id,
    local: false,
    slug: post.slug,
    title: post.title,
    description: post.meta_description || post.excerpt || "",
    date: post.published_date || post.created_at,
    author: post.author,
    keywords,
    featured: !!post.featured,
    image: post.image || post.og_image || "/images/blog/default.jpg",
    featureImage: undefined,
    readingTime: post.reading_time,
  };
}

async function fetchApiPosts(url: string): Promise<BlogPostMeta[]> {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
  if (!res.ok) return [];
  const data = (await res.json()) as ApiBlogResponse;
  const arr = Array.isArray(data) ? data : data.results || [];
  return arr.map(mapApiMetaToFrontend);
}

async function fetchLocalPostsIndex(): Promise<BlogPostMeta[]> {
  const res = await fetch("/local-blog/index.json");
  if (!res.ok) return [];
  const data = (await res.json()) as LocalIndexResponse;
  return data.posts || [];
}

function scorePost(post: BlogPostMeta, keywords: string[]): number {
  if (!keywords.length) return 0;
  const hay = `${post.keywords?.join(", ") || ""} ${post.title || ""}`.toLowerCase();
  return keywords.reduce((acc, k) => (k && hay.includes(k.toLowerCase()) ? acc + 1 : acc), 0);
}

function buildRelated(
  posts: BlogPostMeta[],
  currentSlug: string,
  keywords: string[],
  limit: number
): BlogPostMeta[] {
  const filtered = posts.filter((p) => p.slug && p.slug !== currentSlug);
  const kw = (keywords || []).map((k) => k.trim()).filter(Boolean);
  return filtered
    .map((post) => ({ post, score: scorePost(post, kw) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

export default function RelatedPostsClient({
  currentSlug,
  keywords,
  initialPosts,
  limit = 3,
  localOnly = false,
}: Props) {
  const [posts, setPosts] = useState<BlogPostMeta[]>(
    buildRelated(initialPosts, currentSlug, keywords, limit)
  );

  const apiUrl = useMemo(() => buildBlogListUrl(), []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (localOnly) {
        try {
          const localPosts = await fetchLocalPostsIndex();
          if (cancelled) return;
          const related = buildRelated(localPosts, currentSlug, keywords, limit);
          if (related.length > 0) setPosts(related);
        } catch {
          // keep initial related posts
        }
        return;
      }

      try {
        const apiPosts = await fetchApiPosts(apiUrl);
        if (cancelled) return;
        const related = buildRelated(apiPosts, currentSlug, keywords, limit);
        if (related.length > 0) setPosts(related);
      } catch {
        // keep initial related posts
      }
    }
    run();
    return () => { cancelled = true; };
  }, [apiUrl, currentSlug, keywords, limit, localOnly]);

  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-industrial-900">Related Articles</h2>
          <p className="mt-2 text-lg text-industrial-600">
            Continue learning about Hastelloy flanges
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, limit).map((relatedPost) => (
            <BlogCard key={relatedPost.slug} post={relatedPost} />
          ))}
        </div>
      </Container>
    </section>
  );
}
