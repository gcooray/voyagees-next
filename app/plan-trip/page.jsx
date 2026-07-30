"use client";

import { useState } from "react";
import { touristDestinations } from "@/data/touristDestinations";
import { generateRoute } from "@/lib/routeGenerator";

export default function PlanTripPage() {
  const [interests, setInterests] = useState([]);
  const [days, setDays] = useState(7);
  const [route, setRoute] = useState([]);

  const availableInterests = [
    "culture",
    "beach",
    "wildlife",
    "surfing",
    "hiking",
    "history",
  ];

  const toggleInterest = (item) => {
    setInterests((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleGenerate = () => {
    const result = generateRoute(touristDestinations, {
      interests,
      days,
    });

    setRoute(result);
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "Arial",
      }}
    >
      {/* HEADER */}
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
        Plan Your Sri Lanka Trip ✈️
      </h1>

      <p style={{ color: "#555", marginBottom: "30px" }}>
        Select your interests and trip duration. We will build your personalized itinerary.
      </p>

      {/* ---------------- FORM ---------------- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
        }}
      >
        {/* LEFT PANEL */}
        <div>
          <h2>🎯 Your Interests</h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {availableInterests.map((item) => (
              <button
                key={item}
                onClick={() => toggleInterest(item)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "999px",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  background: interests.includes(item)
                    ? "#0070f3"
                    : "white",
                  color: interests.includes(item) ? "white" : "#333",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <h2 style={{ marginTop: "30px" }}>📅 Trip Duration</h2>

          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <option value={3}>3 Days</option>
            <option value={5}>5 Days</option>
            <option value={7}>7 Days</option>
            <option value={10}>10 Days</option>
            <option value={14}>14 Days</option>
          </select>

          <button
            onClick={handleGenerate}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              background: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Generate My Trip
          </button>
        </div>

        {/* RIGHT PANEL - RESULTS */}
        <div>
          <h2>🧭 Your Suggested Route</h2>

          {route.length === 0 ? (
            <p style={{ color: "#888" }}>
              Your itinerary will appear here after generation.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {route.map((place, index) => (
                <div
                  key={place.slug}
                  style={{
                    padding: "15px",
                    border: "1px solid #eee",
                    borderRadius: "12px",
                    background: "#fafafa",
                  }}
                >
                  <h3 style={{ margin: 0 }}>
                    {index + 1}. {place.name}
                  </h3>

                  <p style={{ margin: "5px 0", color: "#666" }}>
                    Stay: {place.daysRecommended || 1} day(s)
                  </p>

                  <p style={{ fontSize: "14px", color: "#888" }}>
                    {place.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}