"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { SplashScreen } from "./SplashScreen";

const STORAGE_KEY = "qn-splash-seen";

export function SplashProvider({ children }: { children: ReactNode }) {
  // Start with splash visible — consistent on server & client (no hydration mismatch)
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        // Returning visitor — skip splash instantly
        setShowSplash(false);
        return;
      }
    } catch {
      setShowSplash(false);
      return;
    }
    // First visit — lock scroll during animation
    document.documentElement.classList.add("splash-active");
  }, []);

  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    document.documentElement.classList.remove("splash-active");
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleComplete} />}
      {children}
    </>
  );
}
