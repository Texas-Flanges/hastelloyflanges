import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/blog/BlogCard";
import { getFeaturedPosts } from "@/lib/blog";

export default async function Home() {
  const featuredPosts = await getFeaturedPosts(3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-industrial py-10 sm:py-16 lg:py-20 lg:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-2xl sm:text-4xl lg:text-6xl">
              Premium Hastelloy Flanges for
              <span className="block text-primary-300">Corrosive Environments</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-industrial-200">
              Expert supplier of high-performance Hastelloy fittings and pipe flanges.
              Trusted by industries worldwide for superior corrosion resistance and
              reliability in the most demanding applications.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">Get a Quote</Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Products
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Hastelloy Grade Section */}
      <section className="py-16 lg:py-12 sm:py-16 lg:py-24 bg-industrial-50">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-industrial-900 sm:text-4xl mb-6">
              What Grade Of Hastelloy Is Most Common?
            </h2>
            <p className="text-lg text-industrial-600 leading-relaxed mb-6">
              As A105 is to carbon steel, alloy C276 is to nickel steel alloys. Typical applications of HASTELLOY C276 include equipment components in chemical and petrochemical organic chloride processes and processes utilizing halide or acid catalysts. Other industry applications are pulp and paper (digesters and bleach areas), scrubbers and ducting for flue gas desulfurization, pharmaceutical and food processing equipment.
            </p>
            <p className="text-lg text-industrial-600 leading-relaxed">
              It has outstanding resistance to a wide variety of chemical process environments including ferric and cupric chlorides, hot contaminated mineral acids, solvents, chlorine and chlorine contaminated (both organic and inorganic), dry chlorine, formic and acetic acids, acetic anhydride, sea water and brine solutions and hypochlorite and chlorine dioxide solutions. Alloy C276 also resists formation of grain boundary precipitates in the weld heat affected zone making it useful for most chemical processes in the as-welded condition. It has excellent resistance to pitting and stress corrosion cracking.
            </p>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-12 sm:py-16 lg:py-24 bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-industrial-900 sm:text-4xl">
              Why Choose Our Hastelloy Flanges?
            </h2>
            <p className="mt-4 text-lg text-industrial-600">
              Industry-leading quality and performance for critical applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-industrial-900 mb-2">
                Superior Corrosion Resistance
              </h3>
              <p className="text-industrial-600">
                Exceptional performance in highly corrosive environments, extending equipment life and reducing maintenance costs.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-industrial-900 mb-2">
                High-Performance Alloys
              </h3>
              <p className="text-industrial-600">
                Premium Hastelloy C276, C22, and other grades engineered for extreme temperatures and pressures.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-industrial-900 mb-2">
                Fast & Reliable Delivery
              </h3>
              <p className="text-industrial-600">
                Extensive inventory and efficient logistics ensure your projects stay on schedule.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-industrial-50">
        <Container>
          <div className="rounded-2xl bg-primary-600 px-6 py-16 text-center shadow-xl sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Need Expert Advice on Hastelloy Flanges?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
              Our technical team is ready to help you select the right Hastelloy flange specifications for your application.
            </p>
            <div className="mt-10">
              <Link href="/contact">
                <Button size="lg" variant="secondary">Contact Us Today</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Section */}
      {featuredPosts.length > 0 && (
        <section className="py-16 lg:py-12 sm:py-16 lg:py-24 bg-white">
          <Container>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-industrial-900 sm:text-4xl">
                  Latest Insights
                </h2>
                <p className="mt-2 text-lg text-industrial-600">
                  Expert guidance on Hastelloy flanges and industrial applications
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden md:inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                View all posts
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-10 text-center md:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                View all posts
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

