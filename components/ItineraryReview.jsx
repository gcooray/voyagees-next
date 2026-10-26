"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import "./PlanTrip.css";
import "./ItineraryReview.css";

// "Improve my itinerary": the traveller pastes the plan they made themselves
// and gets day-by-day feedback (what works, what is too full, how to fix it)
// from /api/review-itinerary.

const WHATSAPP_URL = "https://wa.me/94761128692";

const T = {
  en: {
    title: "Improve my itinerary",
    intro:
      "Already planned your Sri Lanka trip? Paste it below and get free, day-by-day feedback: realistic drive times, days that are too full, the best time of day for each visit, and answers to your questions.",
    switchToPlan: "Prefer to start from scratch? Plan a new trip",
    planLabel: "Your itinerary",
    planPlaceholder:
      "Paste your plan, one line per day, for example:\nDay 1: arrive Colombo, night in Negombo\nDay 2: Sigiriya, Lion Rock?\nDay 3: Dambulla then Kandy\n…\nAdd a \"?\" anywhere you're unsure and we'll answer it.",
    startDate: "Trip start date (optional)",
    travellers: "Travellers (optional)",
    travellersPlaceholder: "e.g. 2 adults, 1 child of 8",
    submit: "Review my itinerary",
    submitting: "Reviewing your itinerary…",
    errShort: "Please paste a bit more of your itinerary so we can review it.",
    errLong: "Your itinerary is very long. Please shorten it a little (8,000 characters maximum).",
    errLimit: "You've reached the limit of 5 reviews per hour. Please try again later, or message us on WhatsApp and we'll review it with you.",
    errFailed: "Sorry, we couldn't review your itinerary just now. Please try again in a moment.",
    verdicts: { realistic: "Realistic plan", a_bit_full: "A little full", too_rushed: "Too rushed as it is" },
    status: { ok: "Looks good", adjust: "Small change", rethink: "Rethink this day" },
    suggestion: "Our suggestion:",
    tips: "Good to know for your trip",
    nextTitle: "Next steps",
    nextText: "Happy with the changes? Find a private driver for your dates, or message us and we'll fine-tune it with you.",
    findDriver: "Find a driver",
    whatsapp: "Ask us on WhatsApp",
    again: "Review another itinerary",
    disclaimer: "This review is generated automatically from our drivers' experience. Times are approximate; check opening hours and train schedules before you travel.",
  },
  fr: {
    title: "Améliorer mon itinéraire",
    intro:
      "Vous avez déjà préparé votre voyage au Sri Lanka ? Collez votre itinéraire ci-dessous et recevez gratuitement un avis jour par jour : temps de route réalistes, journées trop chargées, meilleur moment pour chaque visite, et réponses à vos questions.",
    switchToPlan: "Vous préférez partir de zéro ? Créer un nouvel itinéraire",
    planLabel: "Votre itinéraire",
    planPlaceholder:
      "Collez votre programme, une ligne par jour, par exemple :\nJour 1 : arrivée à Colombo, nuit à Negombo\nJour 2 : Sigiriya, Lion Rock ?\nJour 3 : Dambulla puis Kandy\n…\nAjoutez un « ? » là où vous hésitez, on vous répondra.",
    startDate: "Date de début du voyage (facultatif)",
    travellers: "Voyageurs (facultatif)",
    travellersPlaceholder: "ex. 2 adultes, 1 enfant de 8 ans",
    submit: "Analyser mon itinéraire",
    submitting: "Analyse de votre itinéraire…",
    errShort: "Collez un peu plus de votre itinéraire pour que nous puissions l'analyser.",
    errLong: "Votre itinéraire est très long. Raccourcissez-le un peu (8 000 caractères maximum).",
    errLimit: "Vous avez atteint la limite de 5 analyses par heure. Réessayez un peu plus tard, ou écrivez-nous sur WhatsApp et nous l'analyserons avec vous.",
    errFailed: "Désolé, nous n'avons pas pu analyser votre itinéraire pour le moment. Réessayez dans un instant.",
    verdicts: { realistic: "Itinéraire réaliste", a_bit_full: "Un peu chargé", too_rushed: "Trop chargé en l'état" },
    status: { ok: "Très bien", adjust: "Petit ajustement", rethink: "À revoir" },
    suggestion: "Notre conseil :",
    tips: "Bon à savoir pour votre voyage",
    nextTitle: "Et maintenant ?",
    nextText: "Les changements vous conviennent ? Trouvez un chauffeur privé pour vos dates, ou écrivez-nous et nous l'ajusterons avec vous.",
    findDriver: "Trouver un chauffeur",
    whatsapp: "Nous écrire sur WhatsApp",
    again: "Analyser un autre itinéraire",
    disclaimer: "Cet avis est généré automatiquement à partir de l'expérience de nos chauffeurs. Les durées sont approximatives ; vérifiez les horaires d'ouverture et des trains avant de partir.",
  },
};

