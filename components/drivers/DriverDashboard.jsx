"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, signOut } from "@/lib/firebase";
import { useAuthUser } from "@/lib/useAuthUser";
import { notifyAdminDriverApplication } from "@/lib/notifications";
import {
  DOCUMENT_TYPES,
  EMPTY_PROFILE,
  LANGUAGE_OPTIONS,
  MAX_CAR_PHOTOS,
  VEHICLE_TYPES,
  deletePhoto,
  loadProfile,
  missingForReview,
  saveFiles,
  saveProfile,
  uploadDocument,
  uploadPhoto,
} from "@/lib/driverApplications";
import EmailSignIn from "@/components/rides/EmailSignIn";
import WhatsAppInput from "@/components/WhatsAppInput";
import "./DriverDashboard.css";

// Where a driver registers and keeps their profile up to date
// (/driver/dashboard). See lib/driverApplications.js for how a profile is
// reviewed and published.

const STATUS = {
  draft: { label: "Not sent yet", text: "Fill in your profile and send it for review when you're ready." },
  pending: { label: "Under review", text: "Thanks! We're checking your profile and documents. We'll contact you on WhatsApp." },
  approved: { label: "Approved", text: "Your profile is live on Voyagees." },
  needs_changes: { label: "Changes needed", text: "Please update your profile and send it again." },
};

function friendlyError(err) {
  const code = err?.code || "";
  if (code === "storage/unauthorized" || code === "permission-denied") {
    return "This was refused by our server. Please sign out and sign in again, or contact us on WhatsApp.";
  }
  if (code.startsWith("storage/")) {
    return "The upload didn't work. Check your connection and try again with a smaller photo.";
  }
  return `Something went wrong (${code || err?.message || err}). Please try again.`;
}

export default function DriverDashboard() {
  const { user, authLoading } = useAuthUser();

  if (authLoading) return <main className="dd-page"><p>Loading…</p></main>;

  if (!user) {
    return (
      <main className="dd-page dd-narrow">
        <p className="dd-eyebrow">Voyagees drivers</p>
        <h1>Register or sign in</h1>
        <p className="dd-lead">
          Enter your email address. We&apos;ll send you a link: open it on this phone or computer to reach your
          driver dashboard. No password needed.
        </p>
        <EmailSignIn prompt="Your email address" />
        <p className="dd-muted">
          New to Voyagees? <Link href="/become-a-driver">See how it works</Link>.
        </p>
      </main>
    );
  }

  return <ProfileEditor user={user} />;
}

