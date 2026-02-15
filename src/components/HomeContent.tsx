"use client";

import { Suspense, useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { ProjectWithImages } from "@/lib/types";
import { PROJECT_CATEGORIES } from "@/lib/types";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { AboutSection } from "@/components/AboutSection";
import {
  HERO_CONTAINER,
  HERO_ITEM,
  FEATURED_REVEAL,
  SCROLL_REVEAL_TRANSITION,
  HEADER_REVEAL_VARIANTS,
  VIEWPORT_CONFIG_HEADER,
  SECTION_REVEAL_VARIANTS,
  VIEWPORT_CONFIG,
  STAGGER_CONTAINER,
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

  // Group projects by category, maintaining fixed order
  const categorizedProjects = useMemo(() => {
    const grouped = new Map<string, ProjectWithImages[]>();
    for (const cat of PROJECT_CATEGORIES) {
      const catProjects = projects.filter(
        (p) => (p.category || "Otros") === cat
      );
      if (catProjects.length > 0) {
        grouped.set(cat, catProjects);
      }
    }
    return grouped;
  }, [projects]);

  // Available categories (only those with projects)
  const availableCategories = useMemo(
    () => Array.from(categorizedProjects.keys()),
    [categorizedProjects]
  );

  // Active tab — first category with projects
  const [activeCategory, setActiveCategory] = useState<string>(
    () => availableCategories[0] ?? "Otros"
  );

  const activeProjects = categorizedProjects.get(activeCategory) ?? [];

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
    <main className="px-4 pb-12 sm:px-6 lg:px-12">
      {/* Hero — cinematográfico */}
      <section className="pb-3 pt-16 sm:pt-20 lg:pb-6 lg:pt-24">
        <motion.div
          className="mx-auto max-w-4xl space-y-3 text-center sm:space-y-5"
          variants={HERO_CONTAINER}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-block text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[var(--accent)]"
            variants={HERO_ITEM}
          >
            Arq. Juan Ignacio Flores — Mendoza
          </motion.span>
          <motion.h1
            className="text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
            variants={HERO_ITEM}
          >
            Construimos
            <br />
            <span className="font-light">ideas</span>
          </motion.h1>
          <motion.p
            className="mx-auto max-w-md text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base"
            variants={HERO_ITEM}
          >
            Arquitectura residencial en Mendoza. Cada espacio diseñado para
            vivirse.
          </motion.p>
        </motion.div>

        {featured ? (
          <motion.div
            className="mt-6 sm:mt-10 lg:mt-12"
            variants={FEATURED_REVEAL}
            initial="hidden"
            animate="visible"
          >
            <FeaturedProject project={featured} onOpen={handleOpenProject} />
          </motion.div>
        ) : null}
      </section>

      {/* Separador */}
      <motion.div
        className="mx-auto mb-3 h-px w-24 bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent lg:mb-4"
        variants={SECTION_REVEAL_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        transition={transition}
      />

      {/* Proyectos por categoría — tabs horizontales */}
      <section id="proyectos">
        <motion.header
          className="mb-4 flex items-center justify-between"
          variants={HEADER_REVEAL_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          transition={transition}
        >
          <h2 className="text-xl font-semibold">Proyectos</h2>
          <span className="text-sm text-[var(--muted)]">
            {totalCount} realizados
          </span>
        </motion.header>

        {/* Tab bar */}
        <div className="mb-5 flex gap-6 overflow-x-auto overflow-y-hidden border-b border-[var(--border)] scrollbar-none">
          {availableCategories.map((cat) => {
            const isActive = cat === activeCategory;
            const count = categorizedProjects.get(cat)?.length ?? 0;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative shrink-0 !p-0 !pb-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {cat}
                <span className="ml-1 text-xs tabular-nums opacity-50">
                  {count}
                </span>
                {isActive ? (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Projects grid — same space, content swaps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              variants={STAGGER_CONTAINER}
              initial="hidden"
              animate="visible"
            >
              {activeProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={handleOpenProject}
                />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Sobre el arquitecto */}
      <AboutSection />

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
