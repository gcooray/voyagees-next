"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchForm from "@/components/SearchForm.jsx";
import "@/app/page.css";

const travelerStories = [
  {
    quote:
      "Merci pour ce séjour bien organisé, une conduite très agréable, votre calme et bienveillance.",
    name: "Karine & Lionel",
    location: "France",
  },
  {
    quote:
      "Nous avons passé un merveilleux voyage et gardons de très beaux souvenirs de Sri Lanka.",
    name: "Cécile & Laurent",
    location: "France",
  },
  {
    quote:
      "Une très belle expérience, avec un chauffeur professionnel et toujours à notre écoute.",
    name: "M. Bernard",
    location: "France",
  },
];

export default function HomePage({ content, locale }) {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [passengers, setPassengers] = useState("");

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = new URLSearchParams({
      pickup,
      dropoff,
      pickupDate,
      dropoffDate,
      pickupTime,
      dropoffTime,
      passengers,
    }).toString();

    router.push(`/search?${query}`);
  };

  return (
    <main className="voyagees-home">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section">
        <div className="hero-image" />

        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="eyebrow">{content.hero.eyebrow}</p>

<h1>
  {content.hero.title}
  <br />
  <span>{content.hero.titleHighlight}</span>
</h1>

<p className="hero-description">
  {content.hero.description}
</p>

<a href="#plan" className="hero-scroll">
  <span>{content.hero.scroll}</span>
  <span className="scroll-line" />
</a>
        </div>

        <div className="hero-search-wrapper" id="plan">
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
            passengers={passengers}
            setPassengers={setPassengers}
            handleSearch={handleSearch}
          />
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="intro-section">
        <div className="intro-number">01</div>

        <div className="intro-content">
          <p className="eyebrow dark">
  {content.intro.eyebrow}
</p>

<h2>
  {content.intro.title}
  <br />
  <span>{content.intro.titleHighlight}</span>
</h2>

<p className="intro-text">
  {content.intro.text1}
</p>

<p className="intro-text">
  {content.intro.text2}
</p>

<Link
  href={locale === "fr" ? "/fr/private-driver" : "/private-driver"}
  className="text-link"
>
  {content.intro.link}
</Link>
        </div>
      </section>

      {/* =====================================================
          LARGE IMAGE STORY
      ===================================================== */}

      <section className="story-section">
        <div className="story-image" />

        <div className="story-overlay" />

        <div className="story-content">
  <p className="eyebrow">
    {content.story.eyebrow}
  </p>

  <h2>
    {content.story.title}
    <br />
    <span>{content.story.titleHighlight}</span>
    <br />
    {content.story.titleEnd}
  </h2>
</div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="how-section" id="how-it-works">
        <div className="section-header">
  <div>
    <p className="eyebrow dark">
      {content.how.eyebrow}
    </p>

    <h2>
      {content.how.title}
      <br />
      <span>{content.how.titleHighlight}</span>
    </h2>
  </div>

  <p className="section-introduction">
    {content.how.introduction}
  </p>
</div>

        <div className="steps-list">
          {content.how.steps.map((step) => (
            <div className="step-row" key={step.number}>
              <div className="step-number">{step.number}</div>

              <div className="step-title">
                <h3>{step.title}</h3>
              </div>

              <div className="step-description">
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          DESTINATIONS
      ===================================================== */}

      <section className="destinations-section">
        <div className="destination-heading">
          <p className="eyebrow">
  {content.destinations.eyebrow}
</p>

<h2>
  {content.destinations.title}
  <br />
  <span>{content.destinations.titleHighlight}</span>
</h2>
        </div>

        <div className="destination-grid">
          {content.destinationsList.map((destination, index) => (
            <Link
  href={
    locale === "fr"
      ? `/fr/destinations/${destination.slug}`
      : `/destinations/${destination.slug}`
  }
  className={`destination-card destination-${index + 1}`}
  key={destination.name}
>
              <img
                src={destination.image}
                alt={`${destination.name}, Sri Lanka`}
              />

              <div className="destination-overlay" />

              <div className="destination-content">
                <span>0{index + 1}</span>

                <h3>{destination.name}</h3>

                <p>{destination.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="destination-button-wrapper">
          <Link
  href={locale === "fr" ? "/fr/explorer-le-sri-lanka" : "/explore-sri-lanka"}
  className="outline-button"
>
  {content.destinations.button}
</Link>
        </div>
      </section>

      {/* =====================================================
          DRIVER SECTION
      ===================================================== */}

      <section className="driver-section">
        <div className="driver-image" />

        <div className="driver-content">
  <p className="eyebrow dark">
    {content.driver.eyebrow}
  </p>

  <h2>
    {content.driver.title}
    <br />
    <span>{content.driver.titleHighlight}</span>
  </h2>

  <p>
    {content.driver.text1}
  </p>

  <p>
    {content.driver.text2}
  </p>

  <Link
    href={locale === "fr" ? "/fr/search" : "/search"}
    className="red-button"
  >
    {content.driver.button}
  </Link>
</div>
      </section>

      {/* =====================================================
          CUSTOMER STORIES
      ===================================================== */}

      <section className="stories-section">
        <div className="stories-heading">
  <p className="eyebrow dark">
    {content.stories.eyebrow}
  </p>

  <h2>
    {content.stories.title}
    <br />
    <span>{content.stories.titleHighlight}</span>
  </h2>
</div>

        <div className="stories-grid">
          {travelerStories.map((story, index) => (
            <article className="story-card" key={story.name}>
              <div className="story-stars">★★★★★</div>

              <p className="story-quote">
                “{story.quote}”
              </p>

              <div className="story-person">
                <div className="story-avatar">
                  {index + 1}
                </div>

                <div>
                  <strong>{story.name}</strong>
                  <span>{story.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="stories-link">
          <Link
  href={locale === "fr" ? "/fr/reviews" : "/reviews"}
  className="text-link"
>
  {content.stories.link}
</Link>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="final-section">
        <div className="final-image" />

        <div className="final-overlay" />

        <div className="final-content">
          <p className="eyebrow">
  {content.final.eyebrow}
</p>

<h2>
  {content.final.title}
  <br />
  <span>{content.final.titleHighlight}</span>
</h2>

<p>
  {content.final.text}
</p>

<Link
  href={locale === "fr" ? "/fr/search" : "/search"}
  className="final-button"
>
  {content.final.button}
</Link>
        </div>
      </section>

    </main>
  );
}