import Link from "next/link";
import { withSeo } from "@/lib/seo";
import "./page.css";

export const metadata = withSeo(
  "/become-a-driver",
  {
    title: "Become a Voyagees driver in Sri Lanka",
    description:
      "Are you a licensed driver with an insured vehicle in Sri Lanka? Join Voyagees and drive travellers from France, Europe and beyond around the island.",
  },
  { translated: false }
);

const REASONS = [
  {
    title: "Travellers looking for a driver",
    text: "People come to Voyagees because they want a private driver for their trip, many of them from France and other French-speaking countries.",
  },
  {
    title: "You propose your own rate",
    text: "You set your day price and the kilometres included. We check it with you, and Voyagees adds its service fee for the traveller.",
  },
  {
    title: "Better-planned trips",
    text: "Travellers plan realistic routes on our site before they book, and we stay in touch with you and with them during the trip.",
  },
];

const REQUIREMENTS = [
  "A valid Sri Lankan driving licence",
  "An insured vehicle with a current revenue licence",
  "A clean vehicle in good condition",
  "A smartphone with WhatsApp",
  "English with travellers; French or another language is a big plus",
  "A chauffeur-guide licence (SLTDA) is welcome, but not required",
];

const STEPS = [
  ["Register", "Enter your email address and open the link we send you. No password needed."],
  ["Fill in your profile", "Your vehicle, your languages, your prices, a few photos and your documents."],
  ["We check and call you", "We review your documents and contact you on WhatsApp to get to know you."],
  ["Your profile goes live", "Once approved, travellers can see your profile and book you through Voyagees."],
];

export default function BecomeADriverPage() {
  return (
    <main className="bd-page">
      <section className="bd-hero">
        <p className="bd-eyebrow">Drive with Voyagees</p>
        <h1>Drive travellers around Sri Lanka</h1>
        <p className="bd-lead">
          Voyagees connects independent, licensed drivers with travellers who want a private driver for their trip.
          If you know the island&apos;s roads and enjoy showing it to visitors, we&apos;d love to hear from you.
        </p>
        <Link href="/driver/dashboard" className="bd-btn">
          Register as a driver
        </Link>
      </section>

      <section className="bd-section">
        <h2>Why drive with us</h2>
        <div className="bd-cards">
          {REASONS.map((r) => (
            <article key={r.title} className="bd-card">
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bd-section bd-two">
        <div>
          <h2>What you need</h2>
          <ul className="bd-list">
            {REQUIREMENTS.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>How it works</h2>
          <ol className="bd-steps">
            {STEPS.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bd-cta">
        <h2>Ready to join?</h2>
        <p>
          It takes about 15 minutes. Have your licence, insurance and revenue licence ready, plus a few photos of your
          vehicle. Questions? Message us on WhatsApp at{" "}
          <a href="https://wa.me/94761128692" target="_blank" rel="noopener noreferrer">
            +94 76 112 8692
          </a>
          .
        </p>
        <Link href="/driver/dashboard" className="bd-btn">
          Register as a driver
        </Link>
      </section>
    </main>
  );
}
