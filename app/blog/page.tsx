import { Metadata } from "next";
import Container from "@/components/ui/Container";
import BlogPostsGridClient from "@/components/blog/BlogPostsGridClient";
import type { BlogPostMeta } from "@/lib/blog";
import { getLocalBlogPosts } from "@/lib/content-blog";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Hastelloy Flange Blog - Expert Guides & Technical Resources",
  description:
    "Expert articles on Hastelloy flanges, specifications, applications, and industry best practices. Stay informed with the latest insights on corrosion-resistant industrial solutions.",
  keywords: [
    "hastelloy flange blog",
    "hastelloy flanges guide",
    "industrial flange resources",
    "corrosion resistant flanges",
  ],
  url: "/blog",
});

type ApiBlogResponse<T> = { results?: T[] } | T[];

async function tryFetchApiPosts(): Promise<BlogPostMeta[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG || "hastelloy-flanges";
  const url = new URL(`/api/v1/${tenantSlug}/blog/`, baseUrl);
  url.searchParams.set("ordering", "-published_date");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const res = await fetch(url.toString(), {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });
    if (!res.ok) return [];
    const data = (await res.json()) as ApiBlogResponse<any>;
    const arr = Array.isArray(data) ? data : data.results || [];
    return arr.map((post: any) => {
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
        featureImage: undefined as string | undefined,
        readingTime: post.reading_time,
      } satisfies BlogPostMeta;
    });
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

export default async function BlogPage() {
  const [localPosts, apiPosts] = await Promise.all([getLocalBlogPosts(), tryFetchApiPosts()]);
  const initialPosts = apiPosts.length > 0 ? apiPosts : localPosts;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-industrial py-20 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Hastelloy Flange Resources
            </h1>
            <p className="mt-6 text-lg leading-8 text-industrial-200">
              Expert guides, technical insights, and industry best practices for
              Hastelloy flanges and corrosion-resistant solutions
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <BlogPostsGridClient initialPosts={initialPosts} fallbackPosts={localPosts} />
        </Container>
      </section>

      {/* Structured Data - Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://hastelloyflanges.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://hastelloyflanges.com/blog" },
            ],
          }),
        }}
      />
    </>
  );
}


