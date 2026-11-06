import {MediaBox} from "@/components/media-box/media-box";
import type {Project} from "@/lib/content/projects";
import {SIZES} from "@/lib/responsive-image";

type ProjectCardProps = {project: Project; level: 2 | 3};

/**
 * Obvious's case-study card (captured, frame 6): a 3:2 photo, the type and year, the name and one big figure
 * (projects design D2). The whole card is one link named after the project; the ring goes round the card.
 */
export function ProjectCard({project, level}: ProjectCardProps) {
  const {name, href, typeLabel, year, figure, photos} = project;
  const Heading = level === 2 ? "h2" : "h3";
  const [cover] = photos;
  return (
    <article className="group relative flex h-full flex-col rounded-md outline-offset-4 outline-brand-navy has-focus-visible:outline-2 has-focus-visible:outline-solid">
      {cover && <MediaBox ratio="3:2" media={{kind: "image", ...cover, sizes: SIZES.cardRow}} />}
      <p className="mt-4 type-label text-ink-muted">
        {typeLabel} · {year}
      </p>
      <Heading className="mt-2 type-h3 text-ink group-hover:underline">
        <a href={href} className="outline-none after:absolute after:inset-0">
          {name}
        </a>
      </Heading>
      <p className="mt-4 flex items-baseline gap-2">
        <span className="type-figure text-accent">{figure.value}</span>
        <span className="type-label text-ink-muted">{figure.label}</span>
      </p>
    </article>
  );
}
