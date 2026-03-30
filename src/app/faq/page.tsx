import { createClient } from "@/lib/supabase/server";
import { getFaqItems } from "@/lib/data/content";
import { updateFaq, deleteFaq } from "@/app/admin/(dashboard)/content/actions";
import { FaqContent } from "@/components/FaqContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Preguntas Frecuentes | QÑ Arquitectura",
  description:
    "Todo lo que necesitás saber antes de arrancar tu proyecto con QÑ Arquitectura.",
};

export default async function FaqPage() {
  const supabase = await createClient();
  const [{ data: { user } }, faqs] = await Promise.all([
    supabase.auth.getUser(),
    getFaqItems(),
  ]);

  return (
    <FaqContent
      faqs={faqs}
      isAdmin={!!user}
      onUpdate={updateFaq}
      onDelete={deleteFaq}
    />
  );
}
