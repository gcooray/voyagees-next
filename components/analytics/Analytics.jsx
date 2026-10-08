"use client";

import { useState, useSyncExternalStore, Suspense } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { GA_MEASUREMENT_ID, META_PIXEL_ID } from "@/lib/analytics";
import PageviewTracker from "./PageviewTracker";
import "./Analytics.css";

const CONSENT_KEY = "voyagees:analyticsConsent";

const STRINGS = {
  en: {
    message: "We use cookies to understand how visitors use this site and to measure our ads. You can accept or decline these cookies.",
    decline: "Decline",
    accept: "Accept",
  },
  fr: {
    message: "Nous utilisons des cookies pour comprendre comment les visiteurs utilisent ce site et mesurer nos publicités. Vous pouvez accepter ou refuser ces cookies.",
    decline: "Refuser",
    accept: "Accepter",
  },
};

function noopSubscribe() {
  // localStorage writes from this same tab don't fire a "storage" event
  // (only other tabs get that), and we only ever need this store's value at
  // mount time — the user's in-session choice is tracked separately below.
  return () => {};
}

function readStoredConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) || "unknown";
  } catch {
    return "denied";
  }
}

// GA4 and the Meta Pixel set cookies, so they only load after explicit consent — required for
// GDPR compliance given the site has French/EU-facing pages. Consent choice
// persists in localStorage; "unknown" (first visit) shows the banner.
export default function Analytics() {
  const pathname = usePathname();
  const t = pathname.startsWith("/fr") ? STRINGS.fr : STRINGS.en;

  // useSyncExternalStore (not an effect) reads localStorage in a
  // hydration-safe way: the server snapshot is "unknown" so SSR and the
  // first client render always agree, avoiding a hydration mismatch.
  const storedConsent = useSyncExternalStore(noopSubscribe, readStoredConsent, () => "unknown");
  const [choiceThisSession, setChoiceThisSession] = useState(null);
  const consent = choiceThisSession ?? storedConsent;

  function choose(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // ignore storage failures (private browsing etc.) — banner will just
      // reappear next visit, which is an acceptable fallback
    }
    setChoiceThisSession(value);
  }

  if (!GA_MEASUREMENT_ID && !META_PIXEL_ID) return null;

  return (
    <>
      {consent === "granted" && META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView'); // first page; PageviewTracker handles later navigations
          `}
        </Script>
      )}

      {consent === "granted" && GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      {consent === "granted" && (
        <Suspense fallback={null}>
          <PageviewTracker />
        </Suspense>
      )}

      {consent === "unknown" && (
        <div className="cookie-banner">
          <p>{t.message}</p>
          <div className="cookie-banner-actions">
            <button type="button" className="cookie-banner-decline" onClick={() => choose("denied")}>
              {t.decline}
            </button>
            <button type="button" className="cookie-banner-accept" onClick={() => choose("granted")}>
              {t.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
