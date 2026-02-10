import { createClient } from "@/lib/supabase/server";
import type { ProjectImage, ProjectWithImages } from "@/lib/types";

export async function getProjects(): Promise<ProjectWithImages[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("projects")
      .select(
        `
        *,
        images:project_images(*)
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error.message);
      return [];
    }

    return (data ?? []).map(mapProjectWithImages);
  } catch (err) {
    console.error("Failed to connect to Supabase:", err);
    return [];
  }
}

export async function getProject(
  id: string
): Promise<ProjectWithImages | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      images:project_images(*)
    `
    )
    .eq("id", id)
    .single();

  if (error) return null;

  return mapProjectWithImages(data);
}

export async function getFeaturedProject(): Promise<ProjectWithImages | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      images:project_images(*)
    `
    )
    .eq("featured", true)
    .single();

  if (error) return null;

  return mapProjectWithImages(data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProjectWithImages(raw: any): ProjectWithImages {
  const images = ((raw.images ?? []) as ProjectImage[]).sort(
    (a, b) => a.display_order - b.display_order
  );

  return {
    ...raw,
    images,
    main_image: images.find((img) => img.is_main) ?? null,
    priority_images: images.filter(
      (img) => !img.is_main && img.display_order >= 1 && img.display_order <= 3
    ),
    additional_images: images.filter(
      (img) => !img.is_main && img.display_order > 3
    ),
  };
}
