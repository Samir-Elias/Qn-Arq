"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Testimonio } from "@/lib/data/content";
import { ContentEditModal } from "@/components/admin/ContentEditModal";
import {
  HERO_CONTAINER,
  HERO_ITEM,
  STAGGER_CONTAINER,
  CARD_REVEAL_VARIANTS,
  SCROLL_REVEAL_TRANSITION,
} from "@/lib/animations";

type TestimoniosContentProps = {
  testimonios: Testimonio[];
  isAdmin?: boolean;
  onUpdate?: (id: string, formData: FormData) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
};

export function TestimoniosContent({
  testimonios,
  isAdmin = false,
  onUpdate,
}: TestimoniosContentProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = testimonios.find((t) => t.id === editingId);

  return (
    <main className="px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
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
            Lo que dicen
          </motion.span>
          <motion.h1
            className="mt-1 text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
            variants={HERO_ITEM}
          >
            Clientes
            <br />
            <span className="font-light">& proyectos</span>
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base"
            variants={HERO_ITEM}
          >
            Cada proyecto es una historia. Estas son algunas de las familias con las que trabajamos.
          </motion.p>
        </motion.header>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
        >
          {testimonios.map((t) => (
            <motion.article
              key={t.id}
              variants={CARD_REVEAL_VARIANTS}
              transition={SCROLL_REVEAL_TRANSITION}
              className="group relative flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-6"
            >
              <svg className="h-6 w-6 text-[var(--accent)]/40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003z" />
              </svg>
              <p className="flex-1 text-sm font-light leading-relaxed text-[var(--foreground)]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-[var(--border)] pt-4">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">{t.project}</p>
              </div>

              {/* Admin edit */}
              {isAdmin && onUpdate ? (
                <button
                  type="button"
                  onClick={() => setEditingId(t.id)}
                  className="absolute right-3 top-3 flex cursor-pointer items-center gap-1 rounded-full bg-black/80 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                  </svg>
                  Editar
                </button>
              ) : null}
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 border-t border-[var(--border)] pt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-light text-[var(--muted)]">¿Querés ser el próximo?</p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5492612455281"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-80"
          >
            Contame tu proyecto
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Edit modal */}
      {editing && onUpdate ? (
        <ContentEditModal
          title="Editar testimonio"
          fields={[
            { name: "name", label: "Nombre / Familia", type: "text", value: editing.name },
            { name: "project", label: "Proyecto", type: "text", value: editing.project },
            { name: "quote", label: "Testimonio", type: "textarea", rows: 5, value: editing.quote },
          ]}
          onSave={(formData) => onUpdate(editing.id, formData)}
          onClose={() => setEditingId(null)}
        />
      ) : null}
    </main>
  );
}
