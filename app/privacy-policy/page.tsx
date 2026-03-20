import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Privacy Policy", url: "/privacy-policy" },
];

export const metadata: Metadata = generateSEO({
  title: "Privacy Policy - Hastelloy Flanges",
  description:
    "Privacy Policy for Hastelloy Flanges. Learn how we protect and manage your personal information.",
  url: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero Section */}
      <section className="bg-industrial-900 py-10 sm:py-16 lg:py-20 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-2xl sm:text-4xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg leading-8 text-industrial-200">
              Learn how we protect and manage your personal information
            </p>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-12 sm:py-16 lg:py-24 bg-white">
        <Container size="lg">
          <div className="mx-auto max-w-4xl prose prose-lg text-industrial-700 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-industrial-900 mb-6">
                Privacy Policy for Hastelloy Flanges
              </h2>

              <h3 className="text-2xl font-bold text-industrial-900 mt-8 mb-4">
                1. Introduction
              </h3>
              <p>
                At Hastelloy Flanges, we are committed to protecting your privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when
                you visit our website.
              </p>

              <h3 className="text-2xl font-bold text-industrial-900 mt-8 mb-4">
                2. Information We Collect
              </h3>
              <p>We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
              <ul className="list-disc pl-6 my-4">
                <li>Personal identification information (name, email address, phone number, company)</li>
                <li>Technical data (IP address, browser type, operating system)</li>
                <li>Usage information (pages visited, time spent on site, links clicked)</li>
              </ul>

              <h3 className="text-2xl font-bold text-industrial-900 mt-8 mb-4">
                3. How We Use Your Information
              </h3>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 my-4">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and services</li>
                <li>Send you promotional communications (with your consent)</li>
                <li>Comply with applicable laws and regulations</li>
              </ul>

              <h3 className="text-2xl font-bold text-industrial-900 mt-8 mb-4">
                4. Protection of Your Information
              </h3>
              <p>
                We implement appropriate security measures to protect your personal information from
                unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h3 className="text-2xl font-bold text-industrial-900 mt-8 mb-4">
                5. Contact Us
              </h3>
              <p>
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-4">
                Email:{" "}
                <a href="mailto:contact@hastelloyflanges.com" className="text-primary-600 hover:text-primary-700">
                  contact@hastelloyflanges.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:1-281-484-8325" className="text-primary-600 hover:text-primary-700">
                  281-484-8325
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
