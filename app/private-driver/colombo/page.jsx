import Link from "next/link";
import DriverSearch from "@/components/DriverSearch";
import "../page.css";
import "./page.css";

export const metadata = {
  title:
    "Hire a Private Driver in Colombo | Private Taxi with Professional Drivers",
  description:
    "Hire a private driver in Colombo for airport pickups, sightseeing, business travel and trips across Sri Lanka. A dedicated vehicle and driver arranged around your schedule.",
  alternates: {
    canonical: "https://www.voyagees.com/private-driver/colombo",
  },
};

// Every "request a driver" CTA on this page scrolls back up to the hero's
// driver search rather than linking away — that form is the booking flow.
const SEARCH_ANCHOR = "#find-driver";

function Checklist({ items, columns = 2 }) {
  return (
    <ul className={`pdc-checklist${columns === 1 ? " pdc-checklist-1col" : ""}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivateDriverColomboPage() {
  return (
    <main className="private-driver-page pdc-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="pd-hero pdc-hero">
        <div className="pd-hero-overlay" />

        <div className="pd-hero-content">

          <div className="pd-hero-copy">
            <p className="pd-eyebrow">
              PRIVATE DRIVER · COLOMBO
            </p>

            <h1>Hire a Private Driver in Colombo</h1>

            <p className="pd-hero-note">
              Travel around Colombo comfortably with a private driver and
              vehicle arranged around your schedule.
            </p>
          </div>

          <div className="pd-hero-search" id="find-driver">
            <div className="pd-search-heading">
              <p className="pd-eyebrow pd-dark">PLAN YOUR JOURNEY</p>
              <h2>Request a private driver</h2>
            </div>

            <DriverSearch />
          </div>

        </div>
      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="pd-intro-section">

        <div className="pd-content">

          <p className="pd-eyebrow pd-dark">
            PRIVATE DRIVER SERVICE · COLOMBO
          </p>

          <p className="pd-lead">
            Whether you have just arrived at{" "}
            <strong>Bandaranaike International Airport</strong>, need a
            driver for sightseeing, have several business meetings to
            attend, or want to continue your journey from Colombo to
            another part of Sri Lanka, we can help arrange a private
            driver for your trip.
          </p>

          <div className="pd-driver-intro">
            <p>
              Tell us your pickup location, destination, date, time and
              number of passengers, and we&apos;ll help arrange the right
              driver and vehicle for your journey.
            </p>
          </div>

          <a href={SEARCH_ANCHOR} className="pdc-cta">
            Request a Private Driver
          </a>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">SERVICES</p>
          <h2>Private Driver Services in Colombo</h2>
        </div>

        <div className="pd-text-content">
          <p>
            A private driver gives you a dedicated vehicle and driver for
            the journey you need to make. Instead of arranging separate
            rides for every stop, you can organise your transportation
            around your itinerary.
          </p>

          <p>Our private driver service can be suitable for:</p>

          <Checklist
            items={[
              "Airport transfers",
              "Hotel pickups and drop-offs",
              "Getting around Colombo",
              "Colombo sightseeing",
              "Business travel",
              "Full-day private hire",
              "Multiple-stop journeys",
              "Trips from Colombo to other destinations in Sri Lanka",
              "Multi-day travel arrangements",
            ]}
          />

          <p className="pdc-note">
            Your trip can be arranged around your schedule, subject to
            driver and vehicle availability.
          </p>
        </div>

      </section>


      {/* =====================================================
          SIGHTSEEING
      ===================================================== */}

      <section className="pd-cream-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">SIGHTSEEING</p>
          <h2>Private Driver for Colombo Sightseeing</h2>
        </div>

        <div className="pd-text-content">
          <p>
            Colombo combines historic sites, markets, restaurants,
            shopping, coastal areas and cultural attractions.
          </p>

          <p>
            A private driver can make it easier to include several places
            in one day without arranging separate transportation between
            each stop.
          </p>

          <p>
            Depending on your itinerary, your journey might include places
            such as:
          </p>

          <Checklist
            items={[
              "Galle Face",
              "Colombo Fort",
              "Pettah Market",
              "Gangaramaya Temple",
              "Colombo National Museum",
              "Shopping malls",
              "Restaurants and hotels",
              "Other attractions around Colombo",
            ]}
          />

          <p className="pdc-note">
            Sri Lanka Tourism lists Galle Face, Pettah, Gangaramaya Temple
            and the Colombo National Museum among the city&apos;s
            attractions.
          </p>

          <p>
            And if shopping is what you&apos;re looking for, there are
            plenty of shopping malls like Colombo City Centre, One Galle
            Face, Havelock City Mall, Marino Mall, Majestic City, Liberty
            Plaza and Crescat Boulevard.
          </p>

          <p>
            You can plan your own itinerary or ask about arranging
            transportation around the places you want to visit.
          </p>

          <Link href="/plan-trip" className="pdc-cta">
            Plan Your Colombo Sightseeing Trip
          </Link>
        </div>

      </section>

      <div className="pd-inline-image">
        <img
          src="/images/hero/colombo.webp"
          alt="Colombo city skyline along the coast"
        />
        <p className="pd-image-caption">Colombo, from Galle Face to the Fort</p>
      </div>


      {/* =====================================================
          BUSINESS TRAVEL
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">BUSINESS TRAVEL</p>
          <h2>Private Driver for Business Travel</h2>
        </div>

        <div className="pd-text-content">
          <p>
            Colombo is also an important business destination, and private
            transportation can be useful when your day involves several
            meetings, hotel pickups or scheduled appointments.
          </p>

          <p>Book a private driver for:</p>

          <Checklist
            items={[
              "Airport-to-office transfers",
              "Hotel-to-meeting transportation",
              "Multiple business appointments",
              "Corporate events",
              "Client transportation",
              "Full-day business travel",
              "Scheduled point-to-point journeys",
            ]}
          />

          <p className="pdc-note">
            Instead of organising a new ride for every appointment, you can
            request a driver for the period and itinerary you require.
          </p>

          <Link href="/contact" className="pdc-cta">
            Ask About Business Transportation in Colombo
          </Link>
        </div>

      </section>


      {/* =====================================================
          AIRPORT PICKUP
      ===================================================== */}

      <section className="pd-dark-section">

        <div className="pd-section-heading pd-light">
          <p className="pd-eyebrow">AIRPORT PICKUP</p>
          <h2>Airport Pickup to Colombo</h2>
        </div>

        <div className="pd-text-content">
          <p>
            Arriving at <strong>Bandaranaike International Airport</strong>?
            Arrange your private driver before you travel so your
            transportation from the airport is part of your arrival plan.
          </p>

          <p>Provide your:</p>

          <Checklist
            items={[
              "Flight details",
              "Arrival date",
              "Arrival time",
              "Passenger count",
              "Luggage requirements",
              "Hotel or destination",
            ]}
          />

          <p className="pdc-note">
            Your driver can meet you at the agreed pickup location and take
            you directly to your destination.
          </p>

          <p>
            Bandaranaike International Airport offers several
            ground-transport options, including taxi, bus and public
            transport services. A private driver is another option for
            travellers who want to arrange a dedicated vehicle around their
            own itinerary.
          </p>


          <Link href="/airport-transfer" className="pdc-cta pdc-cta-light">
            Book an Airport Transfer
          </Link>
        </div>

      </section>


      {/* =====================================================
          SERVICE TYPES
      ===================================================== */}

      <section className="pd-cream-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">SERVICE OPTIONS</p>
          <h2>Choose the Right Private Driver Service</h2>
        </div>

        <p className="pdc-intro">
          The right arrangement depends on your itinerary, passenger count
          and vehicle requirements.
        </p>

        <div className="pdc-card-grid">

          <article className="pd-benefit">
            <span>01</span>
            <h3>One-Way Transfer</h3>
            <p>
              Suitable when you simply need transportation from one
              location to another, such as an airport-to-hotel transfer.
            </p>
          </article>

          <article className="pd-benefit">
            <span>02</span>
            <h3>Hourly or Short-Term Hire</h3>
            <p>
              Useful when you have several stops or appointments within
              Colombo.
            </p>
          </article>

          <article className="pd-benefit">
            <span>03</span>
            <h3>Full-Day Driver</h3>
            <p>
              A practical option when your itinerary includes multiple
              locations and you want dedicated transportation throughout
              the day.
            </p>
          </article>

          <article className="pd-benefit">
            <span>04</span>
            <h3>Multi-Day Driver</h3>
            <p>
              For travellers exploring Sri Lanka, a private driver can
              accompany you across multiple destinations, depending on the
              requested itinerary and vehicle availability.
            </p>
          </article>

        </div>

      </section>


      {/* =====================================================
          VEHICLES + COST
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">VEHICLES</p>
          <h2>What Type of Vehicle Can I Book?</h2>
        </div>

        <div className="pd-text-content">
          <p>
            Vehicle availability depends on your trip requirements. When
            requesting a driver, tell us:
          </p>

          <Checklist
            items={[
              "Number of passengers",
              "Amount of luggage",
              "Preferred vehicle type",
              "Journey duration",
              "Pickup and destination",
              "Any special requirements",
            ]}
          />

          <p className="pdc-note">
            We can then help identify a suitable vehicle for your journey.
          </p>
        </div>

      </section>

      <section className="pd-cream-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">PRICING</p>
          <h2>How Much Does a Private Driver in Colombo Cost?</h2>
        </div>

        <div className="pd-text-content">
          <p>
            The cost of a private driver depends on the details of your
            trip rather than simply the distance travelled. Factors can
            include:
          </p>

          <Checklist
            items={[
              "Pickup and destination",
              "Number of hours",
              "Vehicle type",
              "Number of passengers",
              "Airport transfer requirements",
              "Number of stops",
              "Full-day or multi-day hire",
              "Travel outside Colombo",
              "Waiting time or additional requirements",
            ]}
          />

          <p className="pdc-note">
            For an accurate quotation, send us your itinerary rather than
            relying on a generic price.
          </p>

          <a href={SEARCH_ANCHOR} className="pdc-cta">
            Request a Private Driver Quote
          </a>
        </div>

      </section>


      {/* =====================================================
          WHAT TO LOOK FOR
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">CHOOSING A DRIVER</p>
          <h2>What Should You Look for in a Private Driver?</h2>
        </div>

        <div className="pd-text-content">
          <p>
            When booking transportation in Sri Lanka, it is useful to check
            the driver&apos;s credentials, vehicle suitability and the
            details of the service you are booking.
          </p>

          <p>
            <strong>Sri Lanka Tourism</strong> maintains an official
            directory of authorized tourist drivers that can be searched by
            driver name, registration number or association. The{" "}
            <strong>Sri Lanka Tourism Development Authority</strong> also
            provides registration and training pathways for tourist drivers
            and chauffeur guides.
          </p>

          <p>Where applicable, ask about:</p>

          <Checklist
            items={[
              "Driver identification",
              "Driving licence",
              "Tourism registration or authorization",
              "Vehicle suitability",
              "Passenger insurance",
              "Pickup arrangements",
              "Total quotation",
              "What is included in the booking",
            ]}
          />

          <p className="pdc-note">
            If our service includes specific driver credentials or
            registrations, these should be clearly provided during the
            booking process.
          </p>
        </div>

      </section>


      {/* =====================================================
          WHY BOOK
      ===================================================== */}

      <section className="pd-cream-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">WHY BOOK</p>
          <h2>Why Book a Private Driver in Colombo?</h2>
        </div>

        <p className="pdc-intro">
          A private driver can be useful when you want your transportation
          to fit your itinerary rather than planning your day around fixed
          routes. Depending on the service you book, benefits can include:
        </p>

        <div className="pdc-card-grid pdc-card-grid-3col">

          <article className="pd-benefit">
            <span>01</span>
            <h3>A dedicated vehicle</h3>
            <p>
              Travel with your own vehicle instead of sharing
              transportation with other passengers.
            </p>
          </article>

          <article className="pd-benefit">
            <span>02</span>
            <h3>Flexible scheduling</h3>
            <p>
              Arrange your journey around your planned pickup times and
              destinations.
            </p>
          </article>

          <article className="pd-benefit">
            <span>03</span>
            <h3>Multiple stops</h3>
            <p>
              Useful for sightseeing, shopping, business appointments and
              other multi-stop itineraries.
            </p>
          </article>

          <article className="pd-benefit">
            <span>04</span>
            <h3>Airport and hotel transfers</h3>
            <p>
              Arrange transportation between the airport, hotel and other
              destinations.
            </p>
          </article>

          <article className="pd-benefit">
            <span>05</span>
            <h3>Local driving support</h3>
            <p>
              Have a local driver handle the driving while you concentrate
              on your trip.
            </p>
          </article>

          <article className="pd-benefit">
            <span>06</span>
            <h3>Travel beyond Colombo</h3>
            <p>
              Ask about arranging a private driver for journeys from
              Colombo to other destinations in Sri Lanka.
            </p>
          </article>

        </div>

      </section>


      {/* =====================================================
          HOW TO BOOK
      ===================================================== */}

      <section className="pd-white-section">

        <div className="pd-section-heading">
          <p className="pd-eyebrow pd-dark">HOW TO BOOK</p>
          <h2>How to Book a Private Driver in Colombo</h2>
        </div>

        <ol className="pdc-steps">

          <li>
            <span className="pdc-step-number">1</span>
            <h3>Send Your Trip Details</h3>
            <p>
              Date, pickup time, pickup location, destination, number of
              passengers, luggage, vehicle preference and the number of
              hours or days required.
            </p>
          </li>

          <li>
            <span className="pdc-step-number">2</span>
            <h3>Receive Your Options</h3>
            <p>
              We&apos;ll review your requirements and provide the available
              driver and vehicle options.
            </p>
          </li>

          <li>
            <span className="pdc-step-number">3</span>
            <h3>Confirm Your Booking</h3>
            <p>
              Once you are happy with the arrangement and quotation,
              confirm your booking.
            </p>
          </li>

          <li>
            <span className="pdc-step-number">4</span>
            <h3>Meet Your Driver</h3>
            <p>
              Your driver will meet you at the agreed pickup location and
              provide the transportation arranged for your journey.
            </p>
          </li>

        </ol>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="pd-final-section pdc-final">

        <div className="pd-final-overlay" />

        <div className="pd-final-content">

          <p className="pd-eyebrow">PRIVATE DRIVER · COLOMBO</p>

          <h2>
            Request your private driver
            <br />
            <span>in Colombo.</span>
          </h2>

          <a href={SEARCH_ANCHOR} className="pdc-cta pdc-cta-light">
            Request Your Private Driver
          </a>

        </div>

      </section>

    </main>
  );
}
