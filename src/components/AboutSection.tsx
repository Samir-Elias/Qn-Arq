"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  SECTION_REVEAL_VARIANTS,
  SCROLL_REVEAL_TRANSITION,
  STAGGER_CONTAINER,
  HERO_ITEM,
} from "@/lib/animations";

const VIEWPORT_EAGER = { once: true, amount: 0 as const };

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5492614666991";

const SERVICES = [
  "Diseño residencial",
  "Proyecto y dirección de obra",
  "Remodelaciones",
  "Planos y documentación",
];

export function AboutSection() {
  const whatsappMessage = encodeURIComponent(
    "Hola Juan Ignacio, te contacto desde tu web. Me interesa consultar por un proyecto. Te hablo de parte de Samir."
  );

  return (
    <section id="sobre-mi" className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      {/* Título cinematográfico */}
      <motion.div
        className="mb-6 sm:mb-8"
        variants={SECTION_REVEAL_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_EAGER}
      >
        <h2 className="text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          Detrás de
          <br />
          <span className="font-light">cada proyecto</span>
        </h2>
      </motion.div>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
        {/* Foto del arquitecto */}
        <motion.div
          className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[1/1] lg:aspect-[3/4]"
          variants={SECTION_REVEAL_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EAGER}
          transition={SCROLL_REVEAL_TRANSITION}
        >
          <Image
            src="/projects/project1-1.jpg"
            alt="Arq. Juan Ignacio Flores"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="flex flex-col justify-center"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EAGER}
        >
          <motion.p
            className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-[var(--accent)]"
            variants={HERO_ITEM}
          >
            Arq. Juan Ignacio Flores
          </motion.p>

          <motion.p
            className="mb-8 text-base font-light leading-relaxed text-[var(--muted)] sm:text-lg"
            variants={HERO_ITEM}
          >
            Soy Juan Ignacio, arquitecto mendocino. Diseño y construyo espacios
            que se viven, no solo se miran. Desde casas en barrios privados hasta
            departamentos que aprovechan cada metro, cada proyecto lo tomo como
            propio.
          </motion.p>

          {/* Servicios */}
          <motion.div className="mb-10" variants={HERO_ITEM}>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--foreground)]">
              Servicios
            </p>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 text-sm font-light text-[var(--muted)]"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.div variants={HERO_ITEM}>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-80"
            >
              Contame tu proyecto
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
