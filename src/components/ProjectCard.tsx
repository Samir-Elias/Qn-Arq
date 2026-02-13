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
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(project)}
      onMouseEnter={handleMouseEnter}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white text-left shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden min-[480px]:aspect-[4/5]">
        <div className="absolute inset-0">
          <Image
            src={cover}
            alt={project.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, (min-width: 480px) 50vw, 100vw"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3 min-[480px]:gap-2 min-[480px]:p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-black min-[480px]:text-base">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-xs text-black/60 min-[480px]:line-clamp-3 min-[480px]:text-sm">
          {project.description}
        </p>
      </div>
    </motion.button>
  );
}
