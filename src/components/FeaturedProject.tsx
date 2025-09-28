import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projectsData";

type FeaturedProjectProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export function FeaturedProject({ project, onOpen }: FeaturedProjectProps) {
  const cover = project.images[0] ?? "/projects/placeholder.png";

  return (
    <motion.article
      layout
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="group grid h-full w-full gap-6 p-6 text-left sm:grid-cols-[2fr_3fr] sm:p-8"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src={cover}
            alt={project.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 640px) 40vw, 100vw"
          />
        </div>
        <div className="flex flex-col justify-between gap-6">
          <header className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
              Proyecto destacado
            </span>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {project.title}
            </h2>
            <p className="text-sm text-white/70 sm:text-base">
              {project.description}
            </p>
          </header>
          <div className="flex flex-wrap items-center gap-3">
            {project.images.slice(0, 3).map((image, index) => (
              <motion.div
                key={image}
                className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Image
                  src={image}
                  alt={`${project.title} preview ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </motion.div>
            ))}
            <span className="text-xs text-white/60">
              +{Math.max(project.images.length - 3, 0)} imágenes más
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

