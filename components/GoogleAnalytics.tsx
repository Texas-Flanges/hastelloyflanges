'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            send_page_view: true
          });

          // GA4 Enhanced Measurement ignores mailto: and tel: links, so send those clicks ourselves.
          document.addEventListener('click', function (e) {
            var link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
            if (!link) return;
            var href = link.getAttribute('href') || '';
            var name = /^mailto:/i.test(href) ? 'contact_click_email' : /^tel:/i.test(href) ? 'contact_click_phone' : null;
            if (!name) return;
            gtag('event', name, {
              link_url: href,
              link_text: (link.textContent || '').trim().slice(0, 100),
              page_location: window.location.href
            });
          }, true);
        `}
      </Script>
    </>
  );
}
