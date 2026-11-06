import {ArrowLeft} from "lucide-react";
import {Frame} from "@/components/frame/frame";
import {MediaBox} from "@/components/media-box/media-box";
import type {Project} from "@/lib/content/projects";
import {PROJECTS_PATH} from "@/lib/page-heads";

const HEADING_ID = "project-heading";
const BACK_LINK =
  "inline-flex min-h-11 items-center gap-2 type-small font-semibold text-ink underline-offset-4 outline-offset-2 outline-brand-navy hover:underline focus-visible:outline-2 focus-visible:outline-solid";

/** Matic P2: a back link, the building in a 16:9 box (4:5 on phones), then the type, year and the page's h1. */
export function ProjectHero({project}: {project: Project}) {
  const {name, typeLabel, year, photos} = project;
  const [cover] = photos;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-6 md:pt-8">
      <Frame>
        <a href={PROJECTS_PATH} className={BACK_LINK}>
          <ArrowLeft aria-hidden size={16} strokeWidth={1.5} />
          All projects
        </a>
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
