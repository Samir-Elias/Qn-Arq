"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function uploadImage(
  projectId: string,
  formData: FormData,
  options: { is_main: boolean; display_order: number }
) {
  const supabase = await createClient();
  const file = formData.get("file") as File;

  if (!file || file.size === 0) throw new Error("No se proporcionó archivo");

  // Generar path unico
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${projectId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  // Subir a Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("project-images")
    .upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  // Obtener URL publica
  const {
    data: { publicUrl },
  } = supabase.storage.from("project-images").getPublicUrl(filename);

  // Si es main, des-mainear la actual
  if (options.is_main) {
    await supabase
      .from("project_images")
      .update({ is_main: false })
      .eq("project_id", projectId)
      .eq("is_main", true);
  }

  // Insertar registro de imagen
  const { error: insertError } = await supabase
    .from("project_images")
    .insert({
      project_id: projectId,
      storage_path: filename,
      url: publicUrl,
      display_order: options.display_order,
      is_main: options.is_main,
    });

  if (insertError) throw insertError;

  revalidatePath("/");
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function deleteImage(imageId: string, projectId: string) {
  const supabase = await createClient();

  // Obtener storage path
  const { data: image } = await supabase
    .from("project_images")
    .select("storage_path")
    .eq("id", imageId)
    .single();

  if (image) {
    await supabase.storage
      .from("project-images")
      .remove([image.storage_path]);
  }

  await supabase.from("project_images").delete().eq("id", imageId);

  revalidatePath("/");
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function reorderImages(
  projectId: string,
  imageOrders: { id: string; display_order: number; is_main: boolean }[]
) {
  const supabase = await createClient();

  // Reset all is_main
  await supabase
    .from("project_images")
    .update({ is_main: false })
    .eq("project_id", projectId);

  // Actualizar cada imagen
  for (const item of imageOrders) {
    await supabase
      .from("project_images")
      .update({
        display_order: item.display_order,
        is_main: item.is_main,
      })
      .eq("id", item.id);
  }

  revalidatePath("/");
  revalidatePath(`/admin/projects/${projectId}`);
}
