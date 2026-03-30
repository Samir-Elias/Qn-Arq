import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectWithImages } from "@/lib/types";
import {
  CARD_REVEAL_VARIANTS,
  SCROLL_REVEAL_TRANSITION,
} from "@/lib/animations";

type ProjectCardProps = {
  project: ProjectWithImages;
  onClick: (project: ProjectWithImages) => void;
  isAdmin?: boolean;
};

export function ProjectCard({ project, onClick, isAdmin = false }: ProjectCardProps) {
  const cover = project.main_image?.url ?? "/projects/placeholder.jpg";

  // Prefetch images on hover for instant perceived loading
  const handleMouseEnter = () => {
    project.images.forEach((img) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = img.url;
      document.head.appendChild(link);
    });
  };

  return (
    <motion.button
      type="button"
      variants={CARD_REVEAL_VARIANTS}
      transition={SCROLL_REVEAL_TRANSITION}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(project)}
      onMouseEnter={handleMouseEnter}
      className="group relative w-full overflow-hidden rounded-xl bg-black text-left"
    >
      {/* Image fills the card — 16:10 on mobile, 4:3 on desktop */}
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[4/3]">
        <Image
          src={cover}
          alt={project.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 640px) 33vw, 100vw"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      {/* Text over the image at bottom */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-3">
        <h3 className="line-clamp-2 text-base font-semibold text-white sm:text-sm">
          {project.title}
        </h3>
        {project.description ? (
          <p className="mt-1 line-clamp-2 text-sm text-white/70 sm:line-clamp-1 sm:text-xs">
            {project.description}
          </p>
        ) : null}
      </div>

      {/* Admin edit button */}
      {isAdmin ? (
        <Link
          href={`/admin/projects/${project.id}`}
          onClick={(e) => e.stopPropagation()}
          className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-black shadow backdrop-blur-sm transition-opacity hover:bg-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-3 w-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
            />
          </svg>
          Editar
        </Link>
      ) : null}
    </motion.button>
  );
}
