import {createFileRoute} from "@tanstack/react-router";
import {ProjectsIndexView} from "@/features/projects/index-view";
import {projectsGrid} from "@/lib/content/projects-page";
import {projectsIndexHead} from "@/lib/page-heads";

export const Route = createFileRoute("/projects/")({
  head: () => projectsIndexHead,
  component: () => <ProjectsIndexView projects={projectsGrid.projects} types={projectsGrid.types} />,
});
