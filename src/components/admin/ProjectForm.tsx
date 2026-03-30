"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/app/admin/(dashboard)/projects/actions";
import { type ProjectWithImages, PROJECT_CATEGORIES } from "@/lib/types";

type ProjectFormProps = {
  project?: ProjectWithImages;
};

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const isEditing = !!project;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      if (isEditing) {
        await updateProject(project.id, formData);
        router.refresh();
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        await createProject(formData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!project) return;
    const confirmed = window.confirm(
      `¿Eliminar "${project.title}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      await deleteProject(project.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm transition-colors focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-50";
  const labelClass = "block text-sm font-medium mb-1";
  const hintClass = "mt-1 text-xs text-[var(--muted)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Título */}
      <div>
        <label htmlFor="title" className={labelClass}>
          Título <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          disabled={loading}
          defaultValue={project?.title ?? ""}
          placeholder="Ej: Casa en Chacras de Coria"
          className={inputClass}
        />
        <p className={hintClass}>Nombre con el que aparecerá en la web</p>
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className={labelClass}>
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          disabled={loading}
          defaultValue={project?.description ?? ""}
          placeholder="Describí el proyecto: tipología, superficie, año, características principales..."
          className={inputClass}
        />
        <p className={hintClass}>Este texto se muestra en la galería pública</p>
      </div>

      {/* Notas internas */}
      <div>
        <label htmlFor="notes" className={labelClass}>
          Notas internas
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          disabled={loading}
          defaultValue={project?.notes ?? ""}
          placeholder="Anotaciones privadas: cliente, estado, materiales, presupuesto..."
          className={inputClass}
        />
        <p className={hintClass}>
          Solo visible en el admin, no aparece en la web
        </p>
      </div>

      {/* Tipo + Destacado */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClass}>
            Tipo de proyecto
          </label>
          <select
            id="category"
            name="category"
            disabled={loading}
            defaultValue={project?.category ?? "Otros"}
            className={inputClass}
          >
            {PROJECT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col justify-end">
          <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] px-4 py-3">
            <input
              id="featured-checkbox"
              type="checkbox"
              disabled={loading}
              defaultChecked={project?.featured ?? false}
              onChange={(e) => {
                const hidden = e.target.form?.querySelector(
                  'input[name="featured"]'
                ) as HTMLInputElement;
                if (hidden)
                  hidden.value = e.target.checked ? "true" : "false";
              }}
              className="mt-0.5 h-4 w-4 cursor-pointer rounded border-[var(--border)]"
            />
            <input
              type="hidden"
              name="featured"
              defaultValue={project?.featured ? "true" : "false"}
            />
            <div>
              <label
                htmlFor="featured-checkbox"
                className="cursor-pointer text-sm font-medium"
              >
                Proyecto destacado
              </label>
              <p className="text-xs text-[var(--muted)]">
                Aparece en la sección principal de la web
              </p>
            </div>
          </div>
        </div>
      </div>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      {saved ? (
        <p className="text-sm text-emerald-600">
          Cambios guardados correctamente.
        </p>
      ) : null}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Guardando..."
            : isEditing
              ? "Guardar cambios"
              : "Crear proyecto"}
        </button>

        {isEditing ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="cursor-pointer rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            Eliminar proyecto
          </button>
        ) : null}
      </div>
    </form>
  );
}
