import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";
import { generateOrganizationSchema } from "@/lib/seo";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-geist-sans",
    display: "swap",
});

export const metadata: Metadata = {
    // NEXT_PUBLIC_SITE_URL must be set to https://hastelloyflanges.com in Vercel env vars.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://hastelloyflanges.com"),
    title: {
      default: "Hastelloy Flanges & Pipe Flanges | Expert Industrial Solutions",
          template: "%s | Hastelloy Flanges",
    },
    description:
          "Leading supplier of high-quality Hastelloy flanges and pipe flanges for corrosive environments. Expert solutions for industrial applications with comprehensive specifications and technical support.",
    keywords: [
          "hastelloy flange",
          "hastelloy flanges",
          "hastelloy pipe flange",
          "hastelloy C276 flange",
          "corrosion resistant flanges",
          "industrial flanges",
        ],
    authors: [{ name: "Cheyanne Harris" }],
    openGraph: {
          type: "website",
          locale: "en_US",
          siteName: "Hastelloy Flanges",
          title: "Hastelloy Flanges & Pipe Flanges | Expert Industrial Solutions",
          description:
                  "Leading supplier of high-quality Hastelloy flanges and pipe flanges for corrosive environments.",
    },
    twitter: {
          card: "summary_large_image",
          title: "Hastelloy Flanges & Pipe Flanges | Expert Industrial Solutions",
          description:
                  "Leading supplier of high-quality Hastelloy flanges and pipe flanges for corrosive environments.",
    },
    robots: {
          index: true,
          follow: true,
          googleBot: {
                  index: true,
                  follow: true,
                  "max-video-preview": -1,
                  "max-image-preview": "large",
                  "max-snippet": -1,
          },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
          <html lang="en" className={inter.variable}>
                  <head>
                          <StructuredData data={generateOrganizationSchema()} />
                  </head>
                <body className="antialiased flex min-h-screen flex-col">
                        <GoogleAnalytics />
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                </body>
          </html>
        );
}
