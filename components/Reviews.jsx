import React, { useState } from "react";
import ReviewCard from "../components/ReviewCard";


<>
  <title>Traveler Reviews & Experiences | voyaGees</title>
  <meta
    name="description"
    content="See what our travelers say about their voyaGees experience. Real reviews from real journeys across Sri Lanka."
  />
  <link rel="canonical" href="https://www.voyagees.com/reviews" />
  <meta property="og:title" content="Traveler Reviews | voyaGees" />
  <meta property="og:description" content="Read real customer reviews from travelers who explored Sri Lanka with voyaGees private drivers and tours." />
</>


const reviews = [
  {
    name: "Karine and Lionel from France",
    photo: "https://source.unsplash.com/80x80/?woman,smiling",
    quote:
      "Bonjour Gayan, merci pour ce séjour bien organisé, une conduite très agréable, votre calme et bienveillance. Nous repartons avec plein de bons souvenirs, de belles images et bien reposés...",
    rating: 5,
  },
  {
    name: "Cécile et Laurent from France",
    photo: "https://source.unsplash.com/80x80/?man,travel",
    quote:
      "J'ai eu aussi l'occasion de voyager avec cet opérateur et je vous confirme que cette agence est tres bien...",
    rating: 5,
  },
  {
    name: "M. Bernard from France",
    photo: "https://source.unsplash.com/80x80/?woman,beach",
    quote:
      "Bonjours à tous, Nous tenions à vous faire partager mon épouse et moi même, notre avis sur ce merveilleux voyage...",
    rating: 5,
  },
];

const pastCustomerPhotos = [
  "/images/customers/1.jpg",
  "/images/customers/2.jpg",
  "/images/customers/3.jpg",
  "/images/customers/4.jpg",
  "/images/customers/5.jpg",
  "/images/customers/6.jpg",
  "/images/customers/7.jpg",
  "/images/customers/8.jpg",
];

export default function Reviews() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "10px" }}>
        ❤️ What Our Travelers Say
      </h1>
      <p style={{ textAlign: "center", color: "#555", marginBottom: "30px" }}>
        Real stories from real journeys across Sri Lanka.
      </p>

      {/* Customer Photo Collage */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          gap: "10px",
          marginBottom: "40px",
        }}
      >
        {pastCustomerPhotos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Past traveler ${index + 1}`}
            style={{
              width: "100%",
              height: "100px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onClick={() => setSelectedPhoto(photo)}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
        ))}
      </div>

      {/* Zoom Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            cursor: "zoom-out",
          }}
        >
          <img
            src={selectedPhoto}
            alt="Zoomed traveler"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px",
              boxShadow: "0 0 20px rgba(255,255,255,0.4)",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
      )}

      {/* Reviews */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
}