import { createClient } from "@/lib/supabase/server";

type ClickRow = {
  id: string;
  project_id: string;
  event_type: string;
  utm_source: string | null;
  created_at: string;
  projects: { title: string } | null;
};

export default async function AnalyticsPage() {
  const supabase = await createClient();

  // Clicks de los ultimos 30 dias
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: clicks } = await supabase
    .from("click_events")
    .select("id, project_id, event_type, utm_source, created_at, projects(title)")
    .gte("created_at", thirtyDaysAgo.toISOString())
    .order("created_at", { ascending: false });

  const typedClicks = (clicks ?? []) as unknown as ClickRow[];

  // Agrupar por proyecto
  const byProject = new Map<string, { title: string; count: number }>();
  for (const click of typedClicks) {
    const title = click.projects?.title ?? "Desconocido";
    const existing = byProject.get(click.project_id);
    if (existing) {
      existing.count++;
    } else {
      byProject.set(click.project_id, { title, count: 1 });
    }
  }

  // Agrupar por fuente
  const bySource = new Map<string, number>();
  for (const click of typedClicks) {
    const source = click.utm_source ?? "directo";
    bySource.set(source, (bySource.get(source) ?? 0) + 1);
  }

  // Agrupar por dia
  const byDay = new Map<string, number>();
  for (const click of typedClicks) {
    const day = click.created_at.slice(0, 10);
    byDay.set(day, (byDay.get(day) ?? 0) + 1);
  }

  const sortedByProject = [...byProject.entries()].sort(
    (a, b) => b[1].count - a[1].count
  );
  const sortedByDay = [...byDay.entries()].sort((a, b) =>
    b[0].localeCompare(a[0])
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Analíticas</h1>

      {/* Resumen */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] p-4">
          <p className="text-2xl font-semibold">{typedClicks.length}</p>
          <p className="text-xs text-[var(--muted)]">Clicks últimos 30 días</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] p-4">
          <p className="text-2xl font-semibold">{byProject.size}</p>
          <p className="text-xs text-[var(--muted)]">Proyectos contactados</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] p-4">
          <p className="text-2xl font-semibold">{bySource.size}</p>
          <p className="text-xs text-[var(--muted)]">Fuentes distintas</p>
        </div>
      </div>

      {/* Por proyecto */}
      <section className="space-y-3">
        <h2 className="text-lg font-medium">Clicks por proyecto</h2>
        {sortedByProject.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">Sin datos todavía.</p>
        ) : (
          <div className="space-y-2">
            {sortedByProject.map(([projectId, { title, count }]) => (
              <div
                key={projectId}
                className="flex items-center justify-between rounded-lg border border-[var(--border)] px-4 py-3"
              >
                <span className="text-sm font-medium">{title}</span>
                <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                  {count}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Por fuente */}
      <section className="space-y-3">
        <h2 className="text-lg font-medium">Por fuente</h2>
        <div className="flex flex-wrap gap-2">
          {[...bySource.entries()].map(([source, count]) => (
            <span
              key={source}
              className="rounded-full border border-[var(--border)] px-3 py-1 text-xs"
            >
              {source}: {count}
            </span>
          ))}
        </div>
      </section>

      {/* Historial diario */}
      <section className="space-y-3">
        <h2 className="text-lg font-medium">Historial diario</h2>
        {sortedByDay.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">Sin datos todavía.</p>
        ) : (
          <div className="space-y-1">
            {sortedByDay.map(([day, count]) => (
              <div key={day} className="flex items-center gap-3">
                <span className="w-24 text-xs text-[var(--muted)]">{day}</span>
                <div className="flex-1">
                  <div
                    className="h-5 rounded bg-black/10"
                    style={{
                      width: `${Math.max(
                        4,
                        (count / Math.max(...byDay.values())) * 100
                      )}%`,
                    }}
                  >
                    <span className="px-2 text-xs font-medium">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
