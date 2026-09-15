import Link from "next/link";
import "./page.css";

export const metadata = {
  title: "Private Tour of Sri Lanka – Custom Itineraries With Qualified Drivers",
  description:
    "Explore Sri Lanka with a custom private tour built around your dates, interests and pace. Voyagees plans tailor-made itineraries with private transportation and local expertise.",
};

export default function PrivateTourPage() {
  return (
    <main className="private-tour-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="pt-hero">
        <div className="pt-hero-content">

          <p className="pt-eyebrow">
            CUSTOM ITINERARIES · SRI LANKA
          </p>

          <h1>
            Private Tour of Sri Lanka – Custom Itineraries With Qualified
            Drivers
          </h1>

          <p>
            Explore Sri Lanka with a private journey designed around your
            dates, interests, pace, and travel style. Voyagees creates
            tailor-made journeys with private transportation, carefully
            planned routes, local expertise, and personalized support from
            arrival to departure.
          </p>

          <p>
            Whether you are traveling as a couple, family, group of
            friends, or solo traveler, we build the experience around what
            you actually want to see and do.
          </p>

          <p className="pt-hero-prompt">
            Tell us what you want from your Sri Lanka trip and we&apos;ll
            create a personalized itinerary for you.
          </p>

          <Link href="/plan-trip" className="pt-cta">
            Plan Your Private Tour
          </Link>

          <p className="pt-hero-tagline">
            No fixed group schedule. No one-size-fits-all itinerary. Just
            Sri Lanka planned around you.
          </p>

        </div>
      </section>


      {/* =====================================================
          WHY A PRIVATE JOURNEY
      ===================================================== */}

      <section className="pt-white-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">WHY GO PRIVATE</p>
          <h2>Why Travelers Choose a Private Journey With Voyagees</h2>
        </div>

        <p className="pt-section-intro">
          A private journey gives you the freedom to experience Sri Lanka
          without being tied to a fixed group itinerary. Voyagees combines
          personalized itinerary planning, private transportation, and
          local destination knowledge to make your trip easier to plan and
          more enjoyable to experience.
        </p>

        <div className="pt-card-grid">

          <article className="pt-card">
            
            <h3>Your Itinerary Is Built Around You</h3>
            <p>
              Your trip starts with what you want to experience. Tell us
              whether you are interested in ancient heritage, wildlife,
              mountains, beaches, food, adventure, relaxation, or a
              combination of them. We then create a route that connects
              those priorities into a practical journey.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Your Vehicle Is Private</h3>
            <p>
              Travel with your own private vehicle rather than sharing
              transportation with a large tour group. Your driver follows
              the agreed itinerary and connects your accommodation,
              destinations, attractions, activities, and transfers
              throughout the journey.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Your Pace Is Flexible</h3>
            <p>
              A private itinerary gives your travel party greater control
              over how you spend each day. You can prioritize the places
              that matter most instead of following a predetermined
              sightseeing schedule.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Your Trip Has Local Expertise Behind It</h3>
            <p>
              Voyagees uses knowledge of Sri Lankan destinations, routes,
              accommodation, attractions, and experiences to turn your
              preferences into a workable itinerary. The result: less time
              figuring out logistics and more time experiencing Sri Lanka.
            </p>
          </article>

        </div>

        <div className="pt-cta-row">
          <Link href="/plan-trip" className="pt-cta">
            Start Planning My Trip
          </Link>
        </div>

      </section>


      {/* =====================================================
          WHAT YOUR JOURNEY CAN INCLUDE
      ===================================================== */}

      <section className="pt-cream-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">TRIP THEMES</p>
          <h2>What Your Tailor-Made Sri Lanka Journey Can Include</h2>
        </div>

        <p className="pt-section-intro">
          Your itinerary can combine the parts of Sri Lanka that interest
          you most. Voyagees connects destinations and experiences into one
          coordinated private journey rather than asking you to organize
          each component separately.
        </p>

        <div className="pt-card-grid pt-card-grid-3col">

          <article className="pt-card">
            
            <h3>Culture &amp; Heritage</h3>
            <p>
              Discover destinations such as Sigiriya, Dambulla and Kandy,
              including ancient sites, temples, historic landmarks and
              local cultural experiences.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Mountains &amp; Tea Country</h3>
            <p>
              Travel through the central highlands toward Nuwara Eliya and
              Ella, with opportunities for tea plantations, mountain
              scenery, hiking and scenic rail journeys.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Wildlife &amp; Safaris</h3>
            <p>
              Include a safari at destinations such as Yala National Park
              or Udawalawe National Park as part of a wider island
              itinerary.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Beaches &amp; Southern Coast</h3>
            <p>
              Finish your journey along the southern coast with
              destinations such as Galle and Mirissa, combining heritage,
              beaches, coastal experiences and relaxation.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Food &amp; Local Experiences</h3>
            <p>
              Build food, markets, village experiences and other local
              activities into the itinerary according to your interests.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Luxury &amp; Relaxation</h3>
            <p>
              Choose premium hotels, boutique properties, resorts and a
              slower travel pace when comfort and relaxation are the
              priority.
            </p>
          </article>

        </div>

        <div className="pt-cta-row">
          <Link href="/plan-trip" className="pt-cta">
            Build My Itinerary
          </Link>
        </div>

      </section>


      {/* =====================================================
          TRAVEL STYLES
      ===================================================== */}

      <section className="pt-white-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">TRAVEL STYLES</p>
          <h2>Choose the Trip That Fits Your Travel Style</h2>
        </div>

        <p className="pt-section-intro">
          Voyagees designs private journeys for travelers who want more
          control over their Sri Lankan experience. Your group size,
          interests and expectations determine how we structure the route.
        </p>

        <div className="pt-card-grid">

          <article className="pt-card">
            
            <h3>Couples</h3>
            <p>
              Create a more personal journey combining boutique stays,
              scenic locations, wildlife, beaches, cultural experiences and
              time to relax.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Families</h3>
            <p>
              Keep transportation private and the itinerary flexible, with
              a route designed around family-friendly activities,
              comfortable travel times and your preferred accommodation.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Friends &amp; Small Groups</h3>
            <p>
              Travel together in a dedicated vehicle while building an
              itinerary around shared interests such as wildlife, hiking,
              culture, food and beaches.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Luxury Travelers</h3>
            <p>
              Combine premium accommodation, private transportation,
              carefully selected experiences and a more relaxed itinerary.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Adventure Travelers</h3>
            <p>
              Connect hiking, wildlife, nature, scenic landscapes and
              outdoor experiences into a journey built around exploration.
            </p>
          </article>

        </div>

      </section>


      {/* =====================================================
          POPULAR WAYS TO EXPLORE
      ===================================================== */}

      <section className="pt-cream-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">STARTING POINTS</p>
          <h2>Popular Ways to Explore Sri Lanka</h2>
        </div>

        <p className="pt-section-intro">
          Not sure where to start? These are proven itinerary directions
          that Voyagees can customize around your travel dates and
          interests.
        </p>

        <div className="pt-idea-grid">

          <Link href="/plan-trip" className="pt-idea-card">
            <h3>Cultural Triangle + Kandy + Ella</h3>
            <p>
              Experience ancient heritage before continuing through Kandy
              and the central highlands toward Ella.
            </p>
            <span className="pt-idea-link">Plan this route →</span>
          </Link>

          <Link href="/plan-trip" className="pt-idea-card">
            <h3>Culture + Wildlife + Beach</h3>
            <p>
              Combine cultural landmarks with a national-park safari before
              finishing on Sri Lanka&apos;s southern coastline.
            </p>
            <span className="pt-idea-link">Plan this route →</span>
          </Link>

          <Link href="/plan-trip" className="pt-idea-card">
            <h3>Hill Country + Wildlife + Coast</h3>
            <p>
              Explore the mountains and tea country, experience Sri Lankan
              wildlife, then slow down beside the ocean.
            </p>
            <span className="pt-idea-link">Plan this route →</span>
          </Link>

          <Link href="/plan-trip" className="pt-idea-card">
            <h3>Complete Island Experience</h3>
            <p>
              For longer holidays, combine heritage, Kandy, tea country,
              Ella, wildlife, Galle and the beaches into a more
              comprehensive journey.
            </p>
            <span className="pt-idea-link">Plan this route →</span>
          </Link>

        </div>

        <p className="pt-section-intro" style={{ marginTop: "1.25rem", marginBottom: 0 }}>
          These are starting points, not fixed packages. We adapt the route
          to your dates, interests, accommodation preferences and budget.
        </p>

        <div className="pt-cta-row">
          <Link href="/plan-trip" className="pt-cta">
            Ask Voyagees to Design My Route
          </Link>
        </div>

      </section>


      {/* =====================================================
          WHAT'S INCLUDED
      ===================================================== */}

      <section className="pt-white-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">WHAT&apos;S INCLUDED</p>
          <h2>What&apos;s Included in Your Private Travel Experience?</h2>
        </div>

        <div className="pt-text-content">
          <p>
            Your final inclusions are defined in your personalized
            quotation, based on the itinerary and services you select.
            Voyagees coordinates the key elements of your journey so you
            know what has been arranged before you travel.
          </p>
          <p>Private travel arrangements can include:</p>
        </div>

        <ul className="pt-checklist">
          <li>Private vehicle and transportation</li>
          <li>Professional driver or driver-guide</li>
          <li>Airport pickup and drop-off</li>
          <li>Hotel accommodation</li>
          <li>Sightseeing arrangements</li>
          <li>Wildlife safari experiences</li>
          <li>Attraction and entrance fees</li>
          <li>Selected meals</li>
          <li>Route and itinerary planning</li>
          <li>Travel support during your journey</li>
        </ul>

        <div className="pt-text-content" style={{ marginTop: "1.25rem" }}>
          <p>
            Your quotation clearly identifies what is included and what is
            not, so there are no assumptions about the services
            you&apos;ve selected.
          </p>
        </div>

      </section>


      {/* =====================================================
          COST
      ===================================================== */}

      <section className="pt-cream-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">PRICING</p>
          <h2>How Much Does Your Trip Cost?</h2>
        </div>

        <p className="pt-section-intro">
          The price of a private journey is based on your actual
          itinerary, not a generic per-person package. Duration, number of
          travelers, accommodation category, vehicle requirements,
          destinations, activities and inclusions all affect the final
          quotation.
        </p>

        <div className="pt-card-grid">

          <article className="pt-card">
            
            <h3>Your Trip Length</h3>
            <p>
              A five-day journey requires a different route and service
              level from a ten- or fourteen-day itinerary.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Your Group Size</h3>
            <p>
              The number of travelers determines the appropriate private
              vehicle and accommodation requirements.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Your Accommodation</h3>
            <p>
              Choose from budget, mid-range, boutique or luxury properties
              according to your preferred level of comfort.
            </p>
          </article>

          <article className="pt-card">
            
            <h3>Your Experiences</h3>
            <p>
              Safaris, attractions, special activities and other
              experiences contribute to the overall trip cost.
            </p>
          </article>

        </div>

        <div className="pt-cta-row">
          <p style={{ color: "var(--sage)", marginBottom: "1.25rem" }}>
            Want an exact price for your trip? Send us your dates, number
            of travelers and preferred travel style. Voyagees will create a
            quotation based on your requirements.
          </p>
          <Link href="/plan-trip" className="pt-cta">
            Get My Personalized Quote
          </Link>
        </div>

      </section>


      {/* =====================================================
          WHY VOYAGEES
      ===================================================== */}

      <section className="pt-dark-section">

        <div className="pt-section-heading pt-light">
          <p className="pt-eyebrow">WHY VOYAGEES</p>
          <h2>Why Book Your Journey With Voyagees?</h2>
        </div>

        <p className="pt-section-intro">
          Choosing a local travel partner is about more than arranging
          transportation. You need an itinerary that works, a reliable
          travel arrangement, and someone who understands the destination.
          Voyagees brings those elements together through:
        </p>

        <ul className="pt-value-list">
          <li>
            <strong>Personalized planning</strong> - Your itinerary starts
            with your requirements rather than a standard schedule.
          </li>
          <li>
            <strong>Private transportation</strong> - Your journey uses
            dedicated transportation for your travel party.
          </li>
          <li>
            <strong>Local destination knowledge</strong> - Routes are
            designed around Sri Lanka&apos;s destinations, travel times and
            experiences.
          </li>
          <li>
            <strong>Flexible travel</strong> - Your journey is structured
            around your priorities instead of a large group&apos;s
            schedule.
          </li>
          <li>
            <strong>One coordinated experience</strong> - Transportation,
            accommodation, activities and itinerary planning work together
            as one trip.
          </li>
          <li>
            <strong>Direct communication</strong> - You discuss your
            requirements with the team planning your journey.
          </li>
        </ul>

      </section>


      {/* =====================================================
          HOW EASY IS IT TO BOOK
      ===================================================== */}

      <section className="pt-white-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">HOW IT WORKS</p>
          <h2>How Easy Is It to Book?</h2>
        </div>

        <p className="pt-section-intro">
          Planning your private journey with Voyagees starts with a simple
          conversation.
        </p>

        <div className="pt-steps-grid">

          <div className="pt-step">
            <span className="pt-step-number">1</span>
            <h3>Tell Us About Your Trip</h3>
            <p>
              Send us your travel dates, number of travelers, interests,
              preferred destinations, accommodation style and approximate
              budget.
            </p>
          </div>

          <div className="pt-step">
            <span className="pt-step-number">2</span>
            <h3>We Design Your Route</h3>
            <p>
              Voyagees turns your requirements into a practical itinerary
              connecting the destinations and experiences you want.
            </p>
          </div>

          <div className="pt-step">
            <span className="pt-step-number">3</span>
            <h3>Refine the Details</h3>
            <p>
              Adjust the destinations, hotels, activities, duration or
              travel style until the itinerary matches your expectations.
            </p>
          </div>

          <div className="pt-step">
            <span className="pt-step-number">4</span>
            <h3>Confirm Your Journey</h3>
            <p>
              Once you&apos;re happy with the itinerary and quotation,
              confirm the agreed travel arrangements with Voyagees.
            </p>
          </div>

          <div className="pt-step">
            <span className="pt-step-number">5</span>
            <h3>Arrive in Sri Lanka</h3>
            <p>
              Your planned transportation, accommodation and itinerary are
              ready for your journey.
            </p>
          </div>

        </div>

        <div className="pt-cta-row">
          <p style={{ color: "var(--sage)", marginBottom: "1.25rem" }}>
            You don&apos;t need to know exactly where to go before
            contacting us. Tell us what kind of holiday you want, and
            we&apos;ll help turn it into a route.
          </p>
          <Link href="/plan-trip" className="pt-cta">
            Plan My Sri Lanka Journey
          </Link>
        </div>

      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="pt-cream-section">

        <div className="pt-section-heading">
          <p className="pt-eyebrow pt-dark">FREQUENTLY ASKED QUESTIONS</p>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="pt-faq-list">

          <details>
            <summary>What is a private tour in Sri Lanka?</summary>
            <p>
              A private tour gives your own travel party a dedicated
              itinerary and private transportation instead of joining a
              larger group. Voyagees builds the journey around your
              destinations, interests, schedule and preferred travel
              style.
            </p>
          </details>

          <details>
            <summary>How much does a private tour in Sri Lanka cost?</summary>
            <p>
              The price depends on the duration, number of travelers,
              accommodation, vehicle, destinations, activities and
              inclusions you choose. Voyagees provides a personalized
              quotation based on your actual requirements.
            </p>
          </details>

          <details>
            <summary>
              How many days do you need for a Sri Lanka private tour?
            </summary>
            <p>
              Seven to ten days provides enough time to combine several
              major regions, while fourteen days allows a more
              comprehensive and relaxed journey. Voyagees also creates
              shorter focused itineraries for travelers with limited time.
            </p>
          </details>

          <details>
            <summary>Can I customize a private Sri Lanka tour?</summary>
            <p>
              Yes. You can customize destinations, duration, accommodation,
              activities, transportation and travel pace. Voyagees uses
              your preferences to create the itinerary rather than placing
              you into a fixed route.
            </p>
          </details>

          <details>
            <summary>What is included in a private Sri Lanka tour?</summary>
            <p>
              Your quotation specifies the exact inclusions. Depending on
              your selected arrangement, these can include private
              transportation, driver services, accommodation, airport
              transfers, sightseeing, activities, entrance fees and safari
              experiences.
            </p>
          </details>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="pt-final-section">

        <div className="pt-final-content">

          <p className="pt-eyebrow">READY WHEN YOU ARE</p>

          <h2>Ready to Plan Sri Lanka Your Way?</h2>

          <p>
            Your Sri Lanka trip does not need to follow someone else&apos;s
            schedule. Choose the places you want to see, the experiences
            you want to have, the comfort level you prefer, and the amount
            of time you have — then let Voyagees turn those choices into a
            practical private itinerary.
          </p>

          <p>
            Tell us your travel dates, group size and what you want to
            experience. We&apos;ll take it from there.
          </p>

          <Link href="/plan-trip" className="pt-cta">
            Request Your Personalized Sri Lanka Itinerary →
          </Link>

          <p className="pt-final-note">
            Prefer to start with some inspiration?{" "}
            <Link href="/explore-sri-lanka">
              Explore our Sri Lanka tour packages
            </Link>{" "}
            and then tell us which experiences you want to make your own.
          </p>

        </div>

      </section>

    </main>
  );
}
