"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, completeEmailLinkSignIn } from "@/lib/firebase";

export function useAuthUser() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    completeEmailLinkSignIn().catch((err) => console.error("Email link sign-in failed:", err));
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
  }, []);

  return { user, authLoading };
}
