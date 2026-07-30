import React from "react";
import "./HowItWorks.css";
import { Element } from "react-scroll";

export default function HowItWorks() {
  return (
    <Element name="howItWorks">
      <section className="how-it-works-section">
        <h3 className="section-title">How it Works</h3>
        <div className="steps-container">

          <div className="step">
            <span className="step-number">1</span>
            <h3>Plan Your Trip</h3>
            <p>
              Tell us your pickup and drop-off locations, travel dates, and any trip details.
              You’re free to book your own hotels and activities — we’ll handle the driver.
            </p>
          </div>

          <div className="step">
            <span className="step-number">2</span>
            <h3>Choose a Driver</h3>
            <p>
              Browse trusted local drivers with transparent, upfront prices. Each price covers
              mileage and total costs — no hidden fees. Pick the driver that best fits your trip.
            </p>
          </div>

          <div className="step">
            <span className="step-number">3</span>
            <h3>Driver Confirms</h3>
            <p>
              Your driver will review your request and confirm within 24 hours. If they’re unavailable, we’ll connect you with another driver.
            </p>
          </div>

          <div className="step">
            <span className="step-number">4</span>
            <h3>Confirm Booking</h3>
            <p>
              After your driver confirms, you can secure your booking by confirming with us. No advance payment is required — you simply pay the full amount directly to your driver during the trip.
            </p>
          </div>

          <div className="step">
            <span className="step-number">5</span>
            <h3>Enjoy Your Journey</h3>
            <p>
              Meet your driver on the day, travel comfortably, and explore Sri Lanka with local
              knowledge and genuine hospitality.
            </p>
          </div>

        </div>
      </section>
    </Element>
  );
}