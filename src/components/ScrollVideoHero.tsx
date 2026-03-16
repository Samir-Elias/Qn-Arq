"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
} from "framer-motion";

const FRAME_COUNT = 151;

function padNum(n: number) {
  return String(n).padStart(4, "0");
}

export function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.78, 0.96], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.78, 0.96], [24, 0]);

  const render = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const img = imagesRef.current[index];
      if (!canvas || !img?.complete || !img.naturalWidth) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      ctx.clearRect(0, 0, cw, ch);

      if (isMobile) {
        // Mobile: cover — fill viewport, crop sides
        const scale = Math.max(cw / iw, ch / ih);
        const sw = cw / scale;
        const sh = ch / scale;
        const sx = (iw - sw) / 2;
        const sy = (ih - sh) / 2;
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
      } else {
        // Desktop: no distortion — canvas has same aspect ratio as video
        ctx.drawImage(img, 0, 0, iw, ih, 0, 0, cw, ch);
      }
    },
    [isMobile],
  );

  // Preload all frames
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/hero-frames/frame_${padNum(i + 1)}.jpg`;
      img.onload = () => {
        if (i === 0) render(0);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, [render]);

  // Handle canvas DPI + resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      render(currentFrameRef.current);
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);
    setSize();
    return () => ro.disconnect();
  }, [render]);

  // If reduced motion: show last frame statically
  useEffect(() => {
    if (!prefersReducedMotion) return;
    const img = new Image();
    img.src = `/hero-frames/frame_${padNum(FRAME_COUNT)}.jpg`;
    img.onload = () => {
      imagesRef.current[FRAME_COUNT - 1] = img;
      currentFrameRef.current = FRAME_COUNT - 1;
      render(FRAME_COUNT - 1);
    };
    if (img.complete) {
      currentFrameRef.current = FRAME_COUNT - 1;
      render(FRAME_COUNT - 1);
    }
  }, [prefersReducedMotion, render]);

  // Scroll → frame sync
  useEffect(() => {
    if (prefersReducedMotion) return;

    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.max(Math.round(v * (FRAME_COUNT - 1)), 0),
        FRAME_COUNT - 1,
      );
      if (idx !== currentFrameRef.current) {
        currentFrameRef.current = idx;
        render(idx);
      }
    });
  }, [scrollYProgress, prefersReducedMotion, render]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: prefersReducedMotion ? "100vh" : "220vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#f5f2ee]">
        {/* Canvas — cover en mobile, aspect-ratio exacto en desktop */}
        <canvas
          ref={canvasRef}
          className={
            isMobile
              ? "absolute inset-0 h-full w-full"
              : "w-full"
          }
          style={isMobile ? undefined : { aspectRatio: "5 / 3", maxHeight: "100vh" }}
        />

        {/* Scroll hint — fades out on first scroll */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-[var(--muted)]">
            Scroll
          </span>
          <div className="h-8 w-px animate-pulse bg-[var(--muted)]/40" />
        </motion.div>

        {/* Hero text — appears as animation completes */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-12 md:px-12 lg:px-20"
        >
          <div className="mx-auto max-w-4xl space-y-3 text-center">
            <span className="inline-block text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[var(--accent)]">
              Arq. Juan Ignacio Flores — Mendoza
            </span>
            <h1 className="text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              Construimos
              <br />
              <span className="font-light">ideas</span>
            </h1>
            <p className="mx-auto max-w-md text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base">
              Arquitectura residencial en Mendoza. Cada espacio diseñado para
              vivirse.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
