"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import logo from "@/public/logo-voyagees-dark.svg";
import "./Navbar.css";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Detect French version
  const isFrench = pathname === "/fr" || pathname.startsWith("/fr/");

  const handleHowItWorksClick = (e) => {
    e.preventDefault();

    const scrollToSection = () => {
      const section = document.getElementById("how-it-works");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const homePath = isFrench ? "/fr" : "/";

    if (pathname !== homePath) {
      router.push(homePath);
      setTimeout(scrollToSection, 500);
    } else {
      scrollToSection();
    }

    setIsOpen(false);
  };

  const switchLanguage = () => {
  const routeMap = {
    "/": "/fr",
    "/private-driver": "/fr/private-driver",
    "/explore-sri-lanka": "/fr/explore-sri-lanka",
    "/contact": "/fr/contact",

    "/fr": "/",
    "/fr/private-driver": "/private-driver",
    "/fr/explore-sri-lanka": "/explore-sri-lanka",
    "/fr/contact": "/contact",
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
    <nav className="navbar">
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

          <li>
            <a href="#how-it-works" onClick={handleHowItWorksClick}>
              {isFrench ? "Comment ça marche" : "How It Works"}
            </a>
          </li>

            <li>
          <Link
            href={isFrench ? "/fr/private-driver" : "/private-driver"}
            onClick={() => setIsOpen(false)}
          >
            {isFrench ? "Chauffeur privé" : "Private Driver"}
          </Link>
        </li>
          
          <li>
            <Link
              href={isFrench ? "/fr/explore-sri-lanka" : "/explore-sri-lanka"}
              onClick={() => setIsOpen(false)}
            >
              {isFrench ? "Explorer le Sri Lanka" : "Explore Sri Lanka"}
            </Link>
          </li>

          <li>
            <Link
              href={isFrench ? "/fr/contact" : "/contact"}
              onClick={() => setIsOpen(false)}
            >
              {isFrench ? "Une question ?" : "Any Questions?"}
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