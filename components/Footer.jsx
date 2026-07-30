"use client";

import React from "react";
import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-links">
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms">Terms of Use</Link>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} VOYAGEES. Made in Sri Lanka
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