import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Container from "@/components/ui/Container";
import StructuredData from "@/components/seo/StructuredData";
import RelatedPostsClient from "@/components/blog/RelatedPostsClient";
import { formatDate } from "@/lib/utils";
import { generateArticleSchema, generateBreadcrumbSchema, generateSEO } from "@/lib/seo";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { getLocalBlogSlugs } from "@/lib/content-blog";

// ---------------------------------------------------------------------------
// Static generation: pre-render one page per local markdown slug.
// API slugs are also included when available (deduped).
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
    // Always use local slugs as the canonical set for static export.
  const localSlugs = await getLocalBlogSlugs();
    let allSlugs: string[];
    try {
          const apiSlugs = await getAllPostSlugs();
          allSlugs = Array.from(new Set([...localSlugs, ...apiSlugs]));
    } catch {
          allSlugs = localSlugs;
    }
    return allSlugs.map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return {};
    return generateSEO({
          title: post.title,
          description: post.description,
          keywords: post.keywords,
          image: post.image,
          url: `/blog/${slug}`,
          type: "article",
          publishedTime: post.date,
          author: post.author,
    });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

  if (!post) {
        notFound();
  }

  const canonicalPath = `/blog/${slug}`;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: canonicalPath },
      ];

  return (
        <>
              <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />
              <StructuredData
                        data={generateArticleSchema({
                                    title: post.title,
                                    description: post.description,
                                    image: post.image || post.featureImage,
                                    datePublished: post.date,
                                    author: post.author,
                                    url: canonicalPath,
                        })}
                      />
              <article>
                      <section className="bg-gradient-industrial py-16 text-white">
                                <Container size="lg">
                                            <div className="mx-auto max-w-4xl">
                                                          <nav className="mb-8 text-sm">
                                                                          <ol className="flex items-center space-x-2">
                                                                                            <li>
                                                                                                                <Link
                                                                                                                                        href="/"
                                                                                                                                        className="text-industrial-300 hover:text-white transition-colors"
                                                                                                                                      >
                                                                                                                                      Home
                                                                                                                  </Link>
                                                                                              </li>
                                                                                            <li className="text-industrial-400">/</li>
                                                                                            <li>
                                                                                                                <Link
                                                                                                                                        href="/blog"
                                                                                                                                        className="text-industrial-300 hover:text-white transition-colors"
                                                                                                                                      >
                                                                                                                                      Blog
                                                                                                                  </Link>
                                                                                              </li>
                                                                                            <li className="text-industrial-400">/</li>
                                                                                            <li className="text-industrial-200 truncate max-w-md">
                                                                                              {post.title}
                                                                                              </li>
                                                                          </ol>
                                                          </nav>
                                                          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                                                            {post.title}
                                                          </h1>
                                                          <div className="flex flex-wrap items-center gap-4 text-industrial-200">
                                                                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                                                                          <span>•</span>
                                                                          <span>{post.readingTime || "5 min read"}</span>
                                                                          <span>•</span>
                                                                          <span>By {post.author}</span>
                                                          </div>
                                              {post.keywords?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-6">
                            {post.keywords.map((keyword) => (
                                                <span
                                                                        key={keyword}
                                                                        className="inline-block rounded-full bg-primary-500/20 px-3 py-1 text-sm font-medium text-white"
                                                                      >
                                                  {keyword}
                                                </span>
                                              ))}
                          </div>
                                                          )}
                                            </div>
                                </Container>
                      </section>
              
                      <section className="py-12 bg-white">
                                <Container size="lg">
                                            <div className="mx-auto max-w-4xl">
                                                          <div
                                                                            className="max-w-none text-industrial-700 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-primary-600 [&_h1]:mt-0 [&_h1]:mb-6 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-industrial-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-industrial-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-industrial-700 [&_p]:leading-relaxed [&_p]:my-4 [&_a]:text-primary-600 [&_a]:no-underline hover:[&_a]:underline [&_strong]:text-industrial-900 [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:text-industrial-700 [&_li]:my-2 [&_img]:rounded-lg [&_table]:w-full [&_table]:my-8 [&_table]:border-collapse [&_table]:border [&_table]:border-industrial-200 [&_th]:border [&_th]:border-industrial-200 [&_th]:bg-industrial-50 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-industrial-200 [&_td]:px-4 [&_td]:py-2"
                                                                            dangerouslySetInnerHTML={{ __html: post.content }}
                                                                          />
                                            </div>
                                </Container>
                      </section>
              
                      <RelatedPostsClient
                                  currentSlug={post.slug}
                                  keywords={post.keywords}
                                  initialPosts={[]}
                                  limit={3}
                                  localOnly={Boolean(post.local)}
                                />
              </article>
        </>
      );
}
