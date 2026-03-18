"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  //  Initialize EmailJS
  useEffect(() => {
    // Initialize EmailJS with public key
    emailjs.init({
              publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setErrors({});

    // Validate required fields
    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!formRef.current) {
        throw new Error("Form reference not available");
      }

      await emailjs.sendForm(
                  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        {
                    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        }
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-industrial py-20 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-industrial-200">
              Get in touch with our team for expert advice on Hastelloy flanges or
              to request a quote
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 lg:py-24 bg-white">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-industrial-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-industrial-600 mb-8">
                Our team is ready to help you find the right Hastelloy flange
                solution for your needs. Fill out the form and we'll get back to
                you as soon as possible.
              </p>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-industrial-900 mb-1">
                        Email
                      </h3>
                      <p className="text-industrial-600">
                        contact@hastelloyflanges.com
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-industrial-900 mb-1">
                        Response Time
                      </h3>
                      <p className="text-industrial-600">
                        We typically respond within 24 hours during business days
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-primary-50 border-primary-200">
                  <h3 className="font-semibold text-industrial-900 mb-2">
                    Quick Questions?
                  </h3>
                  <p className="text-industrial-600 text-sm mb-4">
                    Check out our blog for technical guides and specifications on
                    Hastelloy flanges.
                  </p>
                  <Link
                    href="/blog"
                    className="text-sm font-semibold text-primary-600 hover:text-primary-700"
                  >
                    Visit Blog →
                  </Link>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-industrial-900 mb-6">
                  Send Us a Message
                </h2>

                <form id="contact-form" ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-industrial-900 mb-2"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`text-industrial-600 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors ${errors.name
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-industrial-300"
                          }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-industrial-900 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="text-industrial-600 w-full px-4 py-2 border border-industrial-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-industrial-900 mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="text-industrial-600 w-full px-4 py-2 border border-industrial-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-industrial-900 mb-2"
                      >
                        Company *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className={`text-industrial-600 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors ${errors.company
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-industrial-300"
                          }`}
                        placeholder="Your Company"
                      />
                      {errors.company && (
                        <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-industrial-900 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={`text-industrial-600 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-none ${errors.message
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-industrial-300"
                        }`}
                      placeholder="Tell us about your Hastelloy flange requirements..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-green-800">
                        Thank you for your message! We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && Object.keys(errors).length === 0 && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-800">
                        There was an error submitting your message. Please try
                        again.
                      </p>
                    </div>
                  )}
                  {submitStatus === "error" && Object.keys(errors).length > 0 && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-800 font-semibold mb-2">
                        Please fix the following errors:
                      </p>
                      <ul className="list-disc list-inside text-red-700 space-y-1">
                        {errors.name && <li>{errors.name}</li>}
                        {errors.company && <li>{errors.company}</li>}
                        {errors.message && <li>{errors.message}</li>}
                      </ul>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto"

                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-16 bg-industrial-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-industrial-900 sm:text-4xl">
              Common Questions
            </h2>
            <p className="mt-4 text-lg text-industrial-600">
              Quick answers to frequently asked questions about Hastelloy flanges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-industrial-900 mb-2">
                What sizes are available?
              </h3>
              <p className="text-industrial-600">
                We offer Hastelloy flanges from 1/2" to 48" NPS in various
                pressure ratings from 150# to 2500#.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-industrial-900 mb-2">
                What's the lead time?
              </h3>
              <p className="text-industrial-600">
                Standard sizes are typically in stock for immediate shipment.
                Custom orders vary based on specifications.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-industrial-900 mb-2">
                Do you provide certifications?
              </h3>
              <p className="text-industrial-600">
                Yes, all Hastelloy flanges come with material certifications and
                test reports as per industry standards.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-industrial-900 mb-2">
                Can you help with material selection?
              </h3>
              <p className="text-industrial-600">
                Absolutely! Our technical team can help you select the right
                Hastelloy alloy based on your application requirements.
              </p>
            </Card>
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
              { "@type": "ListItem", position: 2, name: "Contact", item: "https://hastelloyflanges.com/contact" },
            ],
          }),
        }}
      />
    </>
  );
}

