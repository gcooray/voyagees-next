"use client";

import "../../contact/contact.css";

export default function ContactClient() {
  return (
    <div className="contact-page">
      <h1>Une question ?</h1>

      <p>
        Nous sommes là pour vous aider. Envoyez-nous un message et nous vous
        répondrons dans les plus brefs délais.
      </p>

      <div className="contact-details">
        <p>
          📧 E-mail :{" "}
          <a href="mailto:contact@voyagees.com">
            contact@voyagees.com
          </a>
        </p>

        <p>
          💬 WhatsApp :{" "}
          <a
            href="https://wa.me/94772200565"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discutez avec nous sur WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
