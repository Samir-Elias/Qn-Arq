import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const cardRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <motion.button
      ref={cardRef}
      type="button"
      variants={CARD_REVEAL_VARIANTS}
      transition={SCROLL_REVEAL_TRANSITION}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(project)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white text-left shadow-sm transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <motion.div className="absolute inset-[-5%]" style={{ y: imageY }}>
          <Image
            src={cover}
            alt={project.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </motion.div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-black">
          {project.title}
        </h3>
        <p className="line-clamp-3 text-sm text-black/60">
          {project.description}
        </p>
      </div>
    </motion.button>
  );
}
