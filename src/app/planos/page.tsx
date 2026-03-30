import { createClient } from "@/lib/supabase/server";
import { getProjectsByCategory } from "@/lib/data/projects";
import { PlanosContent } from "@/components/PlanosContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Planos | QÑ Arquitectura",
  description:
    "Planos arquitectónicos de proyectos residenciales. Arq. Juan Ignacio Flores, Mendoza.",
};

export default async function PlanosPage() {
  const supabase = await createClient();
  const [{ data: { user } }, planos] = await Promise.all([
    supabase.auth.getUser(),
    getProjectsByCategory("Planos"),
  ]);

  return <PlanosContent projects={planos} isAdmin={!!user} />;
}
