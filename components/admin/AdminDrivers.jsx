"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db, signOut, auth } from "@/lib/firebase";
import { useAuthUser } from "@/lib/useAuthUser";
import { ADMIN_EMAIL } from "@/lib/driversStore";
import { drivers as staticDrivers } from "@/data/drivers";
import EmailSignIn from "@/components/rides/EmailSignIn";
import WhatsAppInput from "@/components/WhatsAppInput";
import "./AdminDrivers.css";

// Admin-only driver management (/admin/drivers). Public profile fields live
// in `drivers/{id}`; phone and email in `driverContacts/{id}`, which only
// the admin can read. Access is enforced by the Firestore security rules —
// this page's email check is only there to show a friendly message.

const VEHICLE_TYPES = ["Car", "SUV", "Van", "Bus", "Tuk-Tuk"];

const EMPTY_DRIVER = {
  name: "",
  location: "",
  about: "",
  status: "active",
  availableFrom: "",
  availableTo: "",
  pricePerDay: "",
  dailyKm: 100,
  extraKm: "",
  accommodationIncluded: false,
  dailyAccommodationPrice: "",
  vehicleType: "Car",
  carMake: "",
  carModel: "",
  carYear: "",
  seats: "",
  luggageCapacity: "",
  airCondition: true,
  carDescription: "",
  languages: ["English"],
  experience: true,
  guideLicense: false,
  cancelNotice: "24hrs",
  driverPhoto: "",
  carImages: [],
};

const NUMBER_FIELDS = ["pricePerDay", "dailyKm", "extraKm", "dailyAccommodationPrice", "carYear", "seats"];

function toFirestore(form) {
  const data = { ...form };
  delete data.id;
  delete data.phone;
  delete data.email;
  for (const f of NUMBER_FIELDS) {
    data[f] = data[f] === "" || data[f] == null ? null : Number(data[f]);
  }
  data.languages = (data.languages || []).map((l) => l.trim()).filter(Boolean);
  data.carImages = (data.carImages || []).map((u) => u.trim()).filter(Boolean);
  return data;
}

// private/driver-contacts.csv, as written by the privacy fix:
// "id","name","phone","email","location"
function parseContactsCsv(text) {
  const rows = text.trim().split(/\r?\n/).map((line) =>
    [...line.matchAll(/"((?:[^"]|"")*)"|([^,]+)/g)].map((m) => (m[1] ?? m[2] ?? "").replace(/""/g, '"'))
  );
  const [header, ...body] = rows;
  const col = (name) => header.indexOf(name);
  return Object.fromEntries(
    body.map((r) => [r[col("id")], { phone: r[col("phone")] || "", email: r[col("email")] || "" }])
  );
}

function friendlyError(err) {
  if (err?.code === "permission-denied") {
    return "Firestore refused this (permission denied). The security rules for drivers haven't been added yet, or you're not signed in as the admin.";
  }
  return `Something went wrong: ${err?.code || err?.message || err}`;
}

export default function AdminDrivers() {
  const { user, authLoading } = useAuthUser();
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;

  if (authLoading) return <main className="adm-page"><p>Loading…</p></main>;

  if (!user) {
    return (
      <main className="adm-page adm-narrow">
        <h1>Drivers admin</h1>
        <EmailSignIn prompt={`Sign in with ${ADMIN_EMAIL} to manage drivers.`} />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="adm-page adm-narrow">
        <h1>Drivers admin</h1>
        <p>You&apos;re signed in as {user.email}, which doesn&apos;t have admin access.</p>
        <button type="button" className="adm-btn" onClick={() => signOut(auth)}>Sign out</button>
      </main>
    );
  }

  return <DriversManager user={user} />;
}

