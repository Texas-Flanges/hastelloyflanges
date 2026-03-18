import { MetadataRoute } from "next";
import { getLocalBlogSlugs, getLocalPostBySlug } from "@/lib/content-blog";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hastelloyflanges.com";

  // Static pages
  const staticPages = [
      {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 1.0,
      },
      {
                url: `${baseUrl}/about`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.8,
      },
      {
                url: `${baseUrl}/services`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.9,
      },
      {
                url: `${baseUrl}/contact`,
                lastModified: new Date(),
                changeFrequency: "yearly" as const,
                priority: 0.7,
      },
      {
                url: `${baseUrl}/blog`,
                lastModified: new Date(),
                changeFrequency: "weekly" as const,
                priority: 0.8,
      },
      {
                url: `${baseUrl}/privacy-policy`,
                lastModified: new Date(),
                changeFrequency: "yearly" as const,
                priority: 0.5,
      },
        ];

  // Blog posts — always use canonical slug-based paths
  const slugs = await getLocalBlogSlugs();
      const blogPages = await Promise.all(
              slugs.map(async (slug) => {
                        const post = await getLocalPostBySlug(slug);
                        return {
                                    url: `${baseUrl}/blog/${slug}`,
                                    lastModified: post?.date ? new Date(post.date) : new Date(),
                                    changeFrequency: "monthly" as const,
                                    priority: 0.7,
                        };
              })
            );

  return [...staticPages, ...blogPages];
}
