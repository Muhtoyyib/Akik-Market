import {Frame} from "@/components/frame/frame";
import {ProjectGrid} from "@/features/projects/project-grid";
import type {Project} from "@/lib/content/projects";

const HEADING_ID = "related-heading";

/** Up to three other projects as index cards; left out with none (related spec). */
export function RelatedProjects({projects}: {projects: readonly Project[]}) {
  if (projects.length === 0) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={HEADING_ID} className="type-h2 text-ink">
          More projects
        </h2>
        <div className="mt-8 md:mt-12">
          <ProjectGrid projects={projects} level={3} />
        </div>
      </Frame>
    </section>
  );
}
