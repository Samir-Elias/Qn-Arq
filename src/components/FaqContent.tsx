"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HERO_CONTAINER,
  HERO_ITEM,
  EASE_OUT_EXPO,
} from "@/lib/animations";

const FAQS = [
  {
    id: 1,
    pregunta: "¿Cuánto cuesta contratar un arquitecto?",
    respuesta:
      "Los honorarios varían según el tipo y escala del proyecto. En general se calculan como un porcentaje del costo de obra (entre el 8% y el 15%) o por metro cuadrado diseñado. En la primera consulta te damos un presupuesto claro según tu caso.",
  },
  {
    id: 2,
    pregunta: "¿Cuánto tarda el proyecto en estar listo?",
    respuesta:
      "El anteproyecto toma 2 a 3 semanas. El proyecto ejecutivo completo, con planos y documentación técnica, entre 4 y 6 semanas más. Todo depende de la complejidad del proyecto y la velocidad de aprobación de ajustes.",
  },
  {
    id: 3,
    pregunta: "¿Trabajás solo en Mendoza?",
    respuesta:
      "Principalmente en el Gran Mendoza (Ciudad, Godoy Cruz, Guaymallén, Luján de Cuyo, Maipú, Las Heras). Para proyectos fuera de la provincia evaluamos caso por caso.",
  },
  {
    id: 4,
    pregunta: "¿Podés hacer solo los planos sin dirigir la obra?",
    respuesta:
      "Sí. Ofrecemos el servicio de proyecto (planos y documentación) de forma independiente a la dirección de obra. Muchos clientes contratan solo el proyecto y construyen con su propio contratista.",
  },
  {
    id: 5,
    pregunta: "¿Qué necesito tener antes de contactarte?",
    respuesta:
      "Con la idea y el terreno (o la propiedad existente) alcanza. No hace falta tener nada cerrado. La primera charla sirve justamente para ordenar las ideas y ver qué es posible según tu presupuesto y necesidades.",
  },
  {
    id: 6,
    pregunta: "¿Hacés remodelaciones y ampliaciones?",
    respuesta:
      "Sí. Remodelaciones parciales, reciclados completos y ampliaciones de viviendas existentes. Estos proyectos a veces son más desafiantes que uno nuevo porque hay que trabajar con condicionantes ya construidas.",
  },
  {
    id: 7,
    pregunta: "¿Cómo sé cuánto me va a costar la obra?",
    respuesta:
      "Durante el proyecto elaboramos un presupuesto estimado por metro cuadrado. Una vez terminados los planos ejecutivos, podés pedir cotizaciones formales a contratistas. Podemos ayudarte a interpretar y comparar esos presupuestos.",
  },
  {
    id: 8,
    pregunta: "¿Trabajás con casas prefabricadas o steel frame?",
    respuesta:
      "Sí. Diseñamos para distintos sistemas constructivos: mampostería tradicional, steel frame, hormigón y sistemas mixtos. La elección del sistema depende del presupuesto, el terreno y los tiempos de cada cliente.",
  },
];

type FaqItemProps = {
  faq: (typeof FAQS)[number];
};

function FaqItem({ faq }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border)] last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-medium leading-snug sm:text-base">
          {faq.pregunta}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
          className="mt-0.5 shrink-0"
        >
          <svg
            className="h-4 w-4 text-[var(--muted)] transition-colors group-hover:text-[var(--foreground)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
    </div>
  );
}

export function FaqContent() {
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
          {FAQS.map((faq) => (
            <FaqItem key={faq.id} faq={faq} />
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
          <p className="text-xs font-medium uppercase tracking-[0.2em] opacity-50">
            ¿No encontrás lo que buscás?
          </p>
          <p className="mt-2 text-xl font-semibold">Escribime directamente</p>
          <p className="mt-1 text-sm font-light opacity-60">
            Cualquier consulta que tengas, sin compromiso.
          </p>
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
    </main>
  );
}
