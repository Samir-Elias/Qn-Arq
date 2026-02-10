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
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
        >
          ← Volver
        </Link>
        <h1 className="text-2xl font-semibold">Editar: {project.title}</h1>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Datos del proyecto</h2>
        <ProjectForm project={project} />
      </section>

      <hr className="border-[var(--border)]" />

      <section className="space-y-4">
        <h2 className="text-lg font-medium">
          Imágenes ({project.images.length})
        </h2>
        <ImageManager projectId={id} images={project.images} />
        <ImageUploader
          projectId={id}
          currentImageCount={project.images.length}
        />
      </section>
    </div>
  );
}
