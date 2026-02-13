import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectWithImages } from "@/lib/types";
import {
  CARD_REVEAL_VARIANTS,
  SCROLL_REVEAL_TRANSITION,
} from "@/lib/animations";

type ProjectCardProps = {
  project: ProjectWithImages;
  onClick: (project: ProjectWithImages) => void;
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
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
      className="group relative w-full overflow-hidden rounded-2xl bg-black text-left"
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
    </motion.button>
  );
}
