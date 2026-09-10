"use client";

import { useState } from "react";
import { sendLoginLink } from "@/lib/firebase";
import "./EmailSignIn.css";

export default function EmailSignIn({ prompt = "Sign in to continue" }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await sendLoginLink(email.trim());
      setSent(true);
    } catch (err) {
      console.error("sendLoginLink failed:", err);
      setError(`Couldn't send the sign-in link (${err.code || err.message}).`);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <p className="email-signin-sent">
        Check {email} for a sign-in link, then come back to this page.
      </p>
    );
  }

  return (
    <form className="email-signin-form" onSubmit={handleSubmit}>
      <p className="email-signin-prompt">{prompt}</p>
      <div className="email-signin-row">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={sending}>
          {sending ? "Sending…" : "Email me a sign-in link"}
        </button>
      </div>
      {error && <p className="email-signin-error">{error}</p>}
    </form>
  );
}
