"use client";

// Driver self-registration (/driver/dashboard) and its review in
// /admin/drivers.
//
// A driver's own profile lives in `driverProfiles/{uid}`, readable only by
// that driver and the admin. It never appears on the site by itself: when
// the admin approves it, approveApplication() copies the public fields to
// `drivers/{uid}` (status "active") and the phone number to
// `driverContacts/{uid}`. Later edits by the driver set the profile back to
// "pending"; the live profile stays as it was until the admin approves
// again. The driver can't set "approved" or "published" (firestore.rules).
//
// Files go to Firebase Storage (storage.rules):
//   driver-media/{uid}/…      photos shown on the site (public read)
//   driver-documents/{uid}/…  licences and insurance (driver + admin only)

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

export const VEHICLE_TYPES = ["Car", "SUV", "Van", "Bus", "Tuk-Tuk"];

export const LANGUAGE_OPTIONS = ["English", "French", "German", "Italian", "Spanish", "Russian", "Sinhala", "Tamil"];

export const DOCUMENT_TYPES = [
  { key: "drivingLicence", label: "Driving licence", required: true },
  { key: "insurance", label: "Vehicle insurance certificate", required: true },
  { key: "revenueLicence", label: "Vehicle revenue licence", required: true },
  { key: "guideLicence", label: "Chauffeur-guide licence (SLTDA)", required: false },
];

export const MAX_CAR_PHOTOS = 6;

export const EMPTY_PROFILE = {
  name: "",
  phone: "",
  location: "",
  about: "",
  languages: ["English"],
  vehicleType: "Car",
  carMake: "",
  carModel: "",
  carYear: "",
  seats: "",
  luggageCapacity: "",
  airCondition: true,
  carDescription: "",
  pricePerDay: "",
  dailyKm: 100,
  extraKm: "",
  accommodationIncluded: false,
  dailyAccommodationPrice: "",
  availableFrom: "",
  availableTo: "",
  driverPhoto: "",
  carImages: [],
  documents: {},
  confirmed: false,
  reviewStatus: "draft",
  reviewNote: "",
  published: false,
};

const NUMBER_FIELDS = ["pricePerDay", "dailyKm", "extraKm", "dailyAccommodationPrice", "carYear", "seats"];

// Fields copied to the public `drivers/{uid}` profile on approval.
const PUBLIC_FIELDS = [
  "name",
  "location",
  "about",
  "languages",
  "vehicleType",
  "carMake",
  "carModel",
  "carYear",
  "seats",
  "luggageCapacity",
  "airCondition",
  "carDescription",
  "pricePerDay",
  "dailyKm",
  "extraKm",
  "accommodationIncluded",
  "dailyAccommodationPrice",
  "availableFrom",
  "availableTo",
  "driverPhoto",
  "carImages",
];

export const profileRef = (uid) => doc(db, "driverProfiles", uid);

export async function loadProfile(uid) {
  const snap = await getDoc(profileRef(uid));
  return snap.exists() ? { ...EMPTY_PROFILE, ...snap.data() } : null;
}

function clean(form) {
  const data = {};
  for (const key of Object.keys(EMPTY_PROFILE)) {
    if (["reviewNote", "published"].includes(key)) continue; // admin-only
    data[key] = form[key] ?? EMPTY_PROFILE[key];
  }
  for (const f of NUMBER_FIELDS) {
    data[f] = data[f] === "" || data[f] == null ? null : Number(data[f]);
  }
  for (const f of ["name", "phone", "location", "about", "carMake", "carModel", "luggageCapacity", "carDescription"]) {
    data[f] = String(data[f] || "").trim();
  }
  return data;
}

/** What's still missing before the profile can be sent for review. */
export function missingForReview(form) {
  const missing = [];
  if (!form.name?.trim()) missing.push("your name");
  if (!form.phone?.trim()) missing.push("your WhatsApp number");
  if (!form.location?.trim()) missing.push("the town you're based in");
  if (!form.languages?.length) missing.push("at least one language");
  if (!(Number(form.seats) > 0)) missing.push("the number of seats");
  if (!(Number(form.pricePerDay) > 0)) missing.push("your price per day");
  if (!form.availableFrom || !form.availableTo) missing.push("your availability dates");
  if (!form.driverPhoto) missing.push("a photo of you");
  if (!form.carImages?.length) missing.push("at least one photo of your vehicle");
  for (const d of DOCUMENT_TYPES) {
    if (d.required && !form.documents?.[d.key]) missing.push(d.label.toLowerCase());
  }
  if (!form.confirmed) missing.push("the confirmation box at the bottom");
  return missing;
}

