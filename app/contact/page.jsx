import "./contact.css";

export const metadata = {
  title: "Contact voyaGees | Get in Touch for Tours in Sri Lanka",
  description:
    "Have questions or need help planning your Sri Lanka tour? Contact voyaGees for support with bookings, private drivers, and travel inquiries.",
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <h1>Any Questions?</h1>

      <p>
        We&apos;re happy to help. Send us a message and we’ll get back to you as soon as possible.
      </p>

      <div className="contact-details">
        <p>
          Email:{" "}
          <a href="mailto:contact@voyagees.com">
            contact@voyagees.com
          </a>
        </p>

        <p>
          WhatsApp:{" "}
          <a
            className="whatsapp"
            href="https://wa.me/94772200565"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat with us on WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
