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
    <>
    {/* line drawing of the island above the footer: hills, Sigiriya, a
        dagoba, a bodhi tree and a Kandyan temple roof */}
    <div className="footer-art" aria-hidden="true">
      <svg viewBox="0 0 1200 140" preserveAspectRatio="xMidYMax meet" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 132 C40 128 70 112 105 92 C130 78 150 70 168 74" />
        <path d="M150 132 C162 130 168 122 172 108 C176 90 178 70 186 56 C190 50 196 48 204 48 L250 47 C258 47 262 52 265 60 C271 76 272 100 276 116 C279 126 284 131 300 132" />
        <path d="M196 60 C214 57 236 58 254 62" opacity="0.6" />
        <path d="M262 112 C280 104 300 104 318 110 C332 115 344 124 360 128" />
        <path d="M340 132 H500" />
        <path d="M356 132 V124 H484 V132 M366 124 V117 H474 V124" />
        <path d="M372 117 C372 84 394 66 420 66 C446 66 468 84 468 117" />
        <path d="M410 66 V58 H430 V66" />
        <path d="M414 58 L420 22 L426 58" />
        <circle cx="420" cy="19" r="2.2" />
        <path d="M520 132 C560 130 590 130 640 131" />
        <path d="M617 131 C619 118 618 106 614 96 M625 131 C624 118 626 106 630 96" />
        <path d="M616 106 C606 102 600 100 594 101 M627 108 C637 103 645 101 652 103" />
        <path d="M588 100 C570 98 566 80 580 74 C578 60 594 52 606 58 C612 46 634 44 642 56 C656 52 670 62 666 76 C680 82 676 100 660 101 C650 106 636 104 628 100 C618 105 600 106 588 100 Z" />
        <path d="M690 132 H960" />
        <path d="M748 132 V122 H952 V132" />
        <path d="M770 122 V98 M800 122 V98 M830 122 V98 M870 122 V98 M900 122 V98 M930 122 V98" />
        <path d="M842 122 V104 H858 V122" />
        <path d="M744 98 C752 98 756 94 760 90 L780 82 H920 L940 90 C944 94 948 98 956 98 Z" />
        <path d="M786 82 L806 70 H894 L914 82" />
        <path d="M806 70 L836 60 H864 L894 70" />
        <path d="M836 60 C842 56 846 54 850 52 C854 54 858 56 864 60" />
        <path d="M960 132 C1000 128 1030 110 1070 104 C1110 98 1140 112 1170 122 C1182 126 1192 129 1200 130" />
        <path d="M1020 118 C1050 108 1080 108 1110 116" opacity="0.6" />
      </svg>
    </div>
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-links">
          {/* moved here from the navbar — it's a homepage section, not a page */}
          <Link href={`${prefix || "/"}#how-it-works`}>{t.howItWorks}</Link>
          <Link href={`${prefix}/about`}>{t.about}</Link>
          <Link href={`${prefix}/blog`}>Blog</Link>
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
    </>
  );
}
