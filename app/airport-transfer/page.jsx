import Link from "next/link";
import AirportTransferForm from "@/components/AirportTransferForm";
import "../private-driver/page.css";
import "../private-driver/colombo/page.css";
import "./page.css";

export const metadata = {
  title:
    "Colombo Airport Transfers | Private Pickup from Bandaranaike International Airport",
  description:
    "Book a private airport transfer from Bandaranaike International Airport (CMB) to Colombo, Negombo, Kandy, Galle or anywhere in Sri Lanka. Tell us your flight and destination and get a quote within 24 hours.",
  alternates: {
    canonical: "https://www.voyagees.com/airport-transfer",
  },
};

const DESTINATIONS = [
  { name: "Negombo", time: "approx. 20–30 min" },
  { name: "Colombo", time: "approx. 45–60 min" },
  { name: "Galle", time: "approx. 2.5–3 hrs" },
  { name: "Kandy", time: "approx. 3–3.5 hrs" },
  { name: "Sigiriya / Dambulla", time: "approx. 3.5–4 hrs" },
  { name: "Ella", time: "approx. 5.5–6.5 hrs" },
];

export default function AirportTransferPage() {
  return (
    <main className="private-driver-page pdc-page at-page">

      {/* =====================================================
          HERO — copy + the booking form itself
      ===================================================== */}

      <section className="pd-hero at-hero">
        <div className="pd-hero-overlay" />

        <div className="pd-hero-content">

          <div className="pd-hero-copy">
            <p className="pd-eyebrow">
              AIRPORT TRANSFERS · BANDARANAIKE INTERNATIONAL AIRPORT
            </p>

            <h1>Private Airport Transfers in Sri Lanka</h1>

            <p className="pd-hero-note">
              A private driver waiting for you when you land, or a
              stress-free ride back for your flight home. Tell us your
              flight and destination and we&apos;ll send you a quote.
            </p>

            <ul className="at-hero-points">
              <li>Private vehicle, just for your group</li>
              <li>Pickups and drop-offs, any time of day</li>
              <li>Colombo, Negombo or anywhere on the island</li>
              <li>No payment until you accept the quote</li>
            </ul>
          </div>

          <div className="at-hero-form" id="book">
            <AirportTransferForm />
          </div>

        </div>
      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">HOW IT WORKS</p>
          <h2>How to Book Your Airport Transfer</h2>
        </div>

        <ol className="pdc-steps">

          <li>
            <span className="pdc-step-number">1</span>
            <h3>Send Your Flight Details</h3>
            <p>
              Your date, landing or pickup time, flight number, passengers,
              luggage and the hotel or address you&apos;re going to.
            </p>
          </li>

          <li>
            <span className="pdc-step-number">2</span>
            <h3>Get Your Quote</h3>
            <p>
              We&apos;ll reply within 24 hours with a price and a suitable
              vehicle for your group and luggage.
            </p>
          </li>

          <li>
            <span className="pdc-step-number">3</span>
            <h3>Confirm Your Transfer</h3>
            <p>
              Happy with the quote? Confirm it and we&apos;ll send you your
              driver&apos;s details before you travel.
            </p>
          </li>

          <li>
            <span className="pdc-step-number">4</span>
            <h3>Meet Your Driver</h3>
            <p>
              Your driver meets you at the agreed pickup point and takes you
              straight to your destination.
            </p>
          </li>

        </ol>

      </section>


      {/* =====================================================
          POPULAR ROUTES
      ===================================================== */}

      <section className="pd-cream-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">POPULAR ROUTES</p>
          <h2>Where Can We Take You From the Airport?</h2>
        </div>

        <p className="pdc-intro">
          Bandaranaike International Airport is in Katunayake, north of
          Colombo. Most travellers head to one of these destinations first,
          but we can arrange a transfer to anywhere in Sri Lanka.
        </p>

        <div className="at-route-grid">
          {DESTINATIONS.map((d) => (
            <a key={d.name} href="#book" className="at-route">
              <span className="at-route-from">Airport →</span>
              <h3>{d.name}</h3>
              <p>{d.time}</p>
            </a>
          ))}
        </div>

        <p className="at-route-note">
          Travel times are approximate and depend on traffic and the time of
          day.
        </p>

      </section>


      {/* =====================================================
          WHAT TO SEND
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">WHAT WE NEED</p>
          <h2>What to Include in Your Request</h2>
        </div>

        <div className="pd-text-content">
          <p>
            The more we know about your arrival, the easier it is to match
            the right driver and vehicle to your trip. When you book, tell
            us:
          </p>

          <ul className="pdc-checklist">
            <li>Arrival or departure date</li>
            <li>Landing or pickup time</li>
            <li>Flight number</li>
            <li>Number of passengers</li>
            <li>Large and small bags</li>
            <li>Hotel or destination address</li>
            <li>Child seats or special requirements</li>
            <li>Whether you need a return transfer</li>
          </ul>

          <p className="pdc-note">
            Adding your flight number helps your driver plan around the
            actual landing time if your flight is early or late.
          </p>
        </div>

      </section>


      {/* =====================================================
          WHY PRIVATE
      ===================================================== */}

      <section className="pd-dark-section">

        <div className="pd-section-heading pd-light">
          <p className="pd-eyebrow">WHY BOOK AHEAD</p>
          <h2>Why Pre-Book a Private Airport Transfer?</h2>
        </div>

        <div className="pd-text-content">
          <p>
            Bandaranaike International Airport offers several ground
            transport options, including taxis, buses and public transport.
            A pre-booked private transfer means your ride is arranged before
            you land. There&apos;s nothing to organise after a long flight.
          </p>

          <ul className="pdc-checklist">
            <li>Your own vehicle, not a shared shuttle</li>
            <li>Price agreed before you travel</li>
            <li>Room for your group and luggage</li>
            <li>Driven straight to your hotel or next stop</li>
            <li>Easy to add a return trip to the airport</li>
            <li>Option to continue with a driver for your whole trip</li>
          </ul>

          <p>
            Planning to explore Sri Lanka after you land? Your airport
            transfer can be the start of a longer journey with a{" "}
            <Link href="/private-driver" className="at-inline-link">
              private driver
            </Link>{" "}
            or a{" "}
            <Link href="/private-tour" className="at-inline-link">
              tailor-made private tour
            </Link>
            .
          </p>
        </div>

      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">FREQUENTLY ASKED QUESTIONS</p>
          <h2>Airport Transfer FAQs</h2>
        </div>

        <div className="pd-faq-list">

          <details>
            <summary>How much does an airport transfer cost?</summary>
            <p>
              The price depends on your destination, the vehicle needed for
              your group and luggage, the time of day and whether you need a
              return trip. Send us your details and we&apos;ll reply with a
              quote within 24 hours.
            </p>
          </details>

          <details>
            <summary>What if my flight is delayed?</summary>
            <p>
              Include your flight number when you book, and let us know if
              your plans change. That way your driver can plan around your
              actual landing time.
            </p>
          </details>

          <details>
            <summary>Can I book a transfer back to the airport?</summary>
            <p>
              Yes. Choose &ldquo;To the airport&rdquo; on the form, or tick
              the return trip option to book both directions in one request.
            </p>
          </details>

          <details>
            <summary>Do I have to pay when I book?</summary>
            <p>
              No. Sending the form is a request for a quote. Nothing is
              booked until you accept the price we send you.
            </p>
          </details>

          <details>
            <summary>Can I travel to other parts of Sri Lanka?</summary>
            <p>
              Yes. Transfers aren&apos;t limited to Colombo and Negombo.
              We can arrange a transfer from the airport to Kandy, Galle,
              Sigiriya, Ella or anywhere else on the island.
            </p>
          </details>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="pd-final-section at-final">

        <div className="pd-final-overlay" />

        <div className="pd-final-content">

          <p className="pd-eyebrow">AIRPORT TRANSFERS · SRI LANKA</p>

          <h2>
            Land in Sri Lanka
            <br />
            <span>with your ride already arranged.</span>
          </h2>

          <a href="#book" className="pdc-cta pdc-cta-light">
            Get Your Transfer Quote
          </a>

        </div>

      </section>

    </main>
  );
}
