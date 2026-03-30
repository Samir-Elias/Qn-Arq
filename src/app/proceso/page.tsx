import { createClient } from "@/lib/supabase/server";
import { getPasosProceso } from "@/lib/data/content";
import { updatePaso, deletePaso } from "@/app/admin/(dashboard)/content/actions";
import { ProcesoContent } from "@/components/ProcesoContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Cómo Trabajo | QÑ Arquitectura",
  description:
    "El proceso de trabajo del Arq. Juan Ignacio Flores: de la idea al proyecto terminado.",
};

export default async function ProcesoPage() {
  const supabase = await createClient();
  const [{ data: { user } }, pasos] = await Promise.all([
    supabase.auth.getUser(),
    getPasosProceso(),
  ]);

  return (
    <ProcesoContent
      pasos={pasos}
      isAdmin={!!user}
      onUpdatePaso={updatePaso}
      onDeletePaso={deletePaso}
    />
  );
}
