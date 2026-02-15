"use client";

import { useAnimate } from "framer-motion";
import { useEffect } from "react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

type SplashScreenProps = {
  onComplete: () => void;
};

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const sequence = async () => {
      if (prefersReducedMotion) {
        await animate(
          "[data-splash-logo]",
          { opacity: 1 },
          { duration: 0.3 }
        );
        await new Promise((r) => setTimeout(r, 500));
        onComplete();
        return;
      }

      // Phase 1: Logo entrance — spring scale from 0
      await animate(
        "[data-splash-logo]",
        { transform: "scale(1)", opacity: 1 },
        { type: "spring", stiffness: 200, damping: 20 }
      );

      // Phase 2: Brand moment — text + ripple + pulse (parallel)
      await Promise.all([
        animate(
          "[data-splash-text]",
          { opacity: 1, transform: "translateY(0px)" },
          { duration: 0.4, ease: "easeOut" }
        ),
        animate(
          "[data-splash-ripple]",
          { transform: "scale(1.8)", opacity: 0 },
          { duration: 0.9, ease: "easeOut" }
        ),
        animate(
          "[data-splash-logo]",
          { transform: ["scale(1)", "scale(1.06)", "scale(1)"] },
          { duration: 0.6, ease: "easeInOut" }
        ),
      ]);

      // Phase 3: Reposition to top — move up + scale down
      await Promise.all([
        animate(
          "[data-splash-group]",
          { transform: "translateY(-38vh) scale(0.45)" },
          { type: "spring", stiffness: 150, damping: 22 }
        ),
        animate(
          "[data-splash-text]",
          { opacity: 0 },
          { duration: 0.2, ease: "easeOut" }
        ),
      ]);

      // Phase 4: Reveal — background slides up, logo fades
      await Promise.all([
        animate(
          "[data-splash-bg]",
          { clipPath: "inset(0 0 100% 0)" },
          { duration: 0.55, ease: EASE_OUT_EXPO }
        ),
        animate(
          "[data-splash-logo]",
          { opacity: 0 },
          { duration: 0.3, delay: 0.15, ease: "easeOut" }
        ),
      ]);

      // Phase 5: Haptic feedback + cleanup
      if ("vibrate" in navigator) {
        navigator.vibrate(10);
      }
      onComplete();
    };

    sequence();
  }, [animate, onComplete]);

  return (
    <div
      ref={scope}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    >
      {/* Background overlay */}
      <div
        data-splash-bg
        className="absolute inset-0 bg-[var(--background)]"
        style={{ clipPath: "inset(0 0 0% 0)" }}
      />

      {/* Centered group: logo + text */}
      <div
        data-splash-group
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        {/* Ripple ring — centered on logo */}
        <div
          data-splash-ripple
          className="absolute w-[100px] h-[100px] rounded-full border border-[var(--accent)] opacity-40 pointer-events-none"
          style={{ transform: "scale(0.8)" }}
        />

        {/* Logo */}
        <div
          data-splash-logo
          className="flex items-center justify-center"
          style={{ transform: "scale(0)", opacity: 0 }}
        >
          <span className="text-6xl font-bold tracking-tight text-[var(--foreground)]">
            QÑ
          </span>
        </div>

        {/* Brand text */}
        <div
          data-splash-text
          className="mt-3 flex flex-col items-center"
          style={{ opacity: 0, transform: "translateY(10px)" }}
        >
          <span className="text-sm font-light tracking-[0.3em] uppercase text-[var(--muted)]">
            Arquitectura
          </span>
        </div>
      </div>
    </div>
  );
}
