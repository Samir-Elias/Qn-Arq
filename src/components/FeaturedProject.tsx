import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ProjectWithImages } from "@/lib/types";

type FeaturedProjectProps = {
  project: ProjectWithImages;
  onOpen: (project: ProjectWithImages) => void;
  isAdmin?: boolean;
};

export function FeaturedProject({ project, onOpen, isAdmin = false }: FeaturedProjectProps) {
  const cover = project.main_image?.url ?? "/projects/placeholder.png";
  const previewImages = project.priority_images.slice(0, 4);
  const extraCount = Math.max(project.images.length - 5, 0);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <motion.article
      ref={containerRef}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white"
    >
      <motion.button
        type="button"
        onClick={() => onOpen(project)}
        whileTap={{ scale: 0.99 }}
        className="group grid h-full w-full gap-4 p-4 text-left sm:grid-cols-[1fr_1fr] sm:gap-6 sm:p-8"
      >
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl"
          style={{ y: imageY }}
        >
          <Image
            src={cover}
            alt={project.title}
            fill
            priority
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 640px) 40vw, 100vw"
          />
        </motion.div>
        <motion.div
          className="flex flex-col justify-between gap-4 sm:gap-6"
          style={{ y: textY }}
        >
          <header className="space-y-2 sm:space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              Proyecto destacado
            </span>
            <h2 className="text-2xl font-semibold sm:text-4xl">
              {project.title}
            </h2>
            <p className="line-clamp-2 text-sm text-white/70 sm:line-clamp-none sm:text-base">
              {project.description}
            </p>
          </header>
          <motion.div
            className="hidden items-end gap-2 sm:flex"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.55 } },
            }}
          >
            {previewImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="relative aspect-[4/3] flex-1 overflow-hidden rounded-lg border border-white/10"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
                }}
              >
                <Image
                  src={image.url}
                  alt={`${project.title} preview ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 14vw, (min-width: 640px) 20vw, 22vw"
                />
              </motion.div>
            ))}
            {extraCount > 0 ? (
              <motion.div
                className="flex flex-1 items-center justify-center text-xs text-white/60"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.3, delay: 0.7 } },
                }}
              >
                +{extraCount}
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      </motion.button>

      {/* Admin edit button */}
      {isAdmin ? (
        <Link
          href={`/admin/projects/${project.id}`}
          className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-black shadow backdrop-blur-sm transition-opacity hover:bg-white"
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
          Editar destacado
        </Link>
      ) : null}
    </motion.article>
  );
}
