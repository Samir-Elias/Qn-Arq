"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FaqItem } from "@/lib/data/content";
import { ContentEditModal } from "@/components/admin/ContentEditModal";
import { HERO_CONTAINER, HERO_ITEM, EASE_OUT_EXPO } from "@/lib/animations";

type FaqContentProps = {
  faqs: FaqItem[];
  isAdmin?: boolean;
  onUpdate?: (id: string, formData: FormData) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
};

function FaqItem({
  faq,
  isAdmin,
  onEdit,
}: {
  faq: FaqItem;
  isAdmin: boolean;
  onEdit: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group relative border-b border-[var(--border)] last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-medium leading-snug sm:text-base">
          {faq.pregunta}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
          className="mt-0.5 shrink-0"
        >
          <svg className="h-4 w-4 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base">
              {faq.respuesta}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin edit */}
      {isAdmin ? (
        <button
          type="button"
          onClick={onEdit}
          className="absolute right-8 top-4 flex cursor-pointer items-center gap-1 rounded-full bg-black/80 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
          </svg>
          Editar
        </button>
      ) : null}
    </div>
  );
}

export function FaqContent({
  faqs,
  isAdmin = false,
  onUpdate,
}: FaqContentProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const editing = faqs.find((f) => f.id === editingId);

  return (
    <main className="px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-12">
      <div className="mx-auto max-w-3xl">
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
            Preguntas frecuentes
          </motion.span>
          <motion.h1
            className="mt-1 text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
            variants={HERO_ITEM}
          >
            Todo lo
            <br />
            <span className="font-light">que querés saber</span>
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md text-sm font-light leading-relaxed text-[var(--muted)] sm:text-base"
            variants={HERO_ITEM}
          >
            Las dudas más comunes antes de arrancar un proyecto.
          </motion.p>
        </motion.header>

        {/* FAQ list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isAdmin={isAdmin}
              onEdit={() => setEditingId(faq.id)}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 rounded-2xl bg-[var(--foreground)] p-8 text-[var(--background)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] opacity-50">¿No encontrás lo que buscás?</p>
          <p className="mt-2 text-xl font-semibold">Escribime directamente</p>
          <p className="mt-1 text-sm font-light opacity-60">Cualquier consulta que tengas, sin compromiso.</p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5492612455281"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 bg-[var(--background)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-opacity hover:opacity-80"
          >
            WhatsApp
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Edit modal */}
      {editing && onUpdate ? (
        <ContentEditModal
          title="Editar pregunta"
          fields={[
            { name: "pregunta", label: "Pregunta", type: "text", value: editing.pregunta },
            { name: "respuesta", label: "Respuesta", type: "textarea", rows: 5, value: editing.respuesta },
          ]}
          onSave={(formData) => onUpdate(editing.id, formData)}
          onClose={() => setEditingId(null)}
        />
      ) : null}
    </main>
  );
}
