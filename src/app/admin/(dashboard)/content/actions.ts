"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updatePaso(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("proceso_pasos")
    .update({
      titulo: (formData.get("titulo") as string)?.trim(),
      descripcion: (formData.get("descripcion") as string)?.trim(),
      duracion: (formData.get("duracion") as string)?.trim(),
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/proceso");
}

export async function updateTestimonio(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonios")
    .update({
      quote: (formData.get("quote") as string)?.trim(),
      name: (formData.get("name") as string)?.trim(),
      project: (formData.get("project") as string)?.trim(),
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/testimonios");
}

export async function updateFaq(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("faq_items")
    .update({
      pregunta: (formData.get("pregunta") as string)?.trim(),
      respuesta: (formData.get("respuesta") as string)?.trim(),
    })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/faq");
}

export async function deletePaso(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("proceso_pasos").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/proceso");
}

export async function deleteTestimonio(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonios").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/testimonios");
}

export async function deleteFaq(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("faq_items").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/faq");
}
