"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchForm from "@/components/SearchForm.jsx";
import "@/app/page.css";

const VALUE_ICONS = ["↗", "↔", "□", "✓"];

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

  const privateDriverPath =
    locale === "fr" ? "/fr/private-driver" : "/private-driver";

  const explorePath =
    locale === "fr"
      ? "/fr/explorer-le-sri-lanka"
      : "/explore-sri-lanka";

  // const reviewsPath =
  //   locale === "fr" ? "/fr/reviews" : "/reviews";

  return (
    <main className="voyagees-home">

      {/* =====================================================
          HERO / SEARCH
      ===================================================== */}

      <section className="market-hero">

        <div className="market-hero-image" />

        <div className="market-hero-overlay" />

        <div className="market-hero-content">

          <p className="market-eyebrow">
            {content.hero.eyebrow}
          </p>

          <h1>
            {content.hero.title}
            <br />
            <span>{content.hero.titleHighlight}</span>
          </h1>

          <p className="market-hero-description">
            {content.hero.description}
          </p>

        </div>

        <div className="market-search-card">

          <div className="market-search-heading">
            <div>
              <span className="market-search-label">
                {content.search.eyebrow}
              </span>

              <h2>
                {content.search.heading}
              </h2>
            </div>

            
          </div>

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
            locale={locale}
          />

        </div>

      </section>


      {/* =====================================================
          VALUE PROPOSITION
      ===================================================== */}

      <section className="value-section">

        <div className="value-header">

          <div>
            <p className="section-eyebrow">
              {content.value.eyebrow}
            </p>

            <h2>
              {content.value.title}
              <br />
              <span>{content.value.titleHighlight}</span>
            </h2>
          </div>

          <p className="value-introduction">
            {content.intro.text1}
          </p>

        </div>


        <div className="value-grid">

          {content.value.cards.map((card, index) => (
            <article className="value-card" key={card.title}>

              <div className="value-icon">{VALUE_ICONS[index]}</div>

              <h3>
                {card.title}
              </h3>

              <p>
                {card.text}
              </p>

            </article>
          ))}

        </div>

      </section>


      {/* =====================================================
          INTRO / PRIVATE DRIVER
      ===================================================== */}

      <section className="intro-market-section">

        <div className="intro-market-image">
          <img
            src="/images/home/story.jpg"
            alt="Private driver journey through Sri Lanka"
          />
        </div>

        <div className="intro-market-content">

          <p className="section-eyebrow">
            {content.intro.eyebrow}
          </p>

          <h2>
            {content.intro.title}
            <br />
            <span>{content.intro.titleHighlight}</span>
          </h2>

          <p>
            {content.intro.text1}
          </p>

          <p>
            {content.intro.text2}
          </p>

          <Link
            href={privateDriverPath}
            className="market-text-link"
          >
            {content.intro.link}
            <span>→</span>
          </Link>

        </div>

      </section>


      {/* =====================================================
          DESTINATIONS
      ===================================================== */}

      <section className="market-destinations">

        <div className="market-section-top">

          <div>
            <p className="section-eyebrow">
              {content.destinations.eyebrow}
            </p>

            <h2>
              {content.destinations.title}
              <br />
              <span>{content.destinations.titleHighlight}</span>
            </h2>
          </div>

          <Link
            href={explorePath}
            className="market-outline-link"
          >
            {content.destinations.button}
            <span>→</span>
          </Link>

        </div>


        <div className="market-destination-grid">

          {content.destinationsList.map((destination, index) => (

            <Link
              href={
                locale === "fr"
                  ? `/fr/destinations/${destination.slug}`
                  : `/destinations/${destination.slug}`
              }
              className={`market-destination-card market-destination-${index + 1}`}
              key={destination.name}
            >

              <img
                src={destination.image}
                alt={`${destination.name}, Sri Lanka`}
              />

              <div className="market-destination-overlay" />

              <span className="market-destination-arrow">→</span>

              <div className="market-destination-content">

                <span>
                  0{index + 1}
                </span>

                <h3>
                  {destination.name}
                </h3>

                <p>
                  {destination.description}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="market-how" id="how-it-works">

        <div className="market-how-heading">

          <div>

            <p className="section-eyebrow">
              {content.how.eyebrow}
            </p>

            <h2>
              {content.how.title}
              <br />
              <span>{content.how.titleHighlight}</span>
            </h2>

          </div>

          <p>
            {content.how.introduction}
          </p>

        </div>


        <div className="market-steps">

          {content.how.steps.map((step) => (

            <article
              className="market-step"
              key={step.number}
            >

              <div className="market-step-number">
                {step.number}
              </div>

              <div className="market-step-body">

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.text}
                </p>

              </div>

              <span className="market-step-arrow">
                →
              </span>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          DRIVER / SUPPLY SIDE
      ===================================================== */}

      <section className="market-driver">

        <div className="market-driver-image">
          <img
            src="/images/home/driver.jpg"
            alt="Voyagees private driver in Sri Lanka"
          />
        </div>

        <div className="market-driver-content">

          <p className="section-eyebrow">
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
            href={privateDriverPath}
            className="market-red-button"
          >
            {content.driver.button}
            <span>→</span>
          </Link>

        </div>

      </section>


      {/* =====================================================
          CUSTOMER STORIES
      ===================================================== */}

      <section className="market-stories">

        <div className="market-stories-heading">

          <div>

            <p className="section-eyebrow">
              {content.stories.eyebrow}
            </p>

            <h2>
              {content.stories.title}
              <br />
              <span>{content.stories.titleHighlight}</span>
            </h2>

          </div>

          {/* Hidden for now — /reviews page doesn't exist yet, so this
              link 404s. Re-enable once that page is built. */}
          {/* <Link
            href={reviewsPath}
            className="market-text-link"
          >
            {content.stories.link}
            <span>→</span>
          </Link> */}

        </div>


        <div className="market-stories-grid">

          {travelerStories.map((story, index) => (

            <article
              className="market-story-card"
              key={story.name}
            >

              <div className="market-story-top">

                <span className="market-story-stars">
                  ★★★★★
                </span>

                <span className="market-story-number">
                  0{index + 1}
                </span>

              </div>

              <p className="market-story-quote">
                “{story.quote}”
              </p>

              <div className="market-story-person">

                <div className="market-story-avatar">
                  {story.name.charAt(0)}
                </div>

                <div>
                  <strong>
                    {story.name}
                  </strong>

                  <span>
                    {story.location}
                  </span>
                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="market-final">

        <div className="market-final-image" />

        <div className="market-final-overlay" />

        <div className="market-final-content">

          <p className="market-eyebrow">
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
            href={privateDriverPath}
            className="market-final-button"
          >
            {content.final.button}
            <span>→</span>
          </Link>

        </div>

      </section>

    </main>
  );
}