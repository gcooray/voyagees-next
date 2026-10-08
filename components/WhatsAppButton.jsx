"use client";

import { usePathname } from "next/navigation";
import { trackWhatsAppClick } from "@/lib/analytics";
import "./WhatsAppButton.css";

// Floating "chat on WhatsApp" button on every public page — most travellers
// would rather message than fill in a form, and it's where Facebook visitors
// expect to reach a local driver service. Opens a chat with a prefilled
// message (in the page's language) that says which page they came from.

const WHATSAPP_NUMBER = "94772200565";

const STRINGS = {
  en: {
    label: "Chat on WhatsApp",
    message: "Hi Voyagees! I'm planning a trip to Sri Lanka and have a question.",
  },
  fr: {
    label: "Discuter sur WhatsApp",
    message: "Bonjour Voyagees ! Je prépare un voyage au Sri Lanka et j'ai une question.",
  },
};

export default function WhatsAppButton() {
  const pathname = usePathname() || "/";

  // not on the admin pages
  if (pathname.startsWith("/admin")) return null;

  const t = pathname === "/fr" || pathname.startsWith("/fr/") ? STRINGS.fr : STRINGS.en;
  const text = `${t.message}\n\n(voyagees.com${pathname === "/" ? "" : pathname})`;
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  return (
    <a
      className="wa-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.label}
      onClick={() => trackWhatsAppClick(pathname)}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16.04 3C9.4 3 4 8.36 4 14.97c0 2.11.56 4.17 1.62 5.99L4 29l8.27-2.16a12.1 12.1 0 0 0 3.77.6h.01c6.63 0 12.03-5.36 12.03-11.97C28.08 8.36 22.67 3 16.04 3Zm0 21.9h-.01a9.97 9.97 0 0 1-5.1-1.4l-.37-.22-4.9 1.28 1.31-4.77-.24-.39a9.86 9.86 0 0 1-1.53-5.33c0-5.48 4.5-9.94 10.04-9.94 2.68 0 5.2 1.04 7.1 2.92a9.85 9.85 0 0 1 2.94 7.03c0 5.48-4.5 9.82-10.24 9.82Zm5.5-7.4c-.3-.15-1.78-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.46-2.42-1.48a9.07 9.07 0 0 1-1.67-2.07c-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.72.22 1.37.19 1.88.12.57-.09 1.78-.72 2.03-1.42.25-.7.25-1.3.18-1.42-.07-.13-.27-.2-.57-.35Z"
        />
      </svg>
      <span className="wa-float-label">{t.label}</span>
    </a>
  );
}
