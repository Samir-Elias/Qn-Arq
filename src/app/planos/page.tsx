import { getProjectsByCategory } from "@/lib/data/projects";
import { PlanosContent } from "@/components/PlanosContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Planos | QÑ Arquitectura",
  description:
    "Planos arquitectónicos de proyectos residenciales. Arq. Juan Ignacio Flores, Mendoza.",
};

export default async function PlanosPage() {
  const planos = await getProjectsByCategory("Planos");

  return <PlanosContent projects={planos} />;
}
