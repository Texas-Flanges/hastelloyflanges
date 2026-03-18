/**
 * Blog utilities - API first, local markdown fallback for static export.
 */
import { apiClient, BlogPost as ApiBlogPost, BlogPostMeta as ApiBlogPostMeta } from "./api";
import { getLocalBlogPosts, getLocalBlogSlugs, getLocalPostBySlug } from "./content-blog";

export interface BlogPost {
    id?: number;
    local?: boolean;
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    keywords: string[];
    featured?: boolean;
    image?: string;
    featureImage?: string;
    content: string;
    readingTime?: string;
    isHtml?: boolean;
}

export interface BlogPostMeta {
    id?: number;
    local?: boolean;
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    keywords: string[];
    featured?: boolean;
    image?: string;
    featureImage?: string;
    readingTime?: string;
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function parseKeywords(raw: string | null | undefined): string[] {
    if (!raw) return [];
    return String(raw)
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
}

function sharedMeta(post: ApiBlogPost | ApiBlogPostMeta): Omit<BlogPostMeta, "id" | "local"> {
    return {
          slug: post.slug,
          title: post.title,
          description: post.meta_description || ("excerpt" in post ? post.excerpt : "") || "",
          date: post.published_date ?? post.created_at,
          author: post.author,
          keywords: parseKeywords(post.meta_keywords),
          featured: post.featured,
          image: post.image || post.og_image || "/images/blog/default.jpg",
          featureImage: undefined,
          readingTime: post.reading_time,
    };
}

function mapApiPost(post: ApiBlogPost): BlogPost {
    return {
          ...sharedMeta(post),
          id: post.id,
          local: false,
          content: post.content,
          isHtml: post.content?.trim().startsWith("<") ?? true,
    };
}

function mapApiPostMeta(post: ApiBlogPostMeta): BlogPostMeta {
    return {
          ...sharedMeta(post),
          id: post.id,
          local: false,
    };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getAllPostSlugs(): Promise<string[]> {
    try {
          const posts = await apiClient.getBlogPosts();
          if (posts.length) return posts.map(({ slug }) => slug);
          console.warn("Blog API returned no posts; using local markdown fallback.");
    } catch (error) {
          console.error("Error fetching blog post slugs:", error);
    }
    return getLocalBlogSlugs();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
          const post = await apiClient.getBlogPost(slug);
          if (post) return mapApiPost(post);
    } catch (error) {
          console.error(`Error fetching blog post ${slug}:`, error);
    }
    return getLocalPostBySlug(slug);
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
    try {
          const posts = await apiClient.getBlogPosts({ ordering: "-published_date" });
          if (posts.length) return posts.map(mapApiPostMeta);
          console.warn("Blog API returned no posts; using local markdown fallback.");
    } catch (error) {
          console.error("Error fetching blog posts:", error);
    }
    return getLocalBlogPosts();
}

export async function getFeaturedPosts(limit = 3): Promise<BlogPostMeta[]> {
    try {
          const posts = await apiClient.getFeaturedPosts(limit);
          if (posts.length) return posts.map(mapApiPostMeta);
    } catch (error) {
          console.error("Error fetching featured posts:", error);
    }
    const local = await getLocalBlogPosts();
    const featured = local.filter((p) => p.featured);
    return (featured.length ? featured : local).slice(0, limit);
}

export async function getRelatedPosts(
    currentSlug: string,
    keywords: string[],
    limit = 3
  ): Promise<BlogPostMeta[]> {
    try {
          const allPosts = await getAllPosts();
          const filtered = allPosts.filter((post) => post.slug !== currentSlug);
          const scored = filtered.map((post) => {
                  const overlap = keywords.filter(
                            (keyword) =>
                                        post.keywords?.some((k) => k.toLowerCase().includes(keyword.toLowerCase())) ||
                                        post.title.toLowerCase().includes(keyword.toLowerCase())
                          ).length;
                  return { ...post, score: overlap };
          });
          return scored
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(({ score: _score, ...post }) => post);
    } catch (error) {
          console.error("Error fetching related posts:", error);
          return [];
    }
}
