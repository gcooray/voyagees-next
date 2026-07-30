"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import SearchForm from "@/components/SearchForm.jsx";
import HowItWorks from "@/components/HowItWorks.jsx";
import Reviews from "@/components/Reviews.jsx";


export default function Home() {
  // 🚗 Search state
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");

  const router = useRouter();

  // 🔍 Search handler (Next.js navigation)
  const handleSearch = (e) => {
    e.preventDefault();

    const query = new URLSearchParams({
      pickup,
      dropoff,
      pickupDate,
      dropoffDate,
      pickupTime,
      dropoffTime,
    }).toString();

    router.push(`/search?${query}`);
  };

  return (
    <main>
      {/* 🧭 HERO SEARCH SECTION */}
      <section
        style={{
          backgroundImage: "url('/images/home/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "80px 20px",
        }}
      >
        <SearchForm
          pickup={pickup}
          setPickup={setPickup}
          dropoff={dropoff}
          setDropoff={setDropoff}
          pickupDate={pickupDate}
          setPickupDate={setPickupDate}
          dropoffDate={dropoffDate}
          setDropoffDate={setDropoffDate}
          pickupTime={pickupTime}
          setPickupTime={setPickupTime}
          dropoffTime={dropoffTime}
          setDropoffTime={setDropoffTime}
          handleSearch={handleSearch}
        />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* ⭐ REVIEWS PREVIEW SECTION */}
      <section style={{ marginTop: "60px" }}>
        <Reviews showPreview={true} />

        {/* 👉 link to full reviews page */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link
            href="/reviews"
            style={{
              color: "#cc0000",
              textDecoration: "underline",
              fontWeight: "500",
            }}
          >
      
          </Link>
        </div>
      </section>
    </main>
  );
}