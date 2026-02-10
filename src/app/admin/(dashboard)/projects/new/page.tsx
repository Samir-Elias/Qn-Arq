import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
        >
          ← Volver
        </Link>
        <h1 className="text-2xl font-semibold">Nuevo proyecto</h1>
      </div>
      <ProjectForm />
    </div>
  );
}