/** Saves the driver's profile; `submit` sends it to the admin for review. */
export async function saveProfile(user, form, { submit }) {
  const data = {
    ...clean(form),
    ownerUid: user.uid,
    email: user.email,
    reviewStatus: submit ? "pending" : "draft",
    updatedAt: serverTimestamp(),
    ...(submit ? { submittedAt: serverTimestamp() } : {}),
  };
  await setDoc(profileRef(user.uid), data, { merge: true });
  return data;
}

/**
 * Saves uploaded files to the profile straight away, so they aren't lost if
 * the driver leaves before pressing Save. Leaves the review status alone,
 * except on a brand-new profile, which starts as a draft.
 */
export function saveFiles(user, patch, { isNew }) {
  return setDoc(
    profileRef(user.uid),
    {
      ...patch,
      ownerUid: user.uid,
      email: user.email,
      updatedAt: serverTimestamp(),
      ...(isNew ? { reviewStatus: "draft" } : {}),
    },
    { merge: true }
  );
}

// Phone photos are often 4–12 MB; shrink them in the browser before upload
// so pages stay fast and uploads work on mobile data.
function shrinkImage(file, maxSize) {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/") || file.type === "image/gif") return resolve(file);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => resolve(blob || file), "image/jpeg", 0.85);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };
    img.src = url;
  });
}

const fileName = (prefix, file) => {
  const ext = file.type === "application/pdf" ? "pdf" : "jpg";
  return `${prefix}-${Date.now()}.${ext}`;
};

/** Uploads a public photo (driver or vehicle) and returns its URL. */
export async function uploadPhoto(uid, file, prefix) {
  const blob = await shrinkImage(file, 1600);
  const objectRef = ref(storage, `driver-media/${uid}/${fileName(prefix, file)}`);
  await uploadBytes(objectRef, blob, { contentType: "image/jpeg" });
  return getDownloadURL(objectRef);
}

/** Uploads a private document; returns what to store on the profile. */
export async function uploadDocument(uid, file, key) {
  const isPdf = file.type === "application/pdf";
  const blob = isPdf ? file : await shrinkImage(file, 2200);
  const path = `driver-documents/${uid}/${fileName(key, file)}`;
  await uploadBytes(ref(storage, path), blob, { contentType: isPdf ? "application/pdf" : "image/jpeg" });
  return { path, name: file.name, uploadedAt: new Date().toISOString() };
}

/** Removes a photo the driver replaced or deleted (ignores files already gone). */
export async function deletePhoto(url) {
  if (!url || !url.includes("firebasestorage")) return;
  try {
    await deleteObject(ref(storage, url));
  } catch (err) {
    if (err?.code !== "storage/object-not-found") throw err;
  }
}

/** Admin: a temporary link to view a private document. */
export function documentUrl(path) {
  return getDownloadURL(ref(storage, path));
}

/** Admin: publishes the profile on the site (or updates the live one). */
export async function approveApplication(uid, profile) {
  const pub = {};
  for (const f of PUBLIC_FIELDS) pub[f] = profile[f] ?? null;
  pub.guideLicense = Boolean(profile.documents?.guideLicence);
  pub.experience = true;
  pub.status = "active";
  pub.selfRegistered = true;
  pub.updatedAt = serverTimestamp();

  await setDoc(doc(db, "drivers", uid), pub, { merge: true });
  await setDoc(doc(db, "driverContacts", uid), { phone: profile.phone || "", email: profile.email || "" });
  await setDoc(
    profileRef(uid),
    { reviewStatus: "approved", reviewNote: "", published: true, approvedAt: serverTimestamp() },
    { merge: true }
  );
}

/** Admin: sends the profile back to the driver with a note. */
export function requestChanges(uid, note) {
  return setDoc(
    profileRef(uid),
    { reviewStatus: "needs_changes", reviewNote: note.trim(), reviewedAt: serverTimestamp() },
    { merge: true }
  );
}
