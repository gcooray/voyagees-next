import Link from "next/link";
import Image from "next/image";
import { destinationsFr } from "@/data/destinationsFr";
import TouristMap from "@/components/TouristMap";
import "../../../destinations/[slug]/page.css";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const destination = destinationsFr.find((d) => d.slug === slug);

  if (!destination) {
    return {
      title: "Destination Introuvable",
    };
  }

  return {
    title: destination.metaTitle,
    description: destination.metaDescription,
    alternates: {
      canonical: `https://www.voyagees.com/fr/destinations/${destination.slug}`,
    },
  };
}

export default async function DestinationPageFr({ params }) {
  const { slug } = await params;

  const destination = destinationsFr.find((d) => d.slug === slug);

  if (!destination) {
    return <div>Destination introuvable</div>;
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
        <h2>Pourquoi Visiter {destination.name}</h2>
        <p>{destination.overview}</p>
      </section>

      {/* Things To Do */}
      <section className="tours">
        <h2>Incontournables d&apos;une Journée à {destination.name}</h2>

        <ul>
          {destination.thingsToDo?.map((item, idx) => (
            <li key={idx}>• {item}</li>
          ))}
        </ul>

        <p>
          <strong>Services Associés :</strong>{" "}
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
        <h2>Tarifs et Prestations Incluses</h2>

        <p>
          Les circuits privés à {destination.name} commencent à partir de{" "}
          <strong>65 $ US</strong> par personne.
        </p>

        <ul>
          <li>✅ Chauffeur-guide privé</li>
          <li>✅ Véhicule climatisé</li>
          <li>✅ Taxes routières et frais de stationnement</li>
          <li>✅ Itinéraire flexible</li>
        </ul>

        <p>Les frais d&apos;entrée aux sites ne sont pas inclus.</p>
      </section>

      {/* Entrance Fees */}
      {destination.entranceFees?.length > 0 && (
        <section className="entrance-fees">
          <h2>Frais d&apos;Entrée</h2>

          <table className="fees-table">
            <thead>
              <tr>
                <th>Type de Visiteur</th>
                <th>Tarif</th>
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
        <h2>Conseils de Voyage</h2>

        <ul>
          {destination.travelTips?.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>

        <p>
          <strong>Meilleure Période pour Visiter :</strong> {destination.bestTime}
        </p>
      </section>

      {/* FAQ */}
      {destination.faq?.length > 0 && (
        <section className="faq">
          <h2>Questions Fréquentes</h2>

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
          <h2>Galerie Photo</h2>

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
        <h2>Découvrir les Destinations à Proximité</h2>
        <TouristMap highlightSlug={destination.slug} />
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Planifiez Votre Voyage à {destination.name}</h2>
        <p>Laissez-nous vous aider à créer un itinéraire sur mesure avec un chauffeur privé.</p>

        <Link href="/fr/private-driver" className="btn">
          Demander un Devis
        </Link>
      </section>
    </div>
  );
}
