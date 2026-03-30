"use client";

import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
} from "framer-motion";

export function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Compact heights — enough to feel like a reveal, not an endurance test
  const containerHeight = prefersReducedMotion
    ? "100vh"
    : isMobile
    ? "115vh"
    : "145vh";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Compressed animation windows — everything happens in the first ~80% of scroll
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const overlayOpacity    = useTransform(scrollYProgress, [0.1, 0.70], [0.0, 0.62]);
  const eyebrowOpacity    = useTransform(scrollYProgress, [0.35, 0.58], [0, 1]);
  const textOpacity       = useTransform(scrollYProgress, [0.42, 0.68], [0, 1]);
  const textY             = useTransform(scrollYProgress, [0.42, 0.68], [40, 0]);
  const subtextOpacity    = useTransform(scrollYProgress, [0.52, 0.78], [0, 1]);
  const subtextY          = useTransform(scrollYProgress, [0.52, 0.78], [24, 0]);

  // Play once → freeze on last frame → auto-scroll past hero after 3 s
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    video.play().catch(() => {});

    const onEnded = () => {
      setTimeout(() => {
        const container = containerRef.current;
        if (!container) return;
        window.scrollTo({
          top: container.offsetTop + container.offsetHeight,
          behavior: "smooth",
        });
      }, 3000);
    };

    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: containerHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080808]">

        {/* ── Video ───────────────────────────────────────────── */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-video/newhero.mp4"
          muted
          playsInline
          preload="auto"
          // Sharpening filter to compensate for source quality
          style={{
            filter: "contrast(1.12) saturate(1.08) brightness(1.02)",
          }}
        />

        {/* ── Film grain ───────────────────────────────────────── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* ── Gradients ────────────────────────────────────────── */}
        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black/20 to-transparent" />

        {/* ── Dynamic overlay ──────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />

        {/* ── Scroll hint ──────────────────────────────────────── */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
          aria-hidden="true"
        >
          <span className="text-[0.5rem] font-semibold uppercase tracking-[0.55em] text-white/40">
            Scroll
          </span>
          <motion.div
            className="w-px bg-gradient-to-b from-white/50 to-transparent"
            style={{ height: 44 }}
            animate={{ scaleY: [1, 0.35, 1], opacity: [0.55, 0.15, 0.55] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* ── Hero copy ────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-7 pb-14 md:px-14 lg:px-20 xl:px-28">

          <motion.div style={{ opacity: eyebrowOpacity }} className="mb-5 flex items-center gap-3">
            <span className="h-px w-7 shrink-0 bg-[var(--accent)]" />
            <span className="text-[0.52rem] font-semibold uppercase tracking-[0.5em] text-[var(--accent)]">
              Arq. Juan Ignacio Flores — Mendoza
            </span>
          </motion.div>

          <motion.h1
            style={{ opacity: textOpacity, y: textY, fontSize: "clamp(3.25rem, 10vw, 9rem)" }}
            className="font-bold uppercase leading-[0.87] tracking-tighter text-white"
          >
            Construimos
            <br />
            <span className="font-extralight italic tracking-normal text-white/70">
              ideas
            </span>
          </motion.h1>

          <motion.div style={{ opacity: subtextOpacity, y: subtextY }}>
            <p className="mt-5 max-w-[28ch] text-[0.78rem] font-light leading-[1.9] tracking-wide text-white/45 sm:text-[0.83rem]">
              Arquitectura residencial en Mendoza.
              <br />
              Cada espacio diseñado para vivirse.
            </p>
            <div className="mt-6 h-px w-10 bg-[var(--accent)]/50" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
