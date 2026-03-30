import { createClient } from "@/lib/supabase/server";
import { getTestimonios } from "@/lib/data/content";
import { updateTestimonio, deleteTestimonio } from "@/app/admin/(dashboard)/content/actions";
import { TestimoniosContent } from "@/components/TestimoniosContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Testimonios | QÑ Arquitectura",
  description:
    "Lo que dicen los clientes de QÑ Arquitectura. Proyectos residenciales en Mendoza.",
};

export default async function TestimoniosPage() {
  const supabase = await createClient();
  const [{ data: { user } }, testimonios] = await Promise.all([
    supabase.auth.getUser(),
    getTestimonios(),
  ]);

  return (
    <TestimoniosContent
      testimonios={testimonios}
      isAdmin={!!user}
      onUpdate={updateTestimonio}
      onDelete={deleteTestimonio}
    />
  );
}
