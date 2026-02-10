"use client";

import { Suspense, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectWithImages } from "@/lib/types";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import {
  HERO_CONTAINER,
  HERO_ITEM,
  FEATURED_REVEAL,
  SCROLL_REVEAL_TRANSITION,
  STAGGER_CONTAINER,
  HEADER_REVEAL_VARIANTS,
  VIEWPORT_CONFIG_HEADER,
} from "@/lib/animations";

type HomeContentProps = {
  featured: ProjectWithImages | null;
  projects: ProjectWithImages[];
  totalCount: number;
};

export function HomeContent({
  featured,
  projects,
  totalCount,
}: HomeContentProps) {
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithImages | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : SCROLL_REVEAL_TRANSITION;

  const handleOpenProject = (project: ProjectWithImages) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 200);
  };

  return (
    <main className="px-4 pb-16 sm:px-6 lg:px-12">
      {/* Hero */}
      <section className="pb-16 pt-16 sm:pt-20 lg:pt-24">
        <motion.div
          className="mx-auto max-w-3xl space-y-5 text-center"
          variants={HERO_CONTAINER}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-block text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[var(--muted)]"
            variants={HERO_ITEM}
          >
            QÑ Arquitectura
          </motion.span>
          <motion.h1
            className="text-4xl font-light leading-[1.1] sm:text-5xl lg:text-6xl"
            variants={HERO_ITEM}
          >
            Espacios que inspiran,{" "}
            <span className="font-semibold">diseños que trascienden</span>
          </motion.h1>
          <motion.p
            className="mx-auto max-w-lg text-sm leading-relaxed text-[var(--muted)] sm:text-base"
            variants={HERO_ITEM}
          >
            Estudio especializado en arquitectura contemporánea con foco en
            experiencias memorables y materiales nobles.
          </motion.p>
        </motion.div>

        {featured ? (
          <motion.div
            className="mt-10 sm:mt-14"
            variants={FEATURED_REVEAL}
            initial="hidden"
            animate="visible"
          >
            <FeaturedProject project={featured} onOpen={handleOpenProject} />
          </motion.div>
        ) : null}
      </section>

      {/* Separador */}
      <div className="mx-auto mb-12 h-px w-16 bg-[var(--border)]" />

      {/* Proyectos */}
      <section className="space-y-5">
        <motion.header
          className="flex items-center justify-between"
          variants={HEADER_REVEAL_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG_HEADER}
          transition={transition}
        >
          <h2 className="text-xl font-semibold">Todos los proyectos</h2>
          <span className="text-sm text-[var(--muted)]">
            {totalCount} proyectos realizados
          </span>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[480px]:gap-3 sm:grid-cols-3 sm:gap-4"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleOpenProject}
            />
          ))}
        </motion.div>
      </section>

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
