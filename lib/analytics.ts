// Lightweight GA4 event tracking helper.
// Call from client components to fire custom events in addition to GA4 Enhanced Measurement.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type GAEventParams = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
};

export const trackEvent = ({ action, category, label, value, ...rest }: GAEventParams) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...rest,
  });
};

export const trackPhoneClick = (phoneNumber: string) =>
  trackEvent({ action: 'click_phone', category: 'engagement', label: phoneNumber });

export const trackEmailClick = (email: string) =>
  trackEvent({ action: 'click_email', category: 'engagement', label: email });

export const trackFormSubmit = (formName: string) =>
  trackEvent({ action: 'form_submit', category: 'conversion', label: formName });

export const trackOutboundClick = (url: string) =>
  trackEvent({ action: 'click_outbound', category: 'engagement', label: url });
