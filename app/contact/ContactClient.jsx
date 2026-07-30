"use client";

import "./contact.css";

export default function ContactClient() {
  return (
    <div className="contact-page">
      <h1>Any Questions?</h1>

      <p>
        We're happy to help. Send us a message and we’ll get back to you as soon as possible.
      </p>

      <div className="contact-details">
        <p>
          📧 Email:{" "}
          <a href="mailto:contact@voyagees.com">
            contact@voyagees.com
          </a>
        </p>

        <p>
          💬 WhatsApp:{" "}
          <a
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