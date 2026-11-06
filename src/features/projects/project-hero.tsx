import {BackLink} from "@/components/back-link/back-link";
import {Frame} from "@/components/frame/frame";
import {MediaBox} from "@/components/media-box/media-box";
import type {Project} from "@/lib/content/projects";
import {PROJECTS_PATH} from "@/lib/page-heads";

const HEADING_ID = "project-heading";

/** Matic P2: a back link, the building in a 16:9 box (4:5 on phones), then the type, year and the page's h1. */
export function ProjectHero({project}: {project: Project}) {
  const {name, typeLabel, year, photos} = project;
  const [cover] = photos;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-6 md:pt-8">
      <Frame>
        <BackLink href={PROJECTS_PATH} label="All projects" />
        {cover && (
          <div className="mt-4">
            <MediaBox ratio="4:5/16:9" media={{kind: "image", ...cover}} priority />
          </div>
        )}
        <p className="mt-8 type-label text-accent md:mt-12">
          {typeLabel} · {year}
        </p>
        <h1 id={HEADING_ID} className="mt-3 max-w-3xl type-display text-ink">
          {name}
        </h1>
      </Frame>
    </section>
  );
}
