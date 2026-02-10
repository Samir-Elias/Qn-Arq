"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/app/admin/(dashboard)/projects/actions";
import type { ProjectWithImages } from "@/lib/types";

type ProjectFormProps = {
  project?: ProjectWithImages;
};

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      } else {
        await createProject(formData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="title" className="text-sm font-medium">
          Título
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={project?.title ?? ""}
          placeholder="Ej: Casa Moderna en Chacras"
          className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="description" className="text-sm font-medium">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={project?.description ?? ""}
          placeholder="Descripción del proyecto..."
          className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="featured-checkbox"
          type="checkbox"
          defaultChecked={project?.featured ?? false}
          onChange={(e) => {
            const hidden = e.target.form?.querySelector(
              'input[name="featured"]'
            ) as HTMLInputElement;
            if (hidden) hidden.value = e.target.checked ? "true" : "false";
          }}
          className="h-4 w-4 rounded border-[var(--border)]"
        />
        <input
          type="hidden"
          name="featured"
          defaultValue={project?.featured ? "true" : "false"}
        />
        <label htmlFor="featured-checkbox" className="text-sm">
          Proyecto destacado
        </label>
      </div>

      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : null}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/90 disabled:opacity-50"
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
            className="rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
          >
            Eliminar
          </button>
        ) : null}
      </div>
    </form>
  );
}
