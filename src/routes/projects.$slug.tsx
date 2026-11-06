import {createFileRoute} from "@tanstack/react-router";
import {ProjectDetailView} from "@/features/projects/detail-view";
import {projectPage} from "@/lib/content/projects-page";
import {projectHead} from "@/lib/page-heads";

// No loader: the content is bundled, so the page is built from the slug and nothing is serialised into the HTML.
export const Route = createFileRoute("/projects/$slug")({
  head: ({params}) => projectHead(params.slug),
  component: ProjectRoute,
});

function ProjectRoute() {
  const {project, related} = projectPage(Route.useParams().slug);
  return <ProjectDetailView project={project} related={related} />;
}
