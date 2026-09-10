import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQ_LIMgZyHgru1Fle-UpoFVkeAVcYm_sk",
  authDomain: "voyagees.com",
  projectId: "voyajees",
  storageBucket: "voyajees.firebasestorage.app",
  messagingSenderId: "990797950207",
  appId: "1:990797950207:web:f6303d84c0ae78d532b0ca"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// experimentalAutoDetectLongPolling works around "Could not reach Cloud
// Firestore backend" errors caused by proxies/VPNs/extensions blocking the
// default gRPC-streaming transport — it falls back to long-polling only
// when the streaming connection actually fails.
//
// initializeFirestore can only run once per app instance; Next.js dev HMR
// re-runs this module against the same (already-initialized) app, so fall
// back to getFirestore() on the second and subsequent runs.
let db;
try {
  db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
} catch {
  db = getFirestore(app);
}
export { db };
export const auth = getAuth(app);

const PENDING_EMAIL_KEY = "voyagees:pendingSignInEmail";

// Passwordless email-link sign-in: the user gets a real link in their inbox
// and clicking it is Firebase's proof they own that address — no password,
// no third-party account required. Unlike signInWithPopup(Google), this
// never touches the authDomain's OAuth handler page, so it isn't affected by
// the 404 that broke Google sign-in.
export function sendLoginLink(email) {
  const actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true,
  };
  return sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
    window.localStorage.setItem(PENDING_EMAIL_KEY, email);
  });
}

// Call once on page load. If the current URL is a sign-in link, completes
// the sign-in and cleans the one-time code out of the URL. No-op otherwise.
export function completeEmailLinkSignIn() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!isSignInWithEmailLink(auth, window.location.href)) return Promise.resolve(null);

  let email = window.localStorage.getItem(PENDING_EMAIL_KEY);
  if (!email) {
    email = window.prompt("Confirm the email you used to request this link:");
  }
  if (!email) return Promise.resolve(null);

  return signInWithEmailLink(auth, email, window.location.href).then((result) => {
    window.localStorage.removeItem(PENDING_EMAIL_KEY);
    window.history.replaceState({}, document.title, window.location.pathname);
    return result.user;
  });
}

export { signOut };