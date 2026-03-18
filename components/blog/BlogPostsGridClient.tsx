'use client';

import { useEffect, useMemo, useState } from "react";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPostMeta } from "@/lib/blog";

type Props = {
  initialPosts: BlogPostMeta[];
  fallbackPosts: BlogPostMeta[];
};

type ApiBlogResponse = { results?: any[] } | any[];

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

export default function BlogPostsGridClient({ initialPosts, fallbackPosts }: Props) {
  const [posts, setPosts] = useState<BlogPostMeta[]>(initialPosts);
  const apiUrl = useMemo(() => buildBlogListUrl(), []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const apiPosts = await fetchApiPosts(apiUrl);
        if (cancelled) return;
        if (apiPosts.length > 0) setPosts(apiPosts);
        else setPosts(fallbackPosts);
      } catch {
        if (!cancelled) setPosts(fallbackPosts);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [apiUrl, fallbackPosts]);

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-industrial-600">
          Blog posts coming soon! Check back for expert insights on Hastelloy flanges.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
