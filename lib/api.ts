/**
 * API client for Django backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || "hastelloy-flanges";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  featured: boolean;
  status: string;
  published_date: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image: string | null;
  image: string;
  canonical_url: string;
  reading_time: string;
  isHtml?: boolean;
}

export interface BlogPostMeta {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  featured: boolean;
  published_date: string | null;
  created_at: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image: string | null;
  image: string;
  reading_time: string;
}

class ApiClient {
  private baseUrl: string;
  private tenantSlug: string;

  constructor() {
    this.baseUrl = API_URL;
    this.tenantSlug = TENANT_SLUG;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}/api/v1/${this.tenantSlug}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        headers: { "Content-Type": "application/json", ...options?.headers },
      });
      if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("API fetch error:", error);
      throw error;
    }
  }

  async getBlogPosts(params?: { featured?: boolean; search?: string; ordering?: string }): Promise<BlogPostMeta[]> {
    const queryParams = new URLSearchParams();
    if (params?.featured !== undefined) queryParams.append("featured", params.featured.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.ordering) queryParams.append("ordering", params.ordering);
    const queryString = queryParams.toString();
    const endpoint = `/blog/${queryString ? `?${queryString}` : ""}`;
    const response = await this.fetch<{ results?: BlogPostMeta[] } | BlogPostMeta[]>(endpoint);
    return Array.isArray(response) ? response : response.results || [];
  }

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
      return await this.fetch<BlogPost>(`/blog/${slug}/`);
    } catch (error) {
      console.error(`Error fetching blog post ${slug}:`, error);
      return null;
    }
  }

  async getFeaturedPosts(limit: number = 3): Promise<BlogPostMeta[]> {
    try {
      const posts = await this.fetch<BlogPostMeta[]>(`/blog/featured/`);
      return posts.slice(0, limit);
    } catch (error) {
      console.error("Error fetching featured posts:", error);
      return [];
    }
  }
}

export const apiClient = new ApiClient();
