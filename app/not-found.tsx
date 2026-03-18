import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-6xl font-bold text-industrial-900 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-industrial-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-industrial-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It may have been
            moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg">Go to Homepage</Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline">
                Browse Blog
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}


