import { getProjects, getFeaturedProject } from "@/lib/data/projects";
import { HomeContent } from "@/components/HomeContent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featured, projects] = await Promise.all([
    getFeaturedProject(),
    getProjects(),
  ]);

  const featuredProject = featured ?? projects[0] ?? null;
  const otherProjects = projects.filter((p) => p.id !== featuredProject?.id);

  return (
    <HomeContent
      featured={featuredProject}
      projects={otherProjects}
      totalCount={projects.length}
    />
  );
}
