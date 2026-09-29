// lib/notifications.js
//
// Client-triggered email notifications for the trip-sharing feature, sent via
// the same EmailJS service already used in app/request/RequestForm.jsx, but
// its own generic template (template_st4zzbt) — NOT template_c3d2ptc, whose
// body is hardcoded copy for the private-driver booking flow ("your request
// will be answered within 24hrs...") and doesn't fit these notifications.
// There's no backend for this — a notification only goes out if the browser
// that took the action (requesting, accepting, declining) is still online
// when the emailjs.send() call fires.
//
// The template's Subject field in the EmailJS dashboard must be set to the
// literal placeholder `{{subject}}` for the subject argument below to have
// any effect — it was previously hardcoded to fixed text ("Your Trip with
// voyaGees has been Confirmed"), which only fit one of these four
// notification types and was wrong/misleading for the rest.

import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_GENERIC;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// `extra` carries optional template params, e.g. reply_to — only has an
// effect if the template's Reply-To field is set to {{reply_to}}.
function send(toEmail, userName, message, requestId, subject, extra = {}) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      user_name: userName,
      user_email: toEmail,
      to_email: toEmail,
      message,
      request_id: requestId,
      subject,
      ...extra,
    },
    EMAILJS_PUBLIC_KEY
  );
}

/** Notify the organizer that a new traveler has requested to join their trip. */
export function notifyOrganizerNewRequest(trip, tripId, request) {
  const message = `${request.travelerName} wants to join your ${trip.from} → ${trip.to} trip on ${trip.date}. Review the request: ${window.location.origin}/rides/${tripId}/manage`;
  return send(
    trip.organizerEmail,
    trip.organizerName,
    message,
    request.id,
    `New request to join your ${trip.from} → ${trip.to} trip`
  );
}

/** Notify the traveler that their request was accepted or declined. */
export function notifyTravelerDecision(trip, tripId, request, decision) {
  const message =
    decision === "accepted"
      ? `Good news — ${trip.organizerName} accepted your request to join the ${trip.from} → ${trip.to} trip on ${trip.date}. You're confirmed for a seat — see ${trip.organizerName}'s contact info here: ${window.location.origin}/rides/${tripId}`
      : `${trip.organizerName} wasn't able to accept your request to join the ${trip.from} → ${trip.to} trip on ${trip.date}.`;
  return send(
    request.travelerEmail,
    request.travelerName,
    message,
    request.id,
    decision === "accepted" ? "You're confirmed for your trip!" : "Update on your trip request"
  );
}

// Formats the full day-by-day itinerary (activities, stays, dates) into
// readable plain text — built specifically so the admin can read the whole
// trip directly in the email instead of digging through Firestore's console,
// where a nested itinerary object is hard to scan.
function formatItineraryDetails(itinerary) {
  const days = itinerary.days || [];

  const dayLines = days
    .map((day) => {
      const activities = (day.activities || []).map((a) => `   • ${a}`).join("\n");
      const stay = day.stay
        ? `   🏨 Stay: ${day.stay.name} — ${day.stay.price}`
        : "   🏨 No overnight stay (departure day)";
      return `${day.label} — ${day.date} — ${day.title}\n${activities}\n${stay}`;
    })
    .join("\n\n");

  const accommodation = itinerary.accommodationEstimate
    ? `$${itinerary.accommodationEstimate.min}–$${itinerary.accommodationEstimate.max}`
    : "N/A";

  return `🗺️ ${itinerary.title}
Route: ${itinerary.routeSummary}
Driver price from: ${itinerary.driverPriceFrom ?? "N/A"}
Accommodation estimate: ${accommodation}

${dayLines}`;
}

