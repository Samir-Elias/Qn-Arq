"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ProjectWithImages } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import {
  STAGGER_CONTAINER,
  EASE_OUT_EXPO,
} from "@/lib/animations";

type CategorySectionProps = {
  category: string;
  projects: ProjectWithImages[];
  isExpanded: boolean;
  onToggle: () => void;
  onProjectClick: (project: ProjectWithImages) => void;
};

export function CategorySection({
  category,
  projects,
  isExpanded,
  onToggle,
  onProjectClick,
}: CategorySectionProps) {
  return (
    <div className="border-b border-[var(--border)] last:border-b-0">
      {/* Header — clickeable para toggle */}
      <motion.button
        type="button"
        onClick={onToggle}
        whileTap={{ scale: 0.995 }}
        className="group flex w-full items-center gap-4 py-5 text-left transition-colors hover:text-[var(--accent)]"
      >
        {/* Accent bar */}
        <span className="h-6 w-1 rounded-full bg-[var(--accent)] opacity-80 transition-opacity group-hover:opacity-100" />
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold tracking-tight sm:text-lg">
              {category}
            </h3>
            <span className="rounded-full bg-black/[0.06] px-2.5 py-0.5 text-[0.65rem] font-semibold tabular-nums text-[var(--muted)]">
              {projects.length}
            </span>
          </div>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]"
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </div>
      </motion.button>

      {/* Body — grid de cards con animación */}
      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <motion.div
              className="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
              variants={STAGGER_CONTAINER}
              initial="hidden"
              animate="visible"
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={onProjectClick}
                />
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
