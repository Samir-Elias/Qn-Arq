"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { ProjectWithImages } from "@/lib/types";
import { useTrackClick } from "@/hooks/useTrackClick";
import { trackWhatsAppClick as trackWAVercel, trackGalleryNavigation } from "@/lib/analytics";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

// Swipe detection thresholds
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

type ProjectModalProps = {
  project: ProjectWithImages | null;
  isOpen: boolean;
  onClose: () => void;
};

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5492612455281";

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { trackWhatsAppClick } = useTrackClick();

  // Reset image index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project?.id]);

  // All images sorted by display_order
  const allImages = project
    ? project.images.length > 0
      ? project.images
      : [
          {
            id: "placeholder",
            url: "/projects/placeholder.jpg",
            project_id: "",
            storage_path: "",
            display_order: 0,
            is_main: false,
            created_at: "",
          },
        ]
    : [];

  const handlePrevious = useCallback(() => {
    setActiveImageIndex((prev) => {
      const next = (prev - 1 + allImages.length) % allImages.length;
      if (project) trackGalleryNavigation(project.title, next);
      return next;
    });
  }, [allImages.length, project]);

  const handleNext = useCallback(() => {
    setActiveImageIndex((prev) => {
      const next = (prev + 1) % allImages.length;
      if (project) trackGalleryNavigation(project.title, next);
      return next;
    });
  }, [allImages.length, project]);

  // Keyboard navigation: arrow keys for carousel
  useEffect(() => {
    if (!isOpen || allImages.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, allImages.length, handlePrevious, handleNext]);

  if (!project) {
    return null;
  }

  const activeImage = allImages[activeImageIndex] ?? allImages[0];

  const whatsappMessage = encodeURIComponent(
    `Hola, te hablo por el proyecto "${project.title}". Estoy interesado y te hablo de parte de Samir.`
  );

  const handleWhatsAppClick = async () => {
    trackWAVercel("modal");
    await trackWhatsAppClick(project.id);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal container */}
          <motion.div
            className="relative z-10 mx-auto w-full max-w-3xl md:max-w-[92vw] lg:max-w-7xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <DialogPanel className="max-h-[85vh] overflow-y-auto rounded-3xl bg-white shadow-2xl md:grid md:grid-cols-[4fr_1fr] md:overflow-hidden">
              {/* ── Left: Image area (≈80%) ── */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black md:aspect-auto md:h-[85vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                    drag={allImages.length > 1 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(
                      _e: MouseEvent | TouchEvent | PointerEvent,
                      { offset, velocity }: PanInfo
                    ) => {
                      const swipe = swipePower(offset.x, velocity.x);
                      if (
                        swipe < -swipeConfidenceThreshold &&
                        activeImageIndex < allImages.length - 1
                      ) {
                        handleNext();
                      } else if (
                        swipe > swipeConfidenceThreshold &&
                        activeImageIndex > 0
                      ) {
                        handlePrevious();
                      }
                    }}
                    className="relative h-full w-full cursor-grab active:cursor-grabbing"
                  >
                    <Image
                      src={activeImage.url}
                      alt={`${project.title} imagen ${activeImageIndex + 1}`}
                      fill
                      className="pointer-events-none object-cover"
                      sizes="(min-width: 768px) 80vw, 100vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Dots indicator */}
                {allImages.length > 1 ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-1.5 pb-4">
                    {allImages.map((_, index) => (
                      <span
                        key={index}
                        className={`h-1.5 rounded-full transition-all ${
                          index === activeImageIndex
                            ? "w-6 bg-white"
                            : "w-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                ) : null}

                {/* Nav arrows */}
                {allImages.length > 1 ? (
                  <>
                    <div className="absolute inset-y-0 left-3 flex items-center">
                      <motion.button
                        type="button"
                        onClick={handlePrevious}
                        whileTap={{ scale: 0.9 }}
                        className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-sm text-black shadow-md backdrop-blur-sm transition hover:bg-white"
                      >
                        ◀
                      </motion.button>
                    </div>
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      <motion.button
                        type="button"
                        onClick={handleNext}
                        whileTap={{ scale: 0.9 }}
                        className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-sm text-black shadow-md backdrop-blur-sm transition hover:bg-white"
                      >
                        ▶
                      </motion.button>
                    </div>
                  </>
                ) : null}

                {/* Close button overlay (mobile only) */}
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-sm text-white/90 backdrop-blur-sm transition hover:bg-black/60 md:hidden"
                  aria-label="Cerrar"
                >
                  ✕
                </motion.button>

                {/* Image counter badge */}
                {allImages.length > 1 ? (
                  <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                    {activeImageIndex + 1} / {allImages.length}
                  </span>
                ) : null}
              </div>

              {/* ── Right: Info panel (≈20%) ── */}
              <div className="flex flex-col md:h-[85vh] md:overflow-y-auto">
                <div className="flex-1 space-y-4 p-5 md:p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-black/40">
                        {project.category}
                      </span>
                      <DialogTitle className="mt-1 text-lg font-semibold leading-tight md:text-base lg:text-lg">
                        {project.title}
                      </DialogTitle>
                    </div>
                    {/* Close button (desktop only) */}
                    <motion.button
                      type="button"
                      onClick={onClose}
                      whileTap={{ scale: 0.9 }}
                      className="hidden shrink-0 rounded-full bg-black/5 p-1.5 text-xs text-black/60 transition hover:bg-black/10 md:flex md:items-center md:justify-center"
                      aria-label="Cerrar"
                    >
                      ✕
                    </motion.button>
                  </div>

                  {/* Description */}
                  {project.description ? (
                    <p className="text-xs leading-relaxed text-black/60 md:text-[0.8rem]">
                      {project.description}
                    </p>
                  ) : null}

                  {/* Separator */}
                  {allImages.length > 1 ? (
                    <div className="h-px bg-black/5" />
                  ) : null}

                  {/* Thumbnails grid */}
                  {allImages.length > 1 ? (
                    <div>
                      <span className="mb-1.5 block text-[0.6rem] font-medium uppercase tracking-[0.2em] text-black/40">
                        Galería
                      </span>
                      <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5 md:grid-cols-2 lg:grid-cols-3">
                        {allImages.map((image, index) => (
                          <motion.button
                            key={image.id}
                            type="button"
                            onClick={() => {
                              trackGalleryNavigation(project.title, index);
                              setActiveImageIndex(index);
                            }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative aspect-square overflow-hidden rounded-md transition ${
                              index === activeImageIndex
                                ? "ring-2 ring-black ring-offset-1"
                                : "opacity-60 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={image.url}
                              alt={`${project.title} miniatura ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="70px"
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* WhatsApp CTA — sticky at bottom */}
                <div className="sticky bottom-0 border-t border-black/5 bg-white/95 p-3 md:p-3 backdrop-blur-sm">
                  <motion.button
                    type="button"
                    onClick={handleWhatsAppClick}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-400 md:text-[0.8rem]"
                  >
                    Contactar por WhatsApp
                  </motion.button>
                </div>
              </div>
            </DialogPanel>
          </motion.div>
        </Dialog>
      ) : null}
    </AnimatePresence>
  );
}
