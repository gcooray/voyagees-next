import BrowseTripsClient from "./BrowseTripsClient";
import "./page.css";

export const metadata = {
  title: "Shared Trips – Split a Private Driver's Cost in Sri Lanka | voyaGees",
  description:
    "Share a private driver with other travelers heading your way in Sri Lanka. Post a trip or request a seat, and split the cost automatically as more riders join.",
};

export default function BrowseTripsPage() {
  return (
    <main className="rides-browse-page">

      <section className="rides-intro">
        <h1>Share a Ride, Split the Cost</h1>
        <p>
          Hiring a private driver in Sri Lanka is comfortable and flexible, but it&apos;s
          usually cheaper split between a few people. Shared trips let you post a
          route you&apos;re already planning, or find travelers heading your way, so
          everyone pays a smaller share of the same private driver.
        </p>
      </section>

      <section className="rides-how" aria-labelledby="rides-how-heading">
        <h2 id="rides-how-heading">How it works</h2>
        <ol className="rides-how-steps">
          <li>
            <span className="rides-how-number">01</span>
            <div>
              <h3>Post or find a trip</h3>
              <p>Posting your route, or browsing what other travelers have already planned.</p>
            </div>
          </li>
          <li>
            <span className="rides-how-number">02</span>
            <div>
              <h3>Request to join</h3>
              <p>Send your name and phone number — the organizer reviews and approves each request.</p>
            </div>
          </li>
          <li>
            <span className="rides-how-number">03</span>
            <div>
              <h3>Split the cost</h3>
              <p>The total driver fare divides across everyone confirmed, so more riders means a cheaper seat for all.</p>
            </div>
          </li>
        </ol>
      </section>

      <BrowseTripsClient />

      <section className="rides-faq" aria-labelledby="rides-faq-heading">
        <h2 id="rides-faq-heading">Frequently asked questions</h2>

        <div className="rides-faq-item">
          <h3>What is a shared trip?</h3>
          <p>
            A shared trip is a private driver journey — an airport transfer, a day trip, or a
            multi-day route — that one traveler posts so others heading the same way can join
            and split the fare. The organizer still gets their own private driver; they&apos;re
            just sharing the seats and the cost.
          </p>
        </div>

        <div className="rides-faq-item">
          <h3>How is the price per seat worked out?</h3>
          <p>
            The organizer sets the total trip cost and how many seats are available. As requests
            get accepted, the price per seat is recalculated automatically by dividing the total
            cost across everyone confirmed so far.
          </p>
        </div>

        <div className="rides-faq-item">
          <h3>Who approves who joins a trip?</h3>
          <p>
            The trip organizer does. Every request to join goes to them first, and no one is
            added to a trip without their approval.
          </p>
        </div>

        <div className="rides-faq-item">
          <h3>Can I post a trip if I&apos;m not driving myself?</h3>
          <p>
            Yes. Posting a trip just means you&apos;ve already arranged (or are planning to arrange)
            a private driver for that route — you&apos;re inviting other travelers to share the seats
            and the cost, not offering to drive.
          </p>
        </div>
      </section>

    </main>
  );
}
