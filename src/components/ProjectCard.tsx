import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projectsData";

type ProjectCardProps = {
  project: Project;
  onClick: (project: Project) => void;
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cover = project.images[0] ?? "/projects/placeholder.jpg";

  return (
    <motion.button
      type="button"
      layout
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(project)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white text-left shadow-sm transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={cover}
          alt={project.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold text-black line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-black/60 line-clamp-3">
          {project.description}
        </p>
      </div>
    </motion.button>
  );
}

