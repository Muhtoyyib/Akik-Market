import {Frame} from "@/components/frame/frame";
import {PageLayout} from "@/components/page-layout/page-layout";
import {SectionHeader} from "@/components/section-header/section-header";
import {ProjectsFilter} from "@/features/projects/projects-filter";
import type {Project, ProjectType} from "@/lib/content/projects";
import {projectsIndex} from "@/lib/content/projects-page";
import {PROJECTS_PATH} from "@/lib/page-heads";
import {pageNav} from "@/lib/page-nav";
import {pageExists} from "@/lib/site-pages";

type ProjectsIndexViewProps = {projects: readonly Project[]; types: readonly ProjectType[]};

/** Projects index: Matic P3's header with the page's h1, then the filter tabs and the grid. */
export function ProjectsIndexView({projects, types}: ProjectsIndexViewProps) {
  const {eyebrow, heading, intro} = projectsIndex;
  return (
    <PageLayout links={pageNav(PROJECTS_PATH, pageExists)} division="engineering">
      <section aria-labelledby="projects-index-heading" className="pt-12 md:pt-20">
        <Frame>
          <SectionHeader
            level={1}
            eyebrow={eyebrow.value}
            heading={heading.value}
            description={intro.value}
            headingId="projects-index-heading"
          />
          <div className="mt-12 md:mt-16">
            <ProjectsFilter projects={projects} types={types} />
          </div>
        </Frame>
      </section>
    </PageLayout>
  );
}
