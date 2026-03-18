'use client';
import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
    post: BlogPostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
    // API image or local featureImage / image; handle /media/ relative URLs
  let imageUrl = post.image || post.featureImage || "/images/blog/default.jpg";
    if (imageUrl.startsWith("/media/")) {
          imageUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${imageUrl}`;
    }

  // Always use slug-based path — no query params in public-facing URLs
  const href = `/blog/${post.slug}`;

  return (
        <article className="group relative flex flex-col overflow-hidden rounded-lg border border-industrial-200 bg-white shadow-sm transition-all hover:shadow-md">
              <Link href={href} className="relative h-48 w-full overflow-hidden">
                      <img
                                  src={imageUrl}
                                  alt={post.title}
                                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                {post.featured && (
                    <span className="absolute top-4 right-4 rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">
                                Featured
                    </span>
                      )}
              </Link>
              <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-sm text-industrial-500 mb-3">
                                <time dateTime={post.date}>{formatDate(post.date)}</time>
                                <span>•</span>
                                <span>{post.readingTime}</span>
                      </div>
                      <Link href={href}>
                                <h3 className="text-xl font-bold text-industrial-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">
                                  {post.title}
                                </h3>
                      </Link>
                      <p className="text-industrial-600 mb-4 line-clamp-3 flex-grow">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.keywords.slice(0, 3).map((keyword) => (
                      <span
                                      key={keyword}
                                      className="inline-block rounded-full bg-industrial-100 px-3 py-1 text-xs font-medium text-industrial-700"
                                    >
                        {keyword}
                      </span>
                    ))}
                      </div>
                      <Link
                                  href={href}
                                  className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700"
                                  aria-label={`Read more about ${post.title}`}
                                >
                                Read more <span className="sr-only"> about {post.title}</span>
                                <svg
                                              className="ml-2 h-4 w-4"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                            >
                                            <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                          />
                                </svg>
                      </Link>
              </div>
        </article>
      );
}
