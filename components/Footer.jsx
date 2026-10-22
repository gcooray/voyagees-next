"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SOCIAL_LINKS } from "@/lib/seo";
import "./Footer.css";

const STRINGS = {
  en: {
    howItWorks: "How It Works",
    about: "About Us",
    contact: "Contact",
    terms: "Terms of Use",
    madeIn: "Made in Sri Lanka",
    follow: "Follow us",
  },
  fr: {
    howItWorks: "Comment ça marche",
    about: "À propos",
    contact: "Contact",
    terms: "Conditions d'Utilisation",
    madeIn: "Fait au Sri Lanka",
    follow: "Suivez-nous",
  },
};

export default function Footer() {
  const pathname = usePathname();
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");
  const t = isFrench ? STRINGS.fr : STRINGS.en;
  const prefix = isFrench ? "/fr" : "";

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-links">
          {/* moved here from the navbar — it's a homepage section, not a page */}
          <Link href={`${prefix || "/"}#how-it-works`}>{t.howItWorks}</Link>
          <Link href={`${prefix}/about`}>{t.about}</Link>
          {/* the blog is French-only for now */}
          {isFrench && <Link href="/fr/blog">Blog</Link>}
          <Link href={`${prefix}/contact`}>{t.contact}</Link>
          <Link href={`${prefix}/terms`}>{t.terms}</Link>
        </div>

        <div className="footer-social">
          <span className="footer-social-label">{t.follow}</span>
          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
            </svg>
          </a>
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path fill="currentColor" d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 8.1c-.1-1.5-.4-2.8-1.5-3.9-1.1-1.1-2.4-1.4-3.9-1.5C14 2.6 10 2.6 8.4 2.7c-1.5.1-2.8.4-3.9 1.5C3.4 5.3 3.1 6.6 3 8.1c-.1 1.6-.1 6.2 0 7.8.1 1.5.4 2.8 1.5 3.9 1.1 1.1 2.4 1.4 3.9 1.5 1.6.1 5.6.1 7.2 0 1.5-.1 2.8-.4 3.9-1.5 1.1-1.1 1.4-2.4 1.5-3.9.1-1.6.1-6.2 0-7.8Zm-2 9.6c-.3.8-1 1.5-1.8 1.8-1.2.5-4.2.4-5.2.4s-4 .1-5.2-.4c-.8-.3-1.5-1-1.8-1.8-.5-1.2-.4-4.2-.4-5.7s-.1-4.5.4-5.7c.3-.8 1-1.5 1.8-1.8 1.2-.5 4.2-.4 5.2-.4s4-.1 5.2.4c.8.3 1.5 1 1.8 1.8.5 1.2.4 4.2.4 5.7s.1 4.5-.4 5.7Z" />
            </svg>
          </a>
        </div>

        <div className="footer-bottom">
          <span>
  © {new Date().getFullYear()} VOYAGEES · {t.madeIn}
</span>

          <span
            role="img"
            aria-label="Sri Lanka Flag"
            className="footer-flag"
          >
            🇱🇰
          </span>
        </div>

      </div>
    </footer>
  );
}
