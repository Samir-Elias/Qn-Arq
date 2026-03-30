import { getProjects, getFeaturedProject } from "@/lib/data/projects";
import { createClient } from "@/lib/supabase/server";
import { HomeContent } from "@/components/HomeContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();
  const [
    { data: { user } },
    featured,
    projects,
  ] = await Promise.all([
    supabase.auth.getUser(),
    getFeaturedProject(),
    getProjects(),
  ]);

  const isAdmin = !!user;
  const featuredProject = featured ?? projects[0] ?? null;
  const otherProjects = projects.filter((p) => p.id !== featuredProject?.id);

  return (
    <HomeContent
      featured={featuredProject}
      projects={otherProjects}
      totalCount={projects.length}
      isAdmin={isAdmin}
    />
  );
}
