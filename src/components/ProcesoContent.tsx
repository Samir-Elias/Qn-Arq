"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { PasoProceso } from "@/lib/data/content";
import { ContentEditModal } from "@/components/admin/ContentEditModal";
import {
  HERO_CONTAINER,
  HERO_ITEM,
  SCROLL_REVEAL_TRANSITION,
} from "@/lib/animations";

type ProcesoContentProps = {
  pasos: PasoProceso[];
  isAdmin?: boolean;
  onUpdatePaso?: (id: string, formData: FormData) => Promise<void>;
  onDeletePaso?: (id: string) => Promise<void>;
};

const VIEWPORT = { once: true, amount: 0.2 } as const;

export function ProcesoContent({
  pasos,
  isAdmin = false,
  onUpdatePaso,
}: ProcesoContentProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const editingPaso = pasos.find((p) => p.id === editingId);

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
          <div className="absolute bottom-0 left-[1.85rem] top-0 w-px bg-[var(--border)] sm:left-[2.35rem]" />
          <div className="space-y-0">
            {pasos.map((paso, index) => (
              <motion.div
                key={paso.id}
                className="group relative flex gap-6 sm:gap-10"
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

                {/* Admin edit button */}
                {isAdmin && onUpdatePaso ? (
                  <button
                    type="button"
                    onClick={() => setEditingId(paso.id)}
                    className="absolute right-0 top-4 flex cursor-pointer items-center gap-1.5 rounded-full bg-black/80 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow backdrop-blur-sm transition-opacity group-hover:opacity-100"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                    </svg>
                    Editar
                  </button>
                ) : null}
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
          <p className="text-sm font-light text-[var(--muted)]">¿Listo para empezar?</p>
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

      {/* Edit modal */}
      {editingPaso && onUpdatePaso ? (
        <ContentEditModal
          title={`Editar paso ${editingPaso.numero}`}
          fields={[
            { name: "titulo", label: "Título", type: "text", value: editingPaso.titulo },
            { name: "duracion", label: "Duración", type: "text", value: editingPaso.duracion },
            { name: "descripcion", label: "Descripción", type: "textarea", rows: 5, value: editingPaso.descripcion },
          ]}
          onSave={(formData) => onUpdatePaso(editingPaso.id, formData)}
          onClose={() => setEditingId(null)}
        />
      ) : null}
    </main>
  );
}