function DriversManager({ user }) {
  const [drivers, setDrivers] = useState(null);
  const [contacts, setContacts] = useState({});
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // driver object, or EMPTY_DRIVER for new
  const [filter, setFilter] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const [driverSnap, contactSnap] = await Promise.all([
        getDocs(collection(db, "drivers")),
        getDocs(collection(db, "driverContacts")),
      ]);
      setDrivers(driverSnap.docs.map((d) => ({ ...d.data(), id: d.id })));
      setContacts(Object.fromEntries(contactSnap.docs.map((d) => [d.id, d.data()])));
    } catch (err) {
      setError(friendlyError(err));
      setDrivers([]);
    }
  }, []);

  useEffect(() => {
    // initial fetch; load() only sets state after its awaits resolve
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const shown = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const list = (drivers || []).slice().sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
    if (!q) return list;
    return list.filter((d) =>
      [d.name, d.location, d.vehicleType, d.carMake, d.carModel].join(" ").toLowerCase().includes(q)
    );
  }, [drivers, filter]);

  async function toggleStatus(driver) {
    const status = driver.status === "active" ? "paused" : "active";
    try {
      await updateDoc(doc(db, "drivers", driver.id), { status, updatedAt: serverTimestamp() });
      setDrivers((list) => list.map((d) => (d.id === driver.id ? { ...d, status } : d)));
    } catch (err) {
      setError(friendlyError(err));
    }
  }

  if (drivers === null) return <main className="adm-page"><p>Loading drivers…</p></main>;

  return (
    <main className="adm-page">
      <header className="adm-header">
        <div>
          <h1>Drivers</h1>
          <p className="adm-muted">
            {drivers.length} drivers · {drivers.filter((d) => d.status === "active").length} live on the site
          </p>
        </div>
        <div className="adm-header-actions">
          <span className="adm-muted">{user.email}</span>
          <button type="button" className="adm-btn adm-btn-ghost" onClick={() => signOut(auth)}>Sign out</button>
          {drivers.length > 0 && (
            <button type="button" className="adm-btn" onClick={() => setEditing(EMPTY_DRIVER)}>+ Add driver</button>
          )}
        </div>
      </header>

      {error && <p className="adm-error">{error}</p>}

      {drivers.length === 0 && !error && <ImportPanel onDone={load} />}

      {drivers.length > 0 && (
        <>
          <input
            className="adm-filter"
            placeholder="Search by name, town or vehicle…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />

          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Driver</th>
                  <th>Vehicle</th>
                  <th>Price / day</th>
                  <th>Available</th>
                  <th>WhatsApp</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {shown.map((d) => (
                  <tr key={d.id} className={d.status !== "active" ? "adm-row-paused" : undefined}>
                    <td>
                      <div className="adm-driver-cell">
                        {d.driverPhoto ? <img src={d.driverPhoto} alt="" /> : <span className="adm-avatar" />}
                        <div>
                          <strong>{d.name}</strong>
                          <span className="adm-muted">{d.location}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      {d.vehicleType} · {d.seats} seats
                      <span className="adm-muted">{[d.carMake, d.carModel, d.carYear].filter(Boolean).join(" ")}</span>
                    </td>
                    <td>LKR {Number(d.pricePerDay || 0).toLocaleString("en-US")}</td>
                    <td>
                      {d.availableFrom || "—"}
                      <span className="adm-muted">to {d.availableTo || "—"}</span>
                    </td>
                    <td>
                      {contacts[d.id]?.phone ? (
                        <a href={`https://wa.me/${contacts[d.id].phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer">
                          {contacts[d.id].phone}
                        </a>
                      ) : (
                        <span className="adm-muted">—</span>
                      )}
                    </td>
                    <td>
                      <span className={`adm-badge adm-badge-${d.status === "active" ? "live" : "paused"}`}>
                        {d.status === "active" ? "Live" : "Paused"}
                      </span>
                    </td>
                    <td className="adm-actions">
                      <button type="button" className="adm-btn adm-btn-small" onClick={() => setEditing({ ...d, ...contacts[d.id] })}>
                        Edit
                      </button>
                      <button type="button" className="adm-btn adm-btn-small adm-btn-ghost" onClick={() => toggleStatus(d)}>
                        {d.status === "active" ? "Pause" : "Make live"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {editing && (
        <DriverEditor
          initial={editing}
          onClose={() => setEditing(null)}
          onSaved={async () => {
            setEditing(null);
            await load();
          }}
        />
      )}
    </main>
  );
}

function ImportPanel({ onDone }) {
  const [csv, setCsv] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | working | error
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setCsv(parseContactsCsv(await file.text()));
    } catch {
      setError("Couldn't read that file. Choose private/driver-contacts.csv.");
    }
  }

  async function runImport() {
    setStatus("working");
    setError("");
    try {
      const batch = writeBatch(db);
      for (const d of staticDrivers) {
        const id = String(d.id);
        batch.set(doc(db, "drivers", id), {
          ...toFirestore(d),
          status: "active",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        const c = csv?.[id];
        if (c && (c.phone || c.email)) {
          batch.set(doc(db, "driverContacts", id), { phone: c.phone, email: c.email });
        }
      }
      await batch.commit();
      await onDone();
    } catch (err) {
      setStatus("error");
      setError(friendlyError(err));
    }
  }

  return (
    <section className="adm-card">
      <h2>Import the current drivers</h2>
      <p>
        There are no drivers in the database yet, so the website is still using the{" "}
        {staticDrivers.length} drivers from its built-in list. Import them here once; after that,
        everything is managed on this page.
      </p>
      <label className="adm-field">
        <span>Driver contacts (optional): private/driver-contacts.csv</span>
        <input type="file" accept=".csv,text/csv" onChange={handleFile} />
        {csv && <span className="adm-muted">{Object.keys(csv).length} contacts ready to import</span>}
      </label>
      {error && <p className="adm-error">{error}</p>}
      <button type="button" className="adm-btn" onClick={runImport} disabled={status === "working"} aria-busy={status === "working"}>
        {status === "working" && <span className="btn-spinner" aria-hidden="true" />}
        {status === "working" ? "Importing…" : `Import ${staticDrivers.length} drivers`}
      </button>
    </section>
  );
}

function DriverEditor({ initial, onClose, onSaved }) {
  const isNew = !initial.id;
  const toList = (v) => (Array.isArray(v) ? v : typeof v === "string" && v ? v.split(",") : []);
  const [form, setForm] = useState({
    ...EMPTY_DRIVER,
    ...initial,
    // older records may store these as plain text
    languages: toList(initial.languages ?? EMPTY_DRIVER.languages),
    carImages: toList(initial.carImages),
    phone: initial.phone || "",
    email: initial.email || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    if (form.availableFrom && form.availableTo && form.availableTo < form.availableFrom) {
      setError("'Available to' must be after 'Available from'.");
      return;
    }
    setSaving(true);
    try {
      const ref = isNew ? doc(collection(db, "drivers")) : doc(db, "drivers", initial.id);
      await setDoc(
        ref,
        {
          ...toFirestore(form),
          updatedAt: serverTimestamp(),
          ...(isNew ? { createdAt: serverTimestamp() } : {}),
        },
        { merge: true }
      );
      await setDoc(doc(db, "driverContacts", ref.id), {
        phone: form.phone.trim(),
        email: form.email.trim(),
      });
      await onSaved();
    } catch (err) {
      setError(friendlyError(err));
      setSaving(false);
    }
  }

  return (
    <div className="adm-modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <form className="adm-modal" onSubmit={handleSave} onClick={(e) => e.stopPropagation()}>
        <header className="adm-modal-header">
          <h2>{isNew ? "Add driver" : `Edit ${initial.name}`}</h2>
          <button type="button" className="adm-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <fieldset>
          <legend>Driver</legend>
          <div className="adm-grid">
            <Field label="Name"><input required value={form.name} onChange={set("name")} /></Field>
            <Field label="Based in"><input value={form.location} onChange={set("location")} placeholder="Colombo, Matara" /></Field>
            <Field label="Languages (comma separated)" wide>
              <input
                value={(form.languages || []).join(", ")}
                onChange={(e) => setForm((f) => ({ ...f, languages: e.target.value.split(",") }))}
                placeholder="English, Sinhala"
              />
            </Field>
            <Field label="About (optional)" wide><textarea rows={2} value={form.about} onChange={set("about")} /></Field>
            <Check label="Experienced driver" checked={form.experience} onChange={set("experience")} />
            <Check label="Tourist guide licence" checked={form.guideLicense} onChange={set("guideLicense")} />
            <Field label="Cancellation notice"><input value={form.cancelNotice} onChange={set("cancelNotice")} /></Field>
          </div>
        </fieldset>

        <fieldset>
          <legend>Private contact (admin only, never shown on the site)</legend>
          <div className="adm-grid">
            <Field label="WhatsApp number">
              <WhatsAppInput value={form.phone} onChange={(phone) => setForm((f) => ({ ...f, phone }))} />
            </Field>
            <Field label="Email"><input type="email" value={form.email} onChange={set("email")} /></Field>
          </div>
        </fieldset>

        <fieldset>
          <legend>Availability</legend>
          <div className="adm-grid">
            <Field label="Available from"><input required type="date" value={form.availableFrom} onChange={set("availableFrom")} /></Field>
            <Field label="Available to"><input required type="date" value={form.availableTo} onChange={set("availableTo")} /></Field>
            <Field label="Status">
              <select value={form.status} onChange={set("status")}>
                <option value="active">Live on the site</option>
                <option value="paused">Paused (hidden)</option>
              </select>
            </Field>
          </div>
        </fieldset>

        <fieldset>
          <legend>Pricing (LKR)</legend>
          <div className="adm-grid">
            <Field label="Price per day"><input required type="number" min="0" value={form.pricePerDay ?? ""} onChange={set("pricePerDay")} /></Field>
            <Field label="Km included per day"><input type="number" min="0" value={form.dailyKm ?? ""} onChange={set("dailyKm")} /></Field>
            <Field label="Extra km rate"><input type="number" min="0" value={form.extraKm ?? ""} onChange={set("extraKm")} /></Field>
            <Check label="Driver accommodation included" checked={form.accommodationIncluded} onChange={set("accommodationIncluded")} />
            {!form.accommodationIncluded && (
              <Field label="Accommodation per night"><input type="number" min="0" value={form.dailyAccommodationPrice ?? ""} onChange={set("dailyAccommodationPrice")} /></Field>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Vehicle</legend>
          <div className="adm-grid">
            <Field label="Type">
              <select value={form.vehicleType} onChange={set("vehicleType")}>
                {VEHICLE_TYPES.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </Field>
            <Field label="Make"><input value={form.carMake} onChange={set("carMake")} placeholder="Toyota" /></Field>
            <Field label="Model"><input value={form.carModel} onChange={set("carModel")} placeholder="Prius" /></Field>
            <Field label="Year"><input type="number" min="1980" max="2100" value={form.carYear ?? ""} onChange={set("carYear")} /></Field>
            <Field label="Seats"><input required type="number" min="1" value={form.seats ?? ""} onChange={set("seats")} /></Field>
            <Field label="Luggage"><input value={form.luggageCapacity} onChange={set("luggageCapacity")} placeholder="2 large 2 small" /></Field>
            <Check label="Air conditioning" checked={form.airCondition} onChange={set("airCondition")} />
            <Field label="Features" wide><input value={form.carDescription} onChange={set("carDescription")} placeholder="A/C, Wi-Fi, child seat…" /></Field>
          </div>
        </fieldset>

        <fieldset>
          <legend>Photos</legend>
          <p className="adm-muted">
            Image paths on the site, e.g. /images/drivers/driver8/driver.jpg. Photo uploads come in the next step.
          </p>
          <div className="adm-grid">
            <Field label="Driver photo" wide><input value={form.driverPhoto} onChange={set("driverPhoto")} /></Field>
            <Field label="Car photos (one per line)" wide>
              <textarea
                rows={3}
                value={(form.carImages || []).join("\n")}
                onChange={(e) => setForm((f) => ({ ...f, carImages: e.target.value.split("\n") }))}
              />
            </Field>
          </div>
          <div className="adm-photo-strip">
            {[form.driverPhoto, ...(form.carImages || [])].filter((u) => u && u.trim()).map((u) => (
              <img key={u} src={u.trim()} alt="" />
            ))}
          </div>
        </fieldset>

        {error && <p className="adm-error">{error}</p>}

        <footer className="adm-modal-footer">
          <button type="button" className="adm-btn adm-btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="adm-btn" disabled={saving} aria-busy={saving}>
            {saving && <span className="btn-spinner" aria-hidden="true" />}
            {saving ? "Saving…" : isNew ? "Add driver" : "Save changes"}
          </button>
        </footer>
      </form>
    </div>
  );
}

function Field({ label, wide, children }) {
  return (
    <label className={`adm-field${wide ? " adm-wide" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function Check({ label, checked, onChange }) {
  return (
    <label className="adm-check">
      <input type="checkbox" checked={Boolean(checked)} onChange={onChange} />
      {label}
    </label>
  );
}
