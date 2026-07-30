import React from "react";

export default function ReviewCard({ review }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        margin: "10px auto",
        textAlign: "center",
      }}
    >
      {/*<img
        src={review.photo}
        alt={review.name}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "10px",
        }}
      />*/}
      <h3 style={{ marginBottom: "5px" }}>{review.name}</h3>
      <p style={{ fontStyle: "italic", color: "#555" }}>"{review.quote}"</p>
      <p style={{ fontSize: "14px", color: "#777", marginTop: "10px" }}>
        {/*Itinerary: <strong>{review.itinerary}</strong>*/}
      </p>
      {review.rating && (
        <p style={{ color: "#f39c12", fontSize: "18px" }}>
          {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
        </p>
      )}
    </div>
  );
}