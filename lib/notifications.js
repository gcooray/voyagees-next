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

import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_GENERIC;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

function send(toEmail, userName, message, requestId) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      user_name: userName,
      user_email: toEmail,
      to_email: toEmail,
      message,
      request_id: requestId,
    },
    EMAILJS_PUBLIC_KEY
  );
}

/** Notify the organizer that a new traveler has requested to join their trip. */
export function notifyOrganizerNewRequest(trip, tripId, request) {
  const message = `${request.travelerName} wants to join your ${trip.from} → ${trip.to} trip on ${trip.date}. Review the request: ${window.location.origin}/rides/${tripId}/manage`;
  return send(trip.organizerEmail, trip.organizerName, message, request.id);
}

/** Notify the traveler that their request was accepted or declined. */
export function notifyTravelerDecision(trip, tripId, request, decision) {
  const message =
    decision === "accepted"
      ? `Good news — ${trip.organizerName} accepted your request to join the ${trip.from} → ${trip.to} trip on ${trip.date}. You're confirmed for a seat — see ${trip.organizerName}'s contact info here: ${window.location.origin}/rides/${tripId}`
      : `${trip.organizerName} wasn't able to accept your request to join the ${trip.from} → ${trip.to} trip on ${trip.date}.`;
  return send(request.travelerEmail, request.travelerName, message, request.id);
}