/** Confirm to the customer that their "include hotels too" itinerary lead was received. */
export function notifyItineraryHotelsCustomer(contact, itinerary, leadId, locale = "en") {
  if (locale === "fr") {
    const message = `Nous avons bien reçu votre demande d'ajout d'hôtels à votre itinéraire « ${itinerary.title} » (${itinerary.routeSummary}). Notre équipe vous enverra des propositions d'hôtels sous 24 heures.`;
    return send(contact.email, contact.name, message, leadId, "Votre demande d'itinéraire voyaGees a bien été reçue");
  }
  const message = `We received your request to add hotel options to your "${itinerary.title}" itinerary (${itinerary.routeSummary}). Our team will follow up within 24 hours with hotel options for your trip.`;
  return send(contact.email, contact.name, message, leadId, "Your voyaGees itinerary request has been received");
}

/** Notify the admin inbox that a new itinerary-plus-hotels lead came in, with the full trip details inline. */
export function notifyItineraryHotelsAdmin(contact, itinerary, leadId) {
  const message = `New itinerary + hotels request from ${contact.name} (${contact.email}, ${contact.phone}):\n\n${formatItineraryDetails(itinerary)}`;
  return send("contact@voyagees.com", "voyaGees Admin", message, leadId, `New hotels lead: ${itinerary.title}`);
}

// Not RequestForm.jsx's customer confirmation — that stays on template_c3d2ptc,
// whose dashboard body has its own established wording for that email. This
// is only the admin side, moved to the generic template because
// template_c3d2ptc's hardcoded body doesn't render the `description` field
// it was being passed — the admin was receiving the email but never actually
// seeing the trip details baked into that unused param.
/** Notify the admin inbox that a new driver booking request came in, with the full trip details inline. */
export function notifyDriverBookingAdmin(contact, tripDetailsText, requestId, subject) {
  const message = `New driver booking request from ${contact.name} (${contact.email}, ${contact.phone})\nRequest ID: ${requestId}\n\n${tripDetailsText}`;
  return send("contact@voyagees.com", "voyaGees Admin", message, requestId, subject || "New driver booking request");
}

/** Confirm to the customer that their airport transfer request was received. */
export function notifyAirportTransferCustomer(contact, summary, requestId, locale = "en") {
  if (locale === "fr") {
    const message = `Nous avons bien reçu votre demande de transfert aéroport (${summary}). Notre équipe vous répondra sous 24 heures avec un devis et les coordonnées de votre chauffeur.`;
    return send(contact.email, contact.name, message, requestId, "Votre demande de transfert aéroport voyaGees a bien été reçue");
  }
  const message = `We received your airport transfer request (${summary}). Our team will get back to you within 24 hours with a quote and your driver's details.`;
  return send(contact.email, contact.name, message, requestId, "Your voyaGees airport transfer request has been received");
}

/** Notify the admin inbox that a new airport transfer request came in, with the full details inline. */
export function notifyAirportTransferAdmin(contact, detailsText, requestId, subject) {
  const message = `New airport transfer request from ${contact.name} (${contact.email}, ${contact.phone})\nRequest ID: ${requestId}\n\n${detailsText}`;
  return send("contact@voyagees.com", "voyaGees Admin", message, requestId, subject || "New airport transfer request");
}

/** Confirm to the visitor that their contact-page message was received. */
export function notifyContactCustomer(contact, requestId, locale = "en") {
  if (locale === "fr") {
    const message = "Merci pour votre message ! Notre équipe vous répondra dans les 24 heures. Pour une réponse plus rapide, vous pouvez aussi nous écrire sur WhatsApp au +94 77 220 0565.";
    return send(contact.email, contact.name, message, requestId, "Nous avons bien reçu votre message – voyaGees");
  }
  const message = "Thanks for your message! Our team will get back to you within 24 hours. For a faster reply, you can also message us on WhatsApp at +94 77 220 0565.";
  return send(contact.email, contact.name, message, requestId, "We've received your message – voyaGees");
}

/** Forward a contact-page message to the admin inbox, with a reply_to so "Reply" goes to the visitor. */
export function notifyContactAdmin(contact, detailsText, requestId, subject) {
  const message = `New message from the contact page\nRequest ID: ${requestId}\n\n${detailsText}`;
  return send("contact@voyagees.com", "voyaGees Admin", message, requestId, subject, {
    reply_to: contact.email,
  });
}