const ERRORS = { PLAN_TOO_SHORT: "errShort", PLAN_TOO_LONG: "errLong", RATE_LIMITED: "errLimit" };

export default function ItineraryReview({ locale = "en" }) {
  const t = T[locale] || T.en;
  const prefix = locale === "fr" ? "/fr" : "";
  const [plan, setPlan] = useState("");
  const [startDate, setStartDate] = useState("");
  const [travellers, setTravellers] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [review, setReview] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (plan.trim().length < 40) return setError(t.errShort);
    setSubmitting(true);
    try {
      const res = await fetch("/api/review-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, startDate, travellers, locale }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "FAILED");
      setReview(data);
      trackEvent("review_itinerary", { locale, days: data.days?.length || 0, verdict: data.verdict });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(t[ERRORS[err.message]] || t.errFailed);
    } finally {
      setSubmitting(false);
    }
  }

  if (review) {
    return (
      <main className="plan-trip-page">
        <h1>{t.title}</h1>
        <div className={`review-verdict review-verdict-${review.verdict}`}>
          <strong>{t.verdicts[review.verdict] || ""}</strong>
          <p>{review.summary}</p>
        </div>

        <ol className="review-days">
          {review.days.map((day, i) => (
            <li key={`${day.label}-${i}`} className={`review-day review-${day.status}`}>
              <div className="review-day-head">
                <span className="review-day-label">{day.label}</span>
                <span className="review-badge">{t.status[day.status] || day.status}</span>
              </div>
              <p className="review-day-plan">{day.plan}</p>
              <p>{day.comment}</p>
              {day.suggestion && (
                <p className="review-suggestion">
                  <strong>{t.suggestion}</strong> {day.suggestion}
                </p>
              )}
            </li>
          ))}
        </ol>

        {review.generalTips?.length > 0 && (
          <section className="review-tips">
            <h2>{t.tips}</h2>
            <ul>
              {review.generalTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="review-next">
          <h2>{t.nextTitle}</h2>
          <p>{t.nextText}</p>
          <div className="review-next-buttons">
            <Link href={`${prefix}/search`} className="review-btn review-btn-primary">{t.findDriver}</Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="review-btn review-btn-wa">{t.whatsapp}</a>
            <button type="button" className="review-btn review-btn-ghost" onClick={() => setReview(null)}>{t.again}</button>
          </div>
        </section>

        <p className="review-disclaimer">{t.disclaimer}</p>
      </main>
    );
  }

  return (
    <main className="plan-trip-page">
      <h1>{t.title}</h1>
      <p className="plan-trip-intro">{t.intro}</p>
      <p className="review-switch">
        <Link href={`${prefix}/plan-trip`}>{t.switchToPlan} →</Link>
      </p>

      <form className="plan-trip-form" onSubmit={handleSubmit}>
        <label>
          {t.planLabel}
          <textarea
            className="review-textarea"
            rows={12}
            maxLength={8000}
            placeholder={t.planPlaceholder}
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            required
          />
        </label>
        <div className="plan-trip-row">
          <label>
            {t.startDate}
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label>
            {t.travellers}
            <input type="text" maxLength={40} placeholder={t.travellersPlaceholder} value={travellers} onChange={(e) => setTravellers(e.target.value)} />
          </label>
        </div>

        {error && <p className="plan-trip-error">{error}</p>}

        <button type="submit" className="plan-trip-submit" disabled={submitting} aria-busy={submitting}>
          {submitting && <span className="btn-spinner" aria-hidden="true" />}
          {submitting ? t.submitting : t.submit}
        </button>
      </form>
    </main>
  );
}
