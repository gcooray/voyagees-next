import Link from "next/link";
import Image from "next/image";
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
        {destination.heroImage ? (
          <div className="hero-image-wrap">
            <Image
              src={destination.heroImage}
              alt={destination.altText || destination.name}
              fill
              sizes="(max-width: 1000px) 100vw, 1000px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        ) : (
          <div className="hero-image-wrap hero-image-fallback">
            <span>{destination.name}</span>
          </div>
        )}

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
      {destination.faq?.length > 0 && (
        <section className="faq">
          <h2>Frequently Asked Questions</h2>

          {destination.faq.map((item, idx) => (
            <div className="faq-item" key={idx}>
              <strong>{item.q}</strong>
              <p>{item.a}</p>
            </div>
          ))}
        </section>
      )}

      {/* Gallery */}
      {destination.galleryImages?.length > 0 && (
        <section className="gallery">
          <h2>Photo Gallery</h2>

          <div className="gallery-grid">
            {destination.galleryImages.map((img, idx) => (
              <div className="gallery-image-wrap" key={idx}>
                <Image
                  src={img}
                  alt={`${destination.name} ${idx + 1}`}
                  fill
                  sizes="280px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Map */}
      <section className="map-section">
        <h2>Explore Nearby Destinations</h2>
        <TouristMap highlightSlug={destination.slug} />
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Plan Your Trip to {destination.name}</h2>
        <p>Let us help you create a custom itinerary with a private driver.</p>

        <Link href="/private-driver" className="btn">
          Request a Quote
        </Link>
      </section>
    </div>
  );
}