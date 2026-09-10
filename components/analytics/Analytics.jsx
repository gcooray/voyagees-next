"use client";

import { useState, useSyncExternalStore, Suspense } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import PageviewTracker from "./PageviewTracker";
import "./Analytics.css";

const CONSENT_KEY = "voyagees:analyticsConsent";

const STRINGS = {
  en: {
    message: "We use cookies to understand how visitors use this site. You can accept or decline analytics cookies.",
    decline: "Decline",
    accept: "Accept",
  },
  fr: {
    message: "Nous utilisons des cookies pour comprendre comment les visiteurs utilisent ce site. Vous pouvez accepter ou refuser les cookies analytiques.",
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

// GA4 sets cookies, so it only loads after explicit consent — required for
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

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {consent === "granted" && (
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
          <Suspense fallback={null}>
            <PageviewTracker />
          </Suspense>
        </>
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
