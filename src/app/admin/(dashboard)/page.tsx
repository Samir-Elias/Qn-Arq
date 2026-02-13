import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select(
      `
      id,
      title,
      category,
      featured,
      created_at,
      images:project_images(count),
      clicks:click_events(count)
    `
    )
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Proyectos</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/90"
        >
          Nuevo proyecto
        </Link>
      </div>

      {!projects || projects.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">
          No hay proyectos todavía. Creá el primero.
        </p>
      ) : (
        <div className="space-y-2">
          {projects.map((project) => {
            const imageCount =
              (project.images as unknown as { count: number }[])?.[0]?.count ??
              0;
            const clickCount =
              (project.clicks as unknown as { count: number }[])?.[0]?.count ??
              0;

            return (
              <Link
                key={project.id}
                href={`/admin/projects/${project.id}`}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4 transition hover:bg-black/[0.02]"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium">{project.title}</p>
                    {project.featured ? (
                      <span className="shrink-0 rounded-full bg-black px-2 py-0.5 text-[10px] font-medium text-white">
                        Destacado
                      </span>
                    ) : null}
                    {project.category && project.category !== "Otros" ? (
                      <span className="shrink-0 rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-700">
                        {project.category}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {imageCount} imágenes · {clickCount} clicks
                  </p>
                </div>
                <span className="text-sm text-[var(--muted)]">→</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
