"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projectsData";

type ProjectModalProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

const WHATSAPP_NUMBER = "5492611234567";

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) {
    return null;
  }

  const images = project.images.length ? project.images : ["/projects/placeholder.jpg"];
  const whatsappMessage = encodeURIComponent(
    `Hola, te hablo por el proyecto ${project.id}. Estoy interesado y te hablo de parte de Samir.`
  );

  const handlePrevious = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
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
          <motion.div
            className="fixed inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 mx-auto w-full max-w-3xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <DialogPanel className="overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="relative aspect-[4/3] w-full bg-black">
                <Image
                  src={images[activeImageIndex]}
                  alt={`${project.title} imagen ${activeImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                {images.length > 1 ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-4">
                    {images.map((_, index) => (
                      <span
                        key={index}
                        className={`h-2 w-8 rounded-full transition ${
                          index === activeImageIndex
                            ? "bg-white"
                            : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                ) : null}
                {images.length > 1 ? (
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="pointer-events-auto h-10 w-10 -translate-x-4 rounded-full bg-white/80 text-black shadow-md transition hover:bg-white"
                    >
                      ◀
                    </button>
                  </div>
                ) : null}
                {images.length > 1 ? (
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="pointer-events-auto h-10 w-10 translate-x-4 rounded-full bg-white/80 text-black shadow-md transition hover:bg-white"
                    >
                      ▶
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <DialogTitle className="text-2xl font-semibold">
                    {project.title}
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full bg-black/5 p-2 text-black/60 transition hover:bg-black/10"
                    aria-label="Cerrar"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-black/70 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative h-16 w-20 overflow-hidden rounded-xl border transition ${
                        index === activeImageIndex
                          ? "border-black"
                          : "border-black/10"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} miniatura ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
                >
                  Contactar por WhatsApp
                </a>
              </div>
            </DialogPanel>
          </motion.div>
        </Dialog>
      ) : null}
    </AnimatePresence>
  );
}

