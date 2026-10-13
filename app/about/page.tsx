import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "About Us - Leading Hastelloy Flange Supplier",
  description:
    "Learn about our expertise in supplying premium Hastelloy flanges and pipe flanges. Trusted by industries worldwide for quality, reliability, and technical support.",
  keywords: [
    "hastelloy flange supplier",
    "hastelloy flanges",
    "industrial flange distributor",
    "corrosion resistant flanges",
  ],
  url: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-industrial-900 py-10 sm:py-16 lg:py-20 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-2xl sm:text-4xl lg:text-6xl">
              About Our Company
            </h1>
            <p className="mt-6 text-lg leading-8 text-industrial-200">
              Your trusted partner for premium Hastelloy flanges and expert
              industrial solutions
            </p>
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-12 sm:py-16 lg:py-24 bg-white">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-industrial-900 mb-6">
                Expertise in Hastelloy Flanges
              </h2>
              <div className="prose prose-lg text-industrial-600 space-y-4">
                <p>
                  We specialize in providing high-quality Hastelloy flanges and pipe
                  flanges designed for the most demanding industrial applications.
                  We understand the critical role that corrosion-resistant materials play in ensuring
                  operational safety and efficiency.
                </p>
              </div>
            </div>
            <div className="bg-industrial-100 rounded-lg p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-industrial-900 mb-6">
                Why Choose Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-industrial-700">
                    <strong className="text-industrial-900">Premium Quality:</strong>{" "}
                    Hastelloy flanges supplied to ASTM and ASME specifications
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-12 sm:py-16 lg:py-24 bg-industrial-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-industrial-900 sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-industrial-600">
              Principles that guide everything we do
            </p>
          </div>

          <div className="mx-auto max-w-md">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-bold text-industrial-900 mb-3">
                Customer Focus
              </h3>
              <p className="text-industrial-600">
                Your success is our success. We work closely with clients to
                understand their needs and provide tailored solutions that
                deliver results.
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="rounded-2xl bg-gradient-industrial px-6 py-16 text-center shadow-xl sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Work Together?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-industrial-200">
              Contact us today to discuss your Hastelloy flange requirements and
              discover how we can support your projects.
            </p>
            <div className="mt-10">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
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
              { "@type": "ListItem", position: 2, name: "About", item: "https://hastelloyflanges.com/about" },
            ],
          }),
        }}
      />
    </>
  );
}