function ProfileEditor({ user }) {
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState({ reviewStatus: "draft", reviewNote: "", published: false });
  const [isNew, setIsNew] = useState(false); // no profile saved yet
  const [busy, setBusy] = useState(""); // which upload or save is running
  const [message, setMessage] = useState(null); // { type: "ok" | "error", text }

  useEffect(() => {
    let cancelled = false;
    loadProfile(user.uid)
      .then((profile) => {
        if (cancelled) return;
        const p = profile || EMPTY_PROFILE;
        setIsNew(!profile);
        setForm({ ...p, documents: p.documents || {}, carImages: p.carImages || [] });
        setStatus({ reviewStatus: p.reviewStatus, reviewNote: p.reviewNote, published: p.published });
      })
      .catch((err) => !cancelled && setMessage({ type: "error", text: friendlyError(err) }));
    return () => {
      cancelled = true;
    };
  }, [user.uid]);

  if (!form) {
    return (
      <main className="dd-page">
        {message ? <p className="dd-error">{message.text}</p> : <p>Loading your profile…</p>}
      </main>
    );
  }

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const toggleLanguage = (lang) =>
    setForm((f) => ({
      ...f,
      languages: f.languages.includes(lang) ? f.languages.filter((l) => l !== lang) : [...f.languages, lang],
    }));

  // persist uploaded files right away (see saveFiles)
  async function keepFiles(patch) {
    await saveFiles(user, patch, { isNew });
    setIsNew(false);
  }

  async function run(label, task) {
    setBusy(label);
    setMessage(null);
    try {
      await task();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: friendlyError(err) });
    } finally {
      setBusy("");
    }
  }

  const handleDriverPhoto = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    run("driverPhoto", async () => {
      const url = await uploadPhoto(user.uid, file, "driver");
      const old = form.driverPhoto;
      setForm((f) => ({ ...f, driverPhoto: url }));
      await keepFiles({ driverPhoto: url });
      await deletePhoto(old);
    });
  };

  const handleCarPhotos = (e) => {
    const files = [...(e.target.files || [])].slice(0, MAX_CAR_PHOTOS - form.carImages.length);
    e.target.value = "";
    if (!files.length) return;
    run("carImages", async () => {
      let carImages = form.carImages;
      for (const file of files) {
        const url = await uploadPhoto(user.uid, file, "vehicle");
        carImages = [...carImages, url];
        setForm((f) => ({ ...f, carImages }));
        await keepFiles({ carImages });
      }
    });
  };

  const removeCarPhoto = (url) =>
    run("carImages", async () => {
      const carImages = form.carImages.filter((u) => u !== url);
      setForm((f) => ({ ...f, carImages }));
      await keepFiles({ carImages });
      await deletePhoto(url);
    });

  const handleDocument = (key) => (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      setMessage({ type: "error", text: "Please upload a photo or a PDF." });
      return;
    }
    run(key, async () => {
      const saved = await uploadDocument(user.uid, file, key);
      const documents = { ...form.documents, [key]: saved };
      setForm((f) => ({ ...f, documents }));
      await keepFiles({ documents });
    });
  };

  async function save(submit) {
    if (form.availableFrom && form.availableTo && form.availableTo < form.availableFrom) {
      setMessage({ type: "error", text: "'Available until' must be after 'Available from'." });
      return;
    }
    if (submit) {
      const missing = missingForReview(form);
      if (missing.length) {
        setMessage({ type: "error", text: `Before sending, please add: ${missing.join(", ")}.` });
        return;
      }
    }
    await run(submit ? "submit" : "save", async () => {
      const saved = await saveProfile(user, form, { submit });
      setIsNew(false);
      setStatus((s) => ({ ...s, reviewStatus: saved.reviewStatus }));
      if (submit) {
        notifyAdminDriverApplication({ ...saved, email: user.email }, user.uid).catch((err) =>
          console.warn("Admin notification failed:", err)
        );
      }
      setMessage({
        type: "ok",
        text: submit
          ? "Sent! We'll check your profile and documents and contact you on WhatsApp."
          : "Saved. You can come back and finish later.",
      });
    });
  }

  const s = STATUS[status.reviewStatus] || STATUS.draft;
  const uploading = busy && !["save", "submit"].includes(busy);

  return (
    <main className="dd-page">
      <header className="dd-header">
        <div>
          <p className="dd-eyebrow">Voyagees drivers</p>
          <h1>Your driver profile</h1>
        </div>
        <div className="dd-account">
          <span className="dd-muted">{user.email}</span>
          <button type="button" className="dd-btn dd-btn-ghost" onClick={() => signOut(auth)}>
            Sign out
          </button>
        </div>
      </header>

      <section className={`dd-status dd-status-${status.reviewStatus}`}>
        <strong>{s.label}</strong>
        <span>{s.text}</span>
        {status.reviewStatus === "needs_changes" && status.reviewNote && (
          <p className="dd-note">Our note: {status.reviewNote}</p>
        )}
        {status.published && status.reviewStatus !== "approved" && (
          <p className="dd-note">
            Your current profile stays live on the site until we approve your new changes.
          </p>
        )}
      </section>

      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset className="dd-card">
          <legend>About you</legend>
          <div className="dd-grid">
            <Field label="Full name">
              <input value={form.name} onChange={set("name")} autoComplete="name" />
            </Field>
            <Field label="WhatsApp number (private, only for Voyagees)">
              <WhatsAppInput value={form.phone} onChange={(phone) => setForm((f) => ({ ...f, phone }))} />
            </Field>
            <Field label="Town you're based in">
              <input value={form.location} onChange={set("location")} placeholder="e.g. Kandy" />
            </Field>
            <div className="dd-field dd-wide">
              <span>Languages you speak with travellers</span>
              <div className="dd-chips">
                {LANGUAGE_OPTIONS.map((lang) => (
                  <label key={lang} className={`dd-chip${form.languages.includes(lang) ? " dd-chip-on" : ""}`}>
                    <input type="checkbox" checked={form.languages.includes(lang)} onChange={() => toggleLanguage(lang)} />
                    {lang}
                  </label>
                ))}
              </div>
            </div>
            <Field label="A few words about you (shown to travellers)" wide>
              <textarea
                rows={3}
                value={form.about}
                onChange={set("about")}
                placeholder="How long you've been driving tourists, the regions you know best, what guests enjoy about travelling with you…"
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="dd-card">
          <legend>Your vehicle</legend>
          <div className="dd-grid">
            <Field label="Type">
              <select value={form.vehicleType} onChange={set("vehicleType")}>
                {VEHICLE_TYPES.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </Field>
            <Field label="Make"><input value={form.carMake} onChange={set("carMake")} placeholder="Toyota" /></Field>
            <Field label="Model"><input value={form.carModel} onChange={set("carModel")} placeholder="Prius" /></Field>
            <Field label="Year"><input type="number" min="1980" max="2100" value={form.carYear ?? ""} onChange={set("carYear")} /></Field>
            <Field label="Passenger seats"><input type="number" min="1" value={form.seats ?? ""} onChange={set("seats")} /></Field>
            <Field label="Luggage"><input value={form.luggageCapacity} onChange={set("luggageCapacity")} placeholder="2 large, 2 small" /></Field>
            <Check label="Air conditioning" checked={form.airCondition} onChange={set("airCondition")} />
            <Field label="Extras" wide>
              <input value={form.carDescription} onChange={set("carDescription")} placeholder="Wi-Fi, child seat, cool box…" />
            </Field>
          </div>
        </fieldset>

        <fieldset className="dd-card">
          <legend>Your prices (LKR)</legend>
          <p className="dd-muted">
            Your proposed rates. We check them before they go live, and Voyagees adds its service fee on top for the
            traveller.
          </p>
          <div className="dd-grid">
            <Field label="Price per day"><input type="number" min="0" value={form.pricePerDay ?? ""} onChange={set("pricePerDay")} /></Field>
            <Field label="Km included per day"><input type="number" min="0" value={form.dailyKm ?? ""} onChange={set("dailyKm")} /></Field>
            <Field label="Price per extra km"><input type="number" min="0" value={form.extraKm ?? ""} onChange={set("extraKm")} /></Field>
            <Check label="My accommodation is included in my day price" checked={form.accommodationIncluded} onChange={set("accommodationIncluded")} />
            {!form.accommodationIncluded && (
              <Field label="My accommodation per night">
                <input type="number" min="0" value={form.dailyAccommodationPrice ?? ""} onChange={set("dailyAccommodationPrice")} />
              </Field>
            )}
          </div>
        </fieldset>

        <fieldset className="dd-card">
          <legend>When you&apos;re available</legend>
          <div className="dd-grid">
            <Field label="Available from"><input type="date" value={form.availableFrom} onChange={set("availableFrom")} /></Field>
            <Field label="Available until"><input type="date" value={form.availableTo} onChange={set("availableTo")} /></Field>
          </div>
        </fieldset>

        <fieldset className="dd-card">
          <legend>Photos (shown to travellers)</legend>
          <div className="dd-photos">
            <div>
              <span className="dd-label">A clear, friendly photo of you</span>
              <div className="dd-photo-row">
                {form.driverPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.driverPhoto} alt="You" className="dd-avatar" />
                ) : (
                  <span className="dd-avatar dd-avatar-empty" />
                )}
                <label className="dd-btn dd-btn-ghost dd-upload">
                  {busy === "driverPhoto" ? "Uploading…" : form.driverPhoto ? "Change photo" : "Add photo"}
                  <input type="file" accept="image/*" onChange={handleDriverPhoto} disabled={Boolean(busy)} />
                </label>
              </div>
            </div>
            <div>
              <span className="dd-label">
                Your vehicle, inside and outside ({form.carImages.length}/{MAX_CAR_PHOTOS})
              </span>
              <div className="dd-car-grid">
                {form.carImages.map((url) => (
                  <div key={url} className="dd-car">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="Vehicle" />
                    <button type="button" onClick={() => removeCarPhoto(url)} disabled={Boolean(busy)} aria-label="Remove photo">
                      ×
                    </button>
                  </div>
                ))}
                {form.carImages.length < MAX_CAR_PHOTOS && (
                  <label className="dd-car dd-car-add">
                    {busy === "carImages" ? "Uploading…" : "+ Add photos"}
                    <input type="file" accept="image/*" multiple onChange={handleCarPhotos} disabled={Boolean(busy)} />
                  </label>
                )}
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="dd-card">
          <legend>Documents (private, only Voyagees can see them)</legend>
          <p className="dd-muted">A clear photo or a PDF of each document. We use them only to check your profile.</p>
          <ul className="dd-docs">
            {DOCUMENT_TYPES.map((d) => {
              const saved = form.documents[d.key];
              return (
                <li key={d.key}>
                  <div>
                    <strong>{d.label}</strong>
                    <span className="dd-muted">
                      {saved ? `✓ Uploaded: ${saved.name}` : d.required ? "Required" : "Optional, if you have one"}
                    </span>
                  </div>
                  <label className="dd-btn dd-btn-ghost dd-upload">
                    {busy === d.key ? "Uploading…" : saved ? "Replace" : "Upload"}
                    <input type="file" accept="image/*,application/pdf" onChange={handleDocument(d.key)} disabled={Boolean(busy)} />
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <section className="dd-card dd-submit">
          <Check
            label="I confirm that this information is true, that I hold a valid driving licence and that my vehicle is insured and licensed."
            checked={form.confirmed}
            onChange={set("confirmed")}
          />
          {message && <p className={message.type === "ok" ? "dd-ok" : "dd-error"}>{message.text}</p>}
          <div className="dd-actions">
            <button type="button" className="dd-btn dd-btn-ghost" onClick={() => save(false)} disabled={Boolean(busy)}>
              {busy === "save" ? "Saving…" : "Save draft"}
            </button>
            <button type="button" className="dd-btn" onClick={() => save(true)} disabled={Boolean(busy)} aria-busy={busy === "submit"}>
              {busy === "submit" ? "Sending…" : status.published ? "Send my changes for review" : "Send for review"}
            </button>
          </div>
          {uploading && <p className="dd-muted">Please wait for the upload to finish.</p>}
        </section>
      </form>
    </main>
  );
}

function Field({ label, wide, children }) {
  return (
    <label className={`dd-field${wide ? " dd-wide" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function Check({ label, checked, onChange }) {
  return (
    <label className="dd-check">
      <input type="checkbox" checked={Boolean(checked)} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}
