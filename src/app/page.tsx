"use client";

import { useMemo, useState } from "react";
import projectsData, { type Project } from "@/data/projectsData";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";

export default function Home() {
  const featuredProject = useMemo(
    () => projectsData.find((project) => project.featured) ?? projectsData[0],
    []
  );

  const otherProjects = useMemo(
    () => projectsData.filter((project) => project.id !== featuredProject.id),
    [featuredProject.id]
  );

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 200);
  };

  return (
    <main className="space-y-10 px-4 pb-16 pt-12 sm:px-6 lg:px-12">
      <section className="space-y-4">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            QÑ Arquitectura
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Espacios que inspiran, diseños que trascienden
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Estudio especializado en arquitectura contemporánea con foco en
            experiencias memorables y materiales nobles.
          </p>
        </div>
        <FeaturedProject project={featuredProject} onOpen={handleOpenProject} />
      </section>

      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Todos los proyectos</h2>
          <span className="text-sm text-muted-foreground">
            {projectsData.length} proyectos realizados
          </span>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {otherProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleOpenProject}
            />
          ))}
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
