"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import type { ProjectWithImages } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { trackProjectView } from "@/lib/analytics";
import {
  HERO_CONTAINER,
  HERO_ITEM,
  STAGGER_CONTAINER,
  HEADER_REVEAL_VARIANTS,
  SCROLL_REVEAL_TRANSITION,
} from "@/lib/animations";

type PlanosContentProps = {
  projects: ProjectWithImages[];
};

export function PlanosContent({ projects }: PlanosContentProps) {
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithImages | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenProject = (project: ProjectWithImages) => {
    trackProjectView(project.title);
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 200);
  };

  return (
    <main className="px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.header
          className="mb-8 sm:mb-12"
          variants={HERO_CONTAINER}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-block text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[var(--accent)]"
            variants={HERO_ITEM}
          >
            QÑ Arquitectura
          </motion.span>
          <motion.h1
            className="mt-1 text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
            variants={HERO_ITEM}
          >
            Planos
            <br />
            <span className="font-light">& documentación</span>
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base"
            variants={HERO_ITEM}
          >
            Documentación técnica, plantas, cortes y elevaciones de proyectos
            residenciales.
          </motion.p>
        </motion.header>

        {/* Count + divider */}
        <motion.div
          className="mb-6 flex items-center justify-between border-b border-[var(--border)] pb-4"
          variants={HEADER_REVEAL_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          transition={SCROLL_REVEAL_TRANSITION}
        >
          <span className="text-sm text-[var(--muted)]">
            {projects.length} {projects.length === 1 ? "plano" : "planos"}
          </span>
        </motion.div>

        {/* Grid or empty state */}
        {projects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleOpenProject}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex min-h-[40vh] flex-col items-center justify-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              className="mb-4 h-12 w-12 text-[var(--border)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <p className="text-sm font-medium text-[var(--foreground)]">
              Próximamente
            </p>
            <p className="mt-1 text-sm font-light text-[var(--muted)]">
              Los planos se están cargando al sistema.
            </p>
          </motion.div>
        )}
      </div>

      <Suspense>
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </Suspense>
    </main>
  );
}
