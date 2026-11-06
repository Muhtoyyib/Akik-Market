import {ProjectCard} from "@/features/projects/project-card";
import type {Project} from "@/lib/content/projects";

type ProjectGridProps = {projects: readonly Project[]; level: 2 | 3};

/** Three columns from 1024px, two from 768px, one on phones (project-card spec, "Grid"). */
export function ProjectGrid({projects, level}: ProjectGridProps) {
  return (
    <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} level={level} />
        </li>
      ))}
    </ul>
  );
}
