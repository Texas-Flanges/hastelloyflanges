'use client';
/**
 * Legacy redirect: /blog/details?id=<slug>&local=true
 *                  /blog/details?id=<slug>
 *
 * This page exists only to catch old bookmarks / cached links.
 * It reads the query-param `id` and redirects the visitor to the canonical
 * slug-based URL: /blog/<slug>
 *
 * With `output: "export"` Next.js cannot do server-side 301 redirects, so we
 * do a client-side redirect here (immediate replace, no visible flash).
 */
import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function LegacyRedirectInner() {
    const params = useSearchParams();
    const router = useRouter();

  useEffect(() => {
        const id = params.get("id");
        if (id) {
                // `id` may be a numeric DB id or already a slug string.
          // Since we can't resolve numeric IDs on the client without the API,
          // treat it as a slug if it looks like one (contains letters/dashes),
          // otherwise fall back to the blog index.
          const looksLikeSlug = /[a-z]/.test(id);
                const destination = looksLikeSlug ? `/blog/${id}/` : "/blog/";
                router.replace(destination);
        } else {
                router.replace("/blog/");
        }
  }, [params, router]);

  return (
        <div className="min-h-screen flex items-center justify-center">
              <p className="text-industrial-600">Redirecting&hellip;</p>
        </div>
      );
}

export default function BlogDetailsLegacyPage() {
    return (
          <Suspense
                  fallback={
                            <div className="min-h-screen flex items-center justify-center">
                                      <p className="text-industrial-600">Loading&hellip;</p>
                            </div>
            }
              >
                <LegacyRedirectInner />
          </Suspense>
        );
}
