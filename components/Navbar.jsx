"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import logo from "@/public/logo02.png";
import "./Navbar.css";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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

    if (pathname !== "/") {
      router.push("/");
      setTimeout(scrollToSection, 500);
    } else {
      scrollToSection();
    }

    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* LEFT SIDE: LOGO + TOGGLE */}
        <div className="left-side">

          <Link href="/" onClick={() => setIsOpen(false)}>
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

  <a href="#how-it-works" onClick={handleHowItWorksClick}>
  How It Works
</a>

          <li>
            <Link href="/explore-sri-lanka" onClick={() => setIsOpen(false)}>
              Explore Sri Lanka
            </Link>
          </li>

          <li>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Any Questions?
            </Link>
          </li>

        </ul>

      </div>
    </nav>
  );
}