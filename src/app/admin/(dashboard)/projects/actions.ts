"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createProject(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const featured = formData.get("featured") === "true";

  if (!title?.trim()) {
    throw new Error("El título es obligatorio");
  }

  // Si es featured, des-featurear el actual
  if (featured) {
    await supabase
      .from("projects")
      .update({ featured: false })
      .eq("featured", true);
  }

  const { data: project, error } = await supabase
    .from("projects")
    .insert({ title: title.trim(), description: description?.trim() ?? "", featured })
    .select()
    .single();

  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/admin");
  redirect(`/admin/projects/${project.id}`);
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const featured = formData.get("featured") === "true";

  if (!title?.trim()) {
    throw new Error("El título es obligatorio");
  }

  // Si es featured, des-featurear el actual (si es otro)
  if (featured) {
    await supabase
      .from("projects")
      .update({ featured: false })
      .eq("featured", true)
      .neq("id", id);
  }

  const { error } = await supabase
    .from("projects")
    .update({
      title: title.trim(),
      description: description?.trim() ?? "",
      featured,
    })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/admin/projects/${id}`);
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  // Obtener imagenes para eliminar del storage
  const { data: images } = await supabase
    .from("project_images")
    .select("storage_path")
    .eq("project_id", id);

  if (images && images.length > 0) {
    const paths = images.map((img) => img.storage_path);
    await supabase.storage.from("project-images").remove(paths);
  }

  // Eliminar proyecto (cascade a imagenes y click_events)
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function toggleFeatured(id: string, featured: boolean) {
  const supabase = await createClient();

  if (featured) {
    await supabase
      .from("projects")
      .update({ featured: false })
      .eq("featured", true);
  }

  const { error } = await supabase
    .from("projects")
    .update({ featured })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/admin/projects/${id}`);
}
