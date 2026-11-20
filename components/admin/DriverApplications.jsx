"use client";

import { useCallback, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  DOCUMENT_TYPES,
  approveApplication,
  documentUrl,
  requestChanges,
} from "@/lib/driverApplications";

// Driver profiles sent from /driver/dashboard, reviewed on /admin/drivers.
// Approving publishes (or updates) the driver's live profile.

const LABELS = {
  pending: "To review",
  needs_changes: "Changes requested",
  draft: "Not sent yet",
  approved: "Approved",
};
const ORDER = ["pending", "needs_changes", "draft", "approved"];

const formatDate = (ts) =>
  ts?.toDate ? ts.toDate().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

export default function DriverApplications({ onPublished }) {
  const [profiles, setProfiles] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "driverProfiles"));
      setProfiles(snap.docs.map((d) => ({ ...d.data(), id: d.id })));
    } catch (err) {
      setError(
        err?.code === "permission-denied"
          ? "Can't read driver applications yet: the new Firestore rules (driverProfiles) haven't been published."
          : `Couldn't load driver applications (${err?.code || err?.message}).`
      );
      setProfiles([]);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  if (profiles === null) return null;

  const sorted = profiles
    .slice()
    .sort((a, b) => ORDER.indexOf(a.reviewStatus) - ORDER.indexOf(b.reviewStatus));
  const toReview = sorted.filter((p) => p.reviewStatus === "pending");
  const shown = showAll ? sorted : toReview;

  return (
    <section className="adm-card adm-apps">
      <div className="adm-apps-head">
        <h2>
          Driver applications{" "}
          {toReview.length > 0 && <span className="adm-badge adm-badge-pending">{toReview.length} to review</span>}
        </h2>
        {profiles.length > toReview.length && (
          <button type="button" className="adm-btn adm-btn-small adm-btn-ghost" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show only those to review" : `Show all (${profiles.length})`}
          </button>
        )}
      </div>

      {error && <p className="adm-error">{error}</p>}
      {!error && shown.length === 0 && <p className="adm-muted">No applications waiting for review.</p>}

      {shown.length > 0 && (
        <ul className="adm-apps-list">
          {shown.map((p) => (
            <li key={p.id}>
              <div className="adm-driver-cell">
                {p.driverPhoto ? <img src={p.driverPhoto} alt="" /> : <span className="adm-avatar" />}
                <div>
                  <strong>{p.name || p.email}</strong>
                  <span className="adm-muted">
                    {[p.location, p.vehicleType, p.seats && `${p.seats} seats`].filter(Boolean).join(" · ")}
                  </span>
                </div>
              </div>
              <span className="adm-muted">Sent {formatDate(p.submittedAt)}</span>
              <span className={`adm-badge adm-badge-${p.reviewStatus}`}>
                {LABELS[p.reviewStatus] || p.reviewStatus}
                {p.published ? " · live" : ""}
              </span>
              <button type="button" className="adm-btn adm-btn-small" onClick={() => setOpen(p)}>
                Review
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <ApplicationReview
          profile={open}
          onClose={() => setOpen(null)}
          onDone={async (published) => {
            setOpen(null);
            await load();
            if (published) await onPublished?.();
          }}
        />
      )}
    </section>
  );
}

function ApplicationReview({ profile: p, onClose, onDone }) {
  const [note, setNote] = useState(p.reviewNote || "");
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  async function openDocument(path) {
    try {
      window.open(await documentUrl(path), "_blank", "noopener");
    } catch (err) {
      setError(`Couldn't open the document (${err?.code || err?.message}).`);
    }
  }

  async function act(kind) {
    setError("");
    if (kind === "changes" && !note.trim()) {
      setError("Write a short note so the driver knows what to change.");
      return;
    }
    setBusy(kind);
    try {
      if (kind === "approve") await approveApplication(p.id, p);
      else await requestChanges(p.id, note);
      await onDone(kind === "approve");
    } catch (err) {
      setError(`Something went wrong (${err?.code || err?.message}).`);
      setBusy("");
    }
  }

  const rows = [
    ["Email", p.email],
    ["WhatsApp", p.phone],
    ["Based in", p.location],
    ["Languages", (p.languages || []).join(", ")],
    ["Vehicle", [p.vehicleType, p.carMake, p.carModel, p.carYear].filter(Boolean).join(" ")],
    ["Seats / luggage", [p.seats, p.luggageCapacity].filter(Boolean).join(" · ")],
    ["Air conditioning", p.airCondition ? "Yes" : "No"],
    ["Extras", p.carDescription],
    ["Price per day", p.pricePerDay ? `LKR ${Number(p.pricePerDay).toLocaleString("en-US")}` : "—"],
    ["Km per day / extra km", [p.dailyKm, p.extraKm && `LKR ${p.extraKm}`].filter(Boolean).join(" · ")],
    [
      "Driver accommodation",
      p.accommodationIncluded ? "Included" : p.dailyAccommodationPrice ? `LKR ${p.dailyAccommodationPrice} / night` : "—",
    ],
    ["Available", `${p.availableFrom || "—"} to ${p.availableTo || "—"}`],
    ["Confirmed information is true", p.confirmed ? "Yes" : "No"],
  ];

  return (
    <div className="adm-modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
        <header className="adm-modal-header">
          <h2>{p.name || p.email}</h2>
          <button type="button" className="adm-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        {p.about && <p className="adm-app-about">{p.about}</p>}

        <dl className="adm-app-details">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value || "—"}</dd>
            </div>
          ))}
        </dl>

        <h3 className="adm-app-sub">Photos</h3>
        <div className="adm-photo-strip">
          {[p.driverPhoto, ...(p.carImages || [])].filter(Boolean).map((u) => (
            <a key={u} href={u} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u} alt="" />
            </a>
          ))}
        </div>

        <h3 className="adm-app-sub">Documents</h3>
        <ul className="adm-app-docs">
          {DOCUMENT_TYPES.map((d) => {
            const saved = p.documents?.[d.key];
            return (
              <li key={d.key}>
                <span>{d.label}</span>
                {saved ? (
                  <button type="button" className="adm-btn adm-btn-small adm-btn-ghost" onClick={() => openDocument(saved.path)}>
                    Open
                  </button>
                ) : (
                  <span className="adm-muted">{d.required ? "Missing" : "Not provided"}</span>
                )}
              </li>
            );
          })}
        </ul>

        <label className="adm-field adm-wide">
          <span>Note to the driver (if you request changes)</span>
          <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Please add a clearer photo of your insurance certificate." />
        </label>

        {error && <p className="adm-error">{error}</p>}

        <footer className="adm-modal-footer">
          <button type="button" className="adm-btn adm-btn-ghost" onClick={() => act("changes")} disabled={Boolean(busy)}>
            {busy === "changes" ? "Sending…" : "Request changes"}
          </button>
          <button type="button" className="adm-btn" onClick={() => act("approve")} disabled={Boolean(busy)}>
            {busy === "approve" ? "Publishing…" : p.published ? "Approve and update live profile" : "Approve and publish"}
          </button>
        </footer>
      </div>
    </div>
  );
}
