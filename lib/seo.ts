import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hastelloyflanges.com";

interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
}

export function generateSEO({
    title,
    description,
    keywords = [],
    image = "/images/og-image.jpg",
    url = "",
    type = "website",
    publishedTime,
    modifiedTime,
    author,
}: SEOProps): Metadata {
    const baseUrl = SITE_URL;
    const fullUrl = `${baseUrl}${url}`;
    const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  const metadata: Metadata = {
        title,
        description,
        keywords: keywords.join(", "),
        authors: author ? [{ name: author }] : undefined,
        openGraph: {
                type,
                url: fullUrl,
                title,
                description,
                images: [
                  {
                              url: fullImageUrl,
                              width: 1200,
                              height: 630,
                              alt: title,
                  },
                        ],
                siteName: "Hastelloy Flanges",
        },
        twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [fullImageUrl],
        },
        alternates: {
                canonical: fullUrl,
        },
  };

  // Add article-specific metadata
  if (type === "article" && publishedTime && metadata.openGraph) {
        metadata.openGraph = {
                ...metadata.openGraph,
                type: "article",
                publishedTime,
                modifiedTime,
                authors: author ? [author] : undefined,
        };
  }

  return metadata;
}

// Generate JSON-LD structured data
export function generateOrganizationSchema() {
    return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Hastelloy Flanges",
          url: SITE_URL,
          logo: `${SITE_URL}/images/logo.png`,
          description:
                  "Leading supplier of high-quality Hastelloy flanges and pipe flanges for corrosive environments.",
          contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Customer Service",
                  email: "contact@hastelloyflanges.com",
          },
    };
}

export function generateProductSchema(product: {
    name: string;
    description: string;
    image?: string;
    sku?: string;
}) {
    return {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: product.image,
          sku: product.sku,
          brand: {
                  "@type": "Brand",
                  name: "Hastelloy Flanges",
          },
    };
}

export function generateArticleSchema(article: {
    title: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    url: string;
}) {
    return {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          image: article.image ? `${SITE_URL}${article.image}` : undefined,
          datePublished: article.datePublished,
          dateModified: article.dateModified || article.datePublished,
          author: {
                  "@type": "Person",
                  name: article.author,
          },
          publisher: {
                  "@type": "Organization",
                  name: "Hastelloy Flanges",
                  logo: {
                            "@type": "ImageObject",
                            url: `${SITE_URL}/images/logo.png`,
                  },
          },
          mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `${SITE_URL}${article.url}`,
          },
    };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: item.name,
                  item: `${SITE_URL}${item.url}`,
          })),
    };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                            "@type": "Answer",
                            text: faq.answer,
                  },
          })),
    };
}
