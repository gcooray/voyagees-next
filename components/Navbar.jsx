"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import logo from "@/public/logo-voyagees-dark.svg";
import "./Navbar.css";

// Desktop: items with children open a submenu on hover/focus.
// Mobile: children are listed indented under their parent.
const NAV_ITEMS = [
  {
    en: "Private Driver",
    fr: "Chauffeur privé",
    href: "/private-driver",
    frHref: "/fr/private-driver",
    children: [
      { en: "Colombo", fr: "Colombo", href: "/private-driver/colombo", frHref: "/fr/private-driver/colombo" },
    ],
  },
  {
    en: "Airport Transfers",
    fr: "Transferts aéroport",
    href: "/airport-transfer",
    frHref: "/fr/airport-transfer",
  },
  {
    en: "Private Tours",
    fr: "Circuits privés",
    href: "/private-tour",
    frHref: "/fr/private-tour",
  },
  {
    en: "Explore",
    fr: "Explorer",
    href: "/explore-sri-lanka",
    frHref: "/fr/explore-sri-lanka",
    children: [
      { en: "Sri Lanka map", fr: "Carte du Sri Lanka", href: "/explore-sri-lanka", frHref: "/fr/explore-sri-lanka" },
      { en: "Shared trips", fr: "Trajets partagés", href: "/rides", frHref: "/fr/rides" },
    ],
  },
  {
    en: "Contact",
    fr: "Contact",
    href: "/contact",
    frHref: "/fr/contact",
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Detect French version
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");

  const switchLanguage = () => {
  // Destination pages are dynamic (/destinations/{slug}), so they can't be
  // listed in the static routeMap below — match the pattern directly and
  // swap languages while keeping the same slug.
  const destinationMatch = pathname.match(/^\/(?:fr\/)?destinations\/(.+)$/);
  if (destinationMatch) {
    const slug = destinationMatch[1];
    router.push(isFrench ? `/destinations/${slug}` : `/fr/destinations/${slug}`);
    setIsOpen(false);
    return;
  }

  const routeMap = {
    "/": "/fr",
    "/private-driver": "/fr/private-driver",
    "/explore-sri-lanka": "/fr/explore-sri-lanka",
    "/contact": "/fr/contact",
    "/search": "/fr/search",
    "/about": "/fr/about",
    "/map": "/fr/map",
    "/request": "/fr/request",
    "/terms": "/fr/terms",
    "/rides": "/fr/rides",
    "/private-tour": "/fr/private-tour",
    "/private-driver/colombo": "/fr/private-driver/colombo",
    "/airport-transfer": "/fr/airport-transfer",
    "/plan-trip": "/fr/plan-trip",

    "/fr": "/",
    "/fr/private-driver": "/private-driver",
    "/fr/private-driver/colombo": "/private-driver/colombo",
    "/fr/explore-sri-lanka": "/explore-sri-lanka",
    "/fr/contact": "/contact",
    "/fr/search": "/search",
    "/fr/about": "/about",
    "/fr/map": "/map",
    "/fr/request": "/request",
    "/fr/terms": "/terms",
    "/fr/rides": "/rides",
    "/fr/private-tour": "/private-tour",
    "/fr/airport-transfer": "/airport-transfer",
    "/fr/plan-trip": "/plan-trip",
  };

  const targetPath = routeMap[pathname];

  if (targetPath) {
    router.push(targetPath);
  } else {
    // For routes that don't have a French/English equivalent yet
    router.push(isFrench ? "/" : "/fr");
  }

  setIsOpen(false);
};

  return (
    <nav className={`navbar${isFrench ? " navbar-fr" : ""}`}>
      <div className="navbar-inner">

        {/* LEFT SIDE: LOGO + TOGGLE */}
        <div className="left-side">

          <Link
            href={isFrench ? "/fr" : "/"}
            onClick={() => setIsOpen(false)}
          >
            <Image
              src={logo}
              alt="Voyagees Logo"
              className="navbar-logo"
              priority
            />
          </Link>

          <button
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

        </div>

        {/* RIGHT SIDE: LINKS */}
        <ul className={`nav-links ${isOpen ? "show" : ""}`}>

          {NAV_ITEMS.map((item) => {
            const label = isFrench ? item.fr : item.en;
            const href = isFrench ? item.frHref : item.href;
            // only sub-links that exist in the current language
            const children = (item.children || []).filter(
              (child) => !isFrench || child.frHref
            );

            return (
              <li
                key={item.href}
                className={children.length > 0 ? "nav-dropdown" : undefined}
              >
                <Link href={href} onClick={() => setIsOpen(false)}>
                  {label}
                  {children.length > 0 && (
                    <span className="nav-caret" aria-hidden="true">▾</span>
                  )}
                </Link>

                {children.length > 0 && (
                  <ul className="nav-submenu">
                    {children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={isFrench ? child.frHref : child.href}
                          onClick={() => setIsOpen(false)}
                        >
                          {isFrench ? child.fr : child.en}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}

          {/* Primary action — the one bookable-on-your-own flow. Lands on
              the Private Driver page's hero search, which asks for dates
              before showing results. */}
          <li className="nav-cta-item">
            <Link
              href={isFrench ? "/fr/private-driver#find-driver" : "/private-driver#find-driver"}
              className="nav-cta"
              onClick={() => setIsOpen(false)}
            >
              {isFrench ? "Trouver un chauffeur" : "Find a Driver"}
            </Link>
          </li>

          {/* LANGUAGE SWITCHER */}
          <li className="language-switcher">
            <button
  type="button"
  onClick={switchLanguage}
  className="language-button"
>
  <span className="language-flag">
    {isFrench ? "🇬🇧" : "🇫🇷"}
  </span>

  <span>
    {isFrench ? "EN" : "FR"}
  </span>
</button>
          </li>

        </ul>

      </div>
    </nav>
  );
}