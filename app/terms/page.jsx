import "./terms.css";
import { withSeo } from "@/lib/seo";

export const metadata = withSeo("/terms", {
  title: "Travel Terms of Use for Sri Lanka Tours | voyaGees",
  description:
    "Read the Terms of Use for voyaGees: how bookings, prices, payments and cancellations work, what we do if a problem arises during your trip, and our responsibilities.",
});

export default function TermsPage() {
  return (
    <div className="terms-page">
      <h1>Terms of Use</h1>
      <p>Last updated: 16 November 2026</p>

      <h2>1. About Voyagees</h2>
      <p>
        Voyagees connects travellers with independent, licensed private drivers in Sri Lanka. We
        help you find the right driver and vehicle, plan a realistic itinerary and stay in touch
        during your trip. The driving service itself is provided by the driver you travel with.
        By using our website and services, you agree to these terms.
      </p>

      <h2>2. Booking process</h2>
      <ul>
        <li>Every booking starts as a request. It is confirmed only when we have checked the driver&apos;s availability and sent you a confirmation.</li>
        <li>Your confirmation sets out the driver, the vehicle, the dates, the itinerary and the total price.</li>
        <li>Please check the details and tell us straight away if anything is wrong.</li>
      </ul>

      <h2>3. Prices and what they include</h2>
      <ul>
        <li>Unless your quote says otherwise, the price includes the driver, the vehicle, fuel, highway tolls and parking, and the driver&apos;s meals and accommodation.</li>
        <li>Each quote states the distance included. Kilometres beyond it are charged at the rate shown in your quote.</li>
        <li>Entrance tickets, safaris, activities, your own accommodation and meals, and tips are not included unless your quote says so.</li>
        <li>If you change your itinerary during the trip, the price may change. We will agree any change with you before it applies.</li>
      </ul>

      <h2>4. Payments</h2>
      <ul>
        <li>We do not take payments online.</li>
        <li>You pay the driver directly, in cash, in the currency agreed in your quote: usually part at the start of the trip and the balance during the trip.</li>
        <li>Ask for a written note of each payment you make.</li>
      </ul>

      <h2>5. Changes and cancellations</h2>
      <ul>
        <li>Please tell us about any change or cancellation as early as possible, and at least 48 hours before the start of your trip.</li>
        <li>Last-minute cancellations, or not showing up, may affect future bookings.</li>
        <li>If a driver cannot make your trip, we will tell you as soon as we know and offer a replacement driver where possible.</li>
      </ul>

      <h2>6. If a problem arises during your trip</h2>
      <p>
        If an issue arises between you and your driver (for example about the route, timing,
        conduct, the vehicle or the price), contact us right away on WhatsApp at +94 76 112 8692
        or by email. We will step in, talk to both sides and help you reach a fair solution. Where
        it is needed and possible, we will arrange a replacement driver for the rest of your trip.
      </p>

      <h2>7. Responsibility</h2>
      <ul>
        <li>Drivers are independent and are responsible for the driving service, their vehicle, its licence and its insurance.</li>
        <li>Voyagees is not responsible for incidents, accidents, delays or losses during a trip, including those caused by traffic, weather, road or railway closures, or other events outside our control. We will still help you as described in section 6.</li>
        <li>Please take out your own travel insurance and look after your personal belongings.</li>
      </ul>

      <h2>8. Trip planner and itinerary advice</h2>
      <ul>
        <li>Our trip planner and itinerary review are generated automatically from our drivers&apos; experience. They are guidance only.</li>
        <li>Drive times are approximate. Please check opening hours, train schedules and seasonal conditions before you travel.</li>
      </ul>

      <h2>9. Travellers&apos; conduct</h2>
      <ul>
        <li>Treat drivers with respect, and follow local laws and customs during your trip.</li>
        <li>Drivers may refuse unsafe or illegal requests, such as driving beyond safe hours.</li>
      </ul>

      <h2>10. Your information</h2>
      <p>
        We use the details you give us (such as your name, contact details and trip plans) only
        to arrange and support your trip. We share them with your driver only as needed for the
        trip. With your consent, we use cookies to measure visits to our website and the
        performance of our advertising; you can refuse them in the cookie banner.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The date at the top shows the latest
        version. The terms in force when your booking is confirmed apply to that booking.
      </p>

      <h2>12. Contact</h2>
      <p>
        WhatsApp: +94 76 112 8692
        <br />
        Email:{" "}
        <a href="mailto:contact@voyagees.com">
          contact@voyagees.com
        </a>
      </p>
    </div>
  );
}
