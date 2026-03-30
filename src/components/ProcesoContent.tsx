"use client";

import { motion } from "framer-motion";
import {
  HERO_CONTAINER,
  HERO_ITEM,
  SCROLL_REVEAL_TRANSITION,
} from "@/lib/animations";

const PASOS = [
  {
    numero: "01",
    titulo: "Primera consulta",
    descripcion:
      "Nos juntamos (presencial o por video) para que me cuentes tu idea, el terreno o la propiedad, y lo que necesitás. Sin costo y sin compromiso.",
    duracion: "1 reunión",
  },
  {
    numero: "02",
    titulo: "Anteproyecto",
    descripcion:
      "Desarrollamos la propuesta inicial: plantas, volumetría y materialidad. Acá es donde la idea toma forma visual por primera vez. Se ajusta hasta que esté exactamente como querés.",
    duracion: "2–3 semanas",
  },
  {
    numero: "03",
    titulo: "Proyecto ejecutivo",
    descripcion:
      "Con el anteproyecto aprobado, generamos la documentación técnica completa: planos de arquitectura, cortes, elevaciones, detalles constructivos y memoria descriptiva.",
    duracion: "4–6 semanas",
  },
  {
    numero: "04",
    titulo: "Gestión municipal",
    descripcion:
      "Tramitamos los permisos y aprobaciones municipales necesarios. Coordinamos con el municipio y resolvemos los requisitos administrativos.",
    duracion: "Variable según municipio",
  },
  {
    numero: "05",
    titulo: "Dirección de obra",
    descripcion:
      "Durante la construcción supervisamos que todo se ejecute conforme al proyecto. Visitas periódicas a obra, coordinación con contratistas y resolución de imprevistos.",
    duracion: "Duración de la obra",
  },
];

const VIEWPORT = { once: true, amount: 0.2 } as const;

export function ProcesoContent() {
  return (
    <main className="px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.header
          className="mb-12 sm:mb-16"
          variants={HERO_CONTAINER}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-block text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[var(--accent)]"
            variants={HERO_ITEM}
          >
            Cómo trabajamos
          </motion.span>
          <motion.h1
            className="mt-1 text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
            variants={HERO_ITEM}
          >
            Del boceto
            <br />
            <span className="font-light">a la obra</span>
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base"
            variants={HERO_ITEM}
          >
            Un proceso claro, sin sorpresas, donde sabés qué esperar en cada etapa.
          </motion.p>
        </motion.header>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[1.85rem] top-0 bottom-0 w-px bg-[var(--border)] sm:left-[2.35rem]" />

          <div className="space-y-0">
            {PASOS.map((paso, index) => (
              <motion.div
                key={paso.numero}
                className="relative flex gap-6 sm:gap-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ ...SCROLL_REVEAL_TRANSITION, delay: index * 0.08 }}
              >
                {/* Number circle */}
                <div className="relative z-10 flex shrink-0 flex-col items-center">
                  <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] sm:h-[4.75rem] sm:w-[4.75rem]">
                    <span className="text-sm font-bold tabular-nums text-[var(--accent)] sm:text-base">
                      {paso.numero}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="pb-10 pt-4 sm:pt-5">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className="text-lg font-semibold sm:text-xl">{paso.titulo}</h2>
                    <span className="text-xs text-[var(--muted)]">{paso.duracion}</span>
                  </div>
                  <p className="mt-2 text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base">
                    {paso.descripcion}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-4 border-t border-[var(--border)] pt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-light text-[var(--muted)]">
            ¿Listo para empezar?
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5492612455281"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-80"
          >
            Arrancamos con la primera consulta
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>
        </motion.div>
      </div>
    </main>
  );
}
