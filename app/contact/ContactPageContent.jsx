import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import "./contact.css";

// Shared by /contact and /fr/contact — only the copy differs.

const WHATSAPP_URL = "https://wa.me/94772200565";
const EMAIL = "contact@voyagees.com";

const STRINGS = {
  en: {
    eyebrow: "CONTACT US",
    title: "Any Questions?",
    intro:
      "We're happy to help, whether you're still dreaming about Sri Lanka or already have your dates. Send us a message below, or reach us directly on WhatsApp.",
    whatsappTitle: "Chat on WhatsApp",
    whatsappBody: "The fastest way to reach us. Send a message any time.",
    whatsappButton: "Open WhatsApp",
    emailTitle: "Email us",
    emailBody: "Prefer your own inbox? Write to us directly.",
    replyTitle: "When we'll reply",
    replyBody: "We usually answer within 24 hours, often much sooner.",
    shortcutsTitle: "Looking to book?",
    shortcuts: [
      { href: "/airport-transfer", label: "Airport transfer" },
      { href: "/private-driver", label: "Private driver" },
      { href: "/plan-trip", label: "Plan a private tour" },
    ],
  },
  fr: {
    eyebrow: "CONTACTEZ-NOUS",
    title: "Une question ?",
    intro:
      "Nous sommes là pour vous aider, que vous rêviez encore du Sri Lanka ou que vos dates soient déjà fixées. Envoyez-nous un message ci-dessous, ou contactez-nous directement sur WhatsApp.",
    whatsappTitle: "Discuter sur WhatsApp",
    whatsappBody: "Le moyen le plus rapide de nous joindre. Écrivez-nous à tout moment.",
    whatsappButton: "Ouvrir WhatsApp",
    emailTitle: "Écrivez-nous",
    emailBody: "Vous préférez votre messagerie ? Écrivez-nous directement.",
    replyTitle: "Délai de réponse",
    replyBody: "Nous répondons généralement sous 24 heures, souvent bien plus tôt.",
    shortcutsTitle: "Vous souhaitez réserver ?",
    shortcuts: [
      { href: "/fr/airport-transfer", label: "Transfert aéroport" },
      { href: "/fr/private-driver", label: "Chauffeur privé" },
      { href: "/fr/private-tour", label: "Circuit privé" },
    ],
  },
};

export default function ContactPageContent({ locale = "en" }) {
  const t = STRINGS[locale] || STRINGS.en;

  return (
    <main className="contact-page">

      <header className="contact-header">
        <p className="contact-eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </header>

      <div className="contact-layout">

        <ContactForm locale={locale} />

        <aside className="contact-aside">

          <div className="contact-option contact-whatsapp">
            <h2>{t.whatsappTitle}</h2>
            <p>{t.whatsappBody}</p>
            <a
              className="contact-whatsapp-button"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.whatsappButton} · +94 77 220 0565
            </a>
          </div>

          <div className="contact-option">
            <h2>{t.emailTitle}</h2>
            <p>{t.emailBody}</p>
            <a className="contact-email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>

          <div className="contact-option">
            <h2>{t.replyTitle}</h2>
            <p>{t.replyBody}</p>
          </div>

          <div className="contact-option">
            <h2>{t.shortcutsTitle}</h2>
            <ul className="contact-shortcuts">
              {t.shortcuts.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label} →</Link>
                </li>
              ))}
            </ul>
          </div>

        </aside>

      </div>

    </main>
  );
}
