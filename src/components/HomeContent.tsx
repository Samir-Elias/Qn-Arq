"use client";

import { Suspense, useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectWithImages } from "@/lib/types";
import { PROJECT_CATEGORIES } from "@/lib/types";
import { FeaturedProject } from "@/components/FeaturedProject";
import { CategorySection } from "@/components/CategorySection";
import { ProjectModal } from "@/components/ProjectModal";
import {
  HERO_CONTAINER,
  HERO_ITEM,
  FEATURED_REVEAL,
  SCROLL_REVEAL_TRANSITION,
  HEADER_REVEAL_VARIANTS,
  VIEWPORT_CONFIG_HEADER,
  SECTION_REVEAL_VARIANTS,
  VIEWPORT_CONFIG,
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
  // Projects without a category (migration not yet run) fall into "Otros"
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

  // First category with projects starts expanded
  const firstCategory = categorizedProjects.keys().next().value;
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set<string>()
  );

  // Ensure first category is always expanded (even on first render)
  const effectiveExpanded = useMemo(() => {
    const set = new Set(expandedCategories);
    if (firstCategory) set.add(firstCategory);
    return set;
  }, [expandedCategories, firstCategory]);

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

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return (
    <main className="px-4 pb-24 sm:px-6 lg:px-12">
      {/* Hero */}
      <section className="pb-20 pt-16 sm:pt-20 lg:pt-28">
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
            className="mt-12 sm:mt-16"
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
        className="mx-auto mb-16 h-px w-24 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"
        variants={SECTION_REVEAL_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        transition={transition}
      />

      {/* Proyectos por categoría */}
      <section>
        <motion.header
          className="mb-6 flex items-center justify-between"
          variants={HEADER_REVEAL_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG_HEADER}
          transition={transition}
        >
          <h2 className="text-xl font-semibold">Proyectos</h2>
          <span className="text-sm text-[var(--muted)]">
            {totalCount} realizados
          </span>
        </motion.header>

        <div className="rounded-2xl border border-[var(--border)] bg-white px-5 sm:px-6">
          {Array.from(categorizedProjects.entries()).map(
            ([category, catProjects]) => (
              <CategorySection
                key={category}
                category={category}
                projects={catProjects}
                isExpanded={effectiveExpanded.has(category)}
                onToggle={() => toggleCategory(category)}
                onProjectClick={handleOpenProject}
              />
            )
          )}
        </div>
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
