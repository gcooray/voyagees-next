import "./terms.css";

export const metadata = {
  title: "Travel Terms of Use for Sri Lanka Tours | voyaGees",
  description:
    "Read the Terms of Use for voyaGees — understand booking process, cancellations, payments, and responsibilities before your trip in Sri Lanka.",
  alternates: {
    canonical: "https://www.voyagees.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="terms-page">
      <h1>Terms of Use</h1>
      <p>Last updated: July 22, 2025</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to VOYAGEES. By using our platform, you agree to the following
        terms and conditions.
      </p>

      <h2>2. Booking Process</h2>
      <ul>
        <li>All bookings are requests until confirmed by the driver.</li>
        <li>You will receive a confirmation email once the driver accepts.</li>
        <li>Booking is finalized after confirmation.</li>
      </ul>

      <h2>3. Cancellations</h2>
      <ul>
        <li>Cancel at least 48 hours before the trip when possible.</li>
        <li>Last-minute cancellations may affect future bookings.</li>
      </ul>

      <h2>4. Extra Charges</h2>
      <ul>
        <li>Includes fuel and standard mileage.</li>
        <li>Extra km charges apply beyond limits.</li>
      </ul>

      <h2>5. Payments</h2>
      <ul>
        <li>No online payments collected.</li>
        <li>Payments are made directly to drivers.</li>
      </ul>

      <h2>6. Liability</h2>
      <ul>
        <li>We are not responsible for trip incidents or delays.</li>
      </ul>

      <h2>7. Code of Conduct</h2>
      <ul>
        <li>Treat drivers with respect.</li>
        <li>Follow local laws during travel.</li>
      </ul>

      <h2>8. Contact</h2>
      <p>
        Email:{" "}
        <a href="mailto:contact@voyagees.com">
          contact@voyagees.com
        </a>
      </p>
    </div>
  );
}