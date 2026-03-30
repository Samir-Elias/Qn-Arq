import { createClient } from "@/lib/supabase/server";

export type PasoProceso = {
  id: string;
  numero: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  orden: number;
};

export type Testimonio = {
  id: string;
  quote: string;
  name: string;
  project: string;
  category: string;
  orden: number;
};

export type FaqItem = {
  id: string;
  pregunta: string;
  respuesta: string;
  orden: number;
};

export async function getPasosProceso(): Promise<PasoProceso[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("proceso_pasos")
    .select("*")
    .order("orden");
  return data ?? [];
}

export async function getTestimonios(): Promise<Testimonio[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonios")
    .select("*")
    .order("orden");
  return data ?? [];
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("faq_items")
    .select("*")
    .order("orden");
  return data ?? [];
}
