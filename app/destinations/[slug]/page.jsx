import Link from "next/link";
import { touristDestinations } from "@/data/touristDestinations";
import TouristMap from "@/components/TouristMap";
import "./page.css";

// Optional SEO (Next.js App Router way)
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const destination = touristDestinations.find(
    (d) => d.slug === slug
  );

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: destination.metaTitle,
    description: destination.metaDescription,
    alternates: {
      canonical: `https://www.voyagees.com/destinations/${destination.slug}`,
    },
  };
}

export default async function DestinationPage({ params }) {
  const { slug } = await params;

  const destination = touristDestinations.find(
    (d) => d.slug === slug
  );

  if (!destination) {
    return <div>Destination not found</div>;
  }

  return (
    <div className="destination-page">

      {/* Hero Section */}
      <header className="hero">
        <img
          src={destination.heroImage}
          alt={destination.altText}
          className="hero-image"
        />

        <h1>{destination.h1}</h1>
        <p className="tagline">{destination.description}</p>
      </header>

      {/* Overview */}
      <section className="overview">
        <h2>Why Visit {destination.name}</h2>
        <p>{destination.overview}</p>
      </section>

      {/* Things To Do */}
      <section className="tours">
        <h2>{destination.name} Day Tour Highlights</h2>

        <ul>
          {destination.thingsToDo?.map((item, idx) => (
            <li key={idx}>• {item}</li>
          ))}
        </ul>

        <p>
          <strong>Related Services:</strong>{" "}
          {destination.relatedLinks?.map((link, idx) => (
            <span key={idx}>
              <Link href={link.url}>
                {link.label}
              </Link>
              {idx < destination.relatedLinks.length - 1 && " | "}
            </span>
          ))}
        </p>
      </section>

      {/* Pricing */}
      <section className="pricing">
        <h2>Pricing & Inclusions</h2>

        <p>
          Private tours to {destination.name} start from{" "}
          <strong>$65 USD</strong> per person.
        </p>

        <ul>
          <li>✅ Private driver-guide</li>
          <li>✅ Air-conditioned vehicle</li>
          <li>✅ Road taxes and parking fees</li>
          <li>✅ Flexible itinerary</li>
        </ul>

        <p>Entry fees to attractions are not included.</p>
      </section>

      {/* Entrance Fees */}
      {destination.entranceFees?.length > 0 && (
        <section className="entrance-fees">
          <h2>Entrance Fees</h2>

          <table className="fees-table">
            <thead>
              <tr>
                <th>Visitor Type</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {destination.entranceFees.map((fee, idx) => (
                <tr key={idx}>
                  <td>{fee.type}</td>
                  <td>{fee.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Travel Tips */}
      <section className="tips">
        <h2>Travel Tips</h2>

        <ul>
          {destination.travelTips?.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>

        <p>
          <strong>Best Time to Visit:</strong> {destination.bestTime}
        </p>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>

        {destination.faq?.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1rem" }}>
            <strong>{item.q}</strong>
            <p>{item.a}</p>
          </div>
        ))}
      </section>

      {/* Gallery */}
      <section className="gallery">
        <h2>Photo Gallery</h2>

        <div className="gallery-grid">
          {destination.galleryImages?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${destination.name} ${idx + 1}`}
              className="gallery-image"
            />
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="map-section">
        <h2>Explore Nearby Destinations</h2>
        <TouristMap highlightSlug={destination.slug} />
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Plan Your Trip to {destination.name}</h2>
        <p>Let us help you create a custom itinerary with a private driver.</p>

        <Link href="/request" className="btn">
          Request a Quote
        </Link>
      </section>
    </div>
  );
}