export const PROJECT_CATEGORIES = [
  "Departamentos",
  "Duplex",
  "Casas",
  "Planos",
  "Otros",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectImage = {
  id: string;
  project_id: string;
  storage_path: string;
  url: string;
  display_order: number;
  is_main: boolean;
  created_at: string;
};

export type ClickEvent = {
  id: string;
  project_id: string;
  event_type: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  user_agent: string | null;
  created_at: string;
};

export type ProjectWithImages = Project & {
  images: ProjectImage[];
  main_image: ProjectImage | null;
  priority_images: ProjectImage[];
  additional_images: ProjectImage[];
};
