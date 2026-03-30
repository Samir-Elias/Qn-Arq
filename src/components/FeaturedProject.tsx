import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ProjectWithImages } from "@/lib/types";

type FeaturedProjectProps = {
  project: ProjectWithImages;
  onOpen: (project: ProjectWithImages) => void;
};

export function FeaturedProject({ project, onOpen }: FeaturedProjectProps) {
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
        className="group grid h-full w-full gap-4 p-4 text-left sm:grid-cols-[2fr_3fr] sm:gap-6 sm:p-8"
      >
        <motion.div
          className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:aspect-[4/3]"
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
            className="flex items-end gap-2"
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
    </motion.article>
  );
}
