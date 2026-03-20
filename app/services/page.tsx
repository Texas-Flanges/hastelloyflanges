import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { generateSEO, generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = generateSEO({
  title: "Hastelloy Flanges & Pipe Flanges - Products & Specifications",
  description:
    "Comprehensive range of Hastelloy flanges including C276, C22, and other high-performance alloys. Expert solutions for corrosive environments with full technical specifications.",
  keywords: [
    "hastelloy flange",
    "hastelloy flanges",
    "hastelloy pipe flange",
    "hastelloy C276 flange",
    "hastelloy C22 flange",
    "corrosion resistant flanges",
  ],
  url: "/services",
});

const products = [
  {
    name: "Hastelloy C276 Flanges",
    description:
      "The most widely used Hastelloy alloy, offering exceptional corrosion resistance in oxidizing and reducing environments. Ideal for chemical processing, pollution control, and pulp production.",
    features: [
      "Excellent resistance to pitting and crevice corrosion",
      "Superior performance in mixed acid environments",
      "High resistance to chloride-induced stress corrosion cracking",
      "Temperature range: -196°C to 650°C",
    ],
  },
  {
    name: "Hastelloy C22 Flanges",
    description:
      "Advanced alloy with enhanced resistance to oxidizing aqueous media. Preferred for extreme corrosive environments where C276 may not be sufficient.",
    features: [
      "Outstanding resistance to oxidizing acids",
      "Excellent resistance to localized corrosion",
      "Superior performance in chlorine-containing environments",
      "Wide range of chemical process applications",
    ],
  },
  {
    name: "Hastelloy B-3 Flanges",
    description:
      "Specialized alloy designed for hydrochloric acid and other reducing environments. Offers superior thermal stability compared to earlier B-series alloys.",
    features: [
      "Excellent resistance to hydrochloric acid",
      "Outstanding thermal stability",
      "Resistance to sulfuric acid and other reducing acids",
      "Minimal carbide precipitation during welding",
    ],
  },
];

const applications = [
  "Chemical Processing",
  "Oil & Gas Production",
  "Pharmaceutical Manufacturing",
  "Pollution Control Equipment",
  "Pulp & Paper Production",
  "Waste Treatment Systems",
];

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />
      <StructuredData
        data={generateProductSchema({
          name: "Hastelloy Flanges",
          description:
            "Premium Hastelloy flanges and pipe flanges for corrosive environments",
          sku: "HAST-FLANGE-001",
        })}
      />

      {/* Hero Section */}
      <section className="bg-gradient-industrial py-10 sm:py-16 lg:py-20 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-2xl sm:text-4xl lg:text-6xl">
              Hastelloy Flanges & Products
            </h1>
            <p className="mt-6 text-lg leading-8 text-industrial-200">
              Comprehensive range of high-performance Hastelloy flanges engineered
              for the most demanding industrial applications
            </p>
          </div>
        </Container>
      </section>

      {/* Products Section */}
      <section className="py-16 lg:py-12 sm:py-16 lg:py-24 bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-industrial-900 sm:text-4xl">
              Our Hastelloy Flange Products
            </h2>
            <p className="mt-4 text-lg text-industrial-600">
              Premium alloys designed for superior corrosion resistance
            </p>
          </div>

          <div className="space-y-8">
            {products.map((product, index) => (
              <Card key={index} hover className="p-8">
                <h3 className="text-2xl font-bold text-industrial-900 mb-4">
                  {product.name}
                </h3>
                <p className="text-industrial-600 mb-6">{product.description}</p>
                <h4 className="text-lg font-semibold text-industrial-900 mb-3">
                  Key Features:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0"
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
                      <span className="text-industrial-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Specifications Section */}
      <section id="specs" className="py-16 lg:py-12 sm:py-16 lg:py-24 bg-industrial-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-industrial-900 sm:text-4xl">
              Technical Specifications
            </h2>
            <p className="mt-4 text-lg text-industrial-600">
              Available in a wide range of sizes and pressure ratings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-industrial-900 mb-4">
                Size Range
              </h3>
              <ul className="space-y-2 text-industrial-600">
                <li>• 1/2" to 48" NPS</li>
                <li>• DN15 to DN1200</li>
                <li>• Custom sizes available</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-industrial-900 mb-4">
                Pressure Classes
              </h3>
              <ul className="space-y-2 text-industrial-600">
                <li>• 150# to 2500#</li>
                <li>• PN10 to PN420</li>
                <li>• ASME B16.5 / B16.47</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-industrial-900 mb-4">
                Flange Types
              </h3>
              <ul className="space-y-2 text-industrial-600">
                <li>• Weld Neck</li>
                <li>• Slip-On</li>
                <li>• Blind</li>
                <li>• Socket Weld</li>
                <li>• Threaded</li>
                <li>• Lap Joint</li>
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Applications Section */}
      <section id="applications" className="py-16 lg:py-12 sm:py-16 lg:py-24 bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-industrial-900 sm:text-4xl">
              Industries We Serve
            </h2>
            <p className="mt-4 text-lg text-industrial-600">
              Trusted by leading companies across multiple sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {applications.map((application, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-industrial-50 rounded-lg text-center"
              >
                <span className="text-lg font-semibold text-industrial-900">
                  {application}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-industrial-900 text-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Need Help Selecting the Right Hastelloy Flange?
            </h2>
            <p className="text-lg text-industrial-200 mb-10">
              Our technical experts are ready to assist you in finding the perfect
              solution for your specific requirements.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Request a Quote
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}


