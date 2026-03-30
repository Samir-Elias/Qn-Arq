import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject } from "@/lib/data/projects";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { ImageManager } from "@/components/admin/ImageManager";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  return (
    <div className="space-y-0">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link
          href="/admin"
          className="transition-colors hover:text-[var(--foreground)]"
        >
          Proyectos
        </Link>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-3.5 w-3.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
        <span className="truncate font-medium text-[var(--foreground)]">
          {project.title}
        </span>
      </div>

      {/* Section 1: Datos */}
      <section className="rounded-xl border border-[var(--border)] p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
            1
          </div>
          <div>
            <h2 className="text-base font-semibold">Datos del proyecto</h2>
            <p className="text-xs text-[var(--muted)]">
              Título, descripción y tipo
            </p>
          </div>
        </div>
        <ProjectForm project={project} />
      </section>

      {/* Section 2: Imágenes */}
      <section className="mt-4 rounded-xl border border-[var(--border)] p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
              2
            </div>
            <div>
              <h2 className="text-base font-semibold">
                Imágenes
                {project.images.length > 0 ? (
                  <span className="ml-2 text-sm font-normal text-[var(--muted)]">
                    ({project.images.length})
                  </span>
                ) : null}
              </h2>
              <p className="text-xs text-[var(--muted)]">
                Organizá y ordená las fotos del proyecto
              </p>
            </div>
          </div>
        </div>

        {project.images.length === 0 ? (
          <p className="mb-4 rounded-lg bg-black/[0.03] px-4 py-3 text-sm text-[var(--muted)]">
            Aún no hay imágenes. Subí la primera abajo.
          </p>
        ) : (
          <div className="mb-6">
            <ImageManager projectId={id} images={project.images} />
          </div>
        )}

        {/* Section 3: Subir */}
        <div className="border-t border-[var(--border)] pt-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] text-xs font-semibold text-[var(--muted)]">
              +
            </div>
            <div>
              <h3 className="text-sm font-semibold">Agregar imágenes</h3>
              <p className="text-xs text-[var(--muted)]">
                JPG, PNG o WebP · Se recomienda al menos 3 fotos por proyecto
              </p>
            </div>
          </div>
          <ImageUploader
            projectId={id}
            currentImageCount={project.images.length}
          />
        </div>
      </section>
    </div>
  );
}
