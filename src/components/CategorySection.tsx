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
        whileTap={{ scale: 0.99 }}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">{category}</h3>
          <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-xs font-medium text-[var(--muted)]">
            {projects.length}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          className="text-sm text-[var(--muted)]"
        >
          ▶
        </motion.span>
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
              className="grid grid-cols-1 gap-5 pb-8 min-[480px]:grid-cols-2 min-[480px]:gap-4 sm:grid-cols-3 sm:gap-5"
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
