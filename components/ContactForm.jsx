"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { notifyContactCustomer, notifyContactAdmin } from "@/lib/notifications";
import "./ContactForm.css";

// Contact-page message form. Saved to bookingRequests (type "contact")
// alongside the other request types, then emailed to the admin inbox with
// the visitor's address as reply_to so a plain "Reply" reaches them.

// `value` is what the admin sees (always English); `label` is per locale.
const TOPICS = [
  { value: "Private driver", en: "Private driver", fr: "Chauffeur privé" },
  { value: "Airport transfer", en: "Airport transfer", fr: "Transfert aéroport" },
  { value: "Private tour", en: "Private tour / itinerary", fr: "Circuit privé / itinéraire" },
  { value: "Shared trips", en: "Shared trips", fr: "Trajets partagés" },
  { value: "Existing booking", en: "An existing booking", fr: "Une réservation existante" },
  { value: "Something else", en: "Something else", fr: "Autre chose" },
];

const STRINGS = {
  en: {
    title: "Send us a message",
    name: "Your name",
    email: "Email",
    phone: "Phone / WhatsApp",
    optional: "(optional)",
    topic: "What's it about?",
    selectTopic: "Choose a topic",
    message: "Your message",
    messagePlaceholder: "Tell us your dates, where you'd like to go, or ask us anything…",
    error: "Couldn't send your message. Please try again, or email us directly.",
    sending: "We're sending your message…",
    submit: "Send Message",
    footnote: "We usually reply within 24 hours.",
    sentEyebrow: "MESSAGE SENT",
    sentTitle: (name) => `Thanks, ${name}! Your message is on its way.`,
    sentBody: (email) => (
      <>
        We&apos;ll reply to <strong>{email}</strong> within 24 hours. Need an
        answer sooner? Message us on WhatsApp.
      </>
    ),
    sendAnother: "Send another message",
  },
  fr: {
    title: "Envoyez-nous un message",
    name: "Votre nom",
    email: "E-mail",
    phone: "Téléphone / WhatsApp",
    optional: "(facultatif)",
    topic: "À quel sujet ?",
    selectTopic: "Choisissez un sujet",
    message: "Votre message",
    messagePlaceholder: "Indiquez vos dates, où vous aimeriez aller, ou posez-nous votre question…",
    error: "Impossible d'envoyer votre message. Veuillez réessayer ou nous écrire directement.",
    sending: "Nous envoyons votre message…",
    submit: "Envoyer le message",
    footnote: "Nous répondons généralement sous 24 heures.",
    sentEyebrow: "MESSAGE ENVOYÉ",
    sentTitle: (name) => `Merci, ${name} ! Votre message est bien parti.`,
    sentBody: (email) => (
      <>
        Nous vous répondrons à <strong>{email}</strong> sous 24 heures. Besoin
        d&apos;une réponse plus rapide ? Écrivez-nous sur WhatsApp.
      </>
    ),
    sendAnother: "Envoyer un autre message",
  },
};

const emptyForm = { name: "", email: "", phone: "", topic: "", message: "" };

export default function ContactForm({ locale = "en" }) {
  const t = STRINGS[locale] || STRINGS.en;
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const contact = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };

    const details = `
👤 FROM
Name: ${contact.name}
Email: ${contact.email}
Phone: ${contact.phone || "Not provided"}
Site language: ${locale === "fr" ? "French" : "English"}

🏷️ TOPIC
${form.topic}

💬 MESSAGE
${form.message.trim()}
`.trim();

    try {
      const docRef = await addDoc(collection(db, "bookingRequests"), {
        type: "contact",
        customerName: contact.name,
        customerEmail: contact.email,
        customerPhone: contact.phone,
        topic: form.topic,
        message: form.message.trim(),
        locale,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      await notifyContactCustomer(contact, docRef.id, locale);
      await notifyContactAdmin(
        contact,
        details,
        docRef.id,
        `Contact form: ${form.topic} – ${contact.name}`
      );

      setStatus("sent");
    } catch (err) {
      console.error("Failed to send contact message:", err);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="cf-card cf-sent" role="status">
        <p className="cf-eyebrow">{t.sentEyebrow}</p>
        <h2>{t.sentTitle(form.name.trim().split(" ")[0])}</h2>
        <p>{t.sentBody(form.email.trim())}</p>
        <button
          type="button"
          className="cf-link-button"
          onClick={() => {
            setForm(emptyForm);
            setStatus("idle");
          }}
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form className="cf-card" onSubmit={handleSubmit}>
      <h2>{t.title}</h2>

      <div className="cf-grid">
        <label className="cf-field">
          <span>{t.name}</span>
          <input required value={form.name} onChange={set("name")} autoComplete="name" />
        </label>

        <label className="cf-field">
          <span>{t.email}</span>
          <input required type="email" value={form.email} onChange={set("email")} autoComplete="email" />
        </label>

        <label className="cf-field">
          <span>{t.phone} <em>{t.optional}</em></span>
          <input type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
        </label>

        <label className="cf-field">
          <span>{t.topic}</span>
          <select required value={form.topic} onChange={set("topic")}>
            <option value="" disabled>{t.selectTopic}</option>
            {TOPICS.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic[locale] || topic.en}
              </option>
            ))}
          </select>
        </label>

        <label className="cf-field cf-span-2">
          <span>{t.message}</span>
          <textarea
            required
            rows={6}
            value={form.message}
            onChange={set("message")}
            placeholder={t.messagePlaceholder}
          />
        </label>
      </div>

      {status === "error" && <p className="cf-error">{t.error}</p>}

      <button type="submit" className="cf-submit" disabled={submitting} aria-busy={submitting}>
        {submitting && <span className="btn-spinner" aria-hidden="true" />}
        {submitting ? t.sending : t.submit}
      </button>

      <p className="cf-small">{t.footnote}</p>
    </form>
  );
}
