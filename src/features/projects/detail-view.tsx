import {PageLayout} from "@/components/page-layout/page-layout";
import {ProjectEnquiry} from "@/features/projects/project-enquiry";
import {ProjectFacts} from "@/features/projects/project-facts";
import {ProjectGallery} from "@/features/projects/project-gallery";
import {ProjectHero} from "@/features/projects/project-hero";
import {RelatedProjects} from "@/features/projects/related-projects";
import type {Project} from "@/lib/content/projects";
import {projectEnquiry} from "@/lib/content/projects-page";
import {pageNav} from "@/lib/page-nav";
import {pageExists} from "@/lib/site-pages";

type ProjectDetailViewProps = {project: Project; related: readonly Project[]};

/** One project: hero, facts and story, gallery, related projects, then the enquiry to Engineering. */
export function ProjectDetailView({project, related}: ProjectDetailViewProps) {
  return (
    <PageLayout links={pageNav(project.href, pageExists)} division="engineering">
      <ProjectHero project={project} />
      <ProjectFacts project={project} />
      <ProjectGallery photos={project.photos} />
      <RelatedProjects projects={related} />
      <ProjectEnquiry heading={projectEnquiry.heading.value} action={projectEnquiry.action.value} href={project.enquiryHref} />
    </PageLayout>
  );
}
