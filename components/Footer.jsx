"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Footer.css";

const STRINGS = {
  en: {
    about: "About Us",
    contact: "Contact",
    terms: "Terms of Use",
    madeIn: "Made in Sri Lanka",
  },
  fr: {
    about: "À propos",
    contact: "Contact",
    terms: "Conditions d'Utilisation",
    madeIn: "Fait au Sri Lanka",
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
          <Link href={`${prefix}/about`}>{t.about}</Link>
          <Link href={`${prefix}/contact`}>{t.contact}</Link>
          <Link href={`${prefix}/terms`}>{t.terms}</Link>
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
