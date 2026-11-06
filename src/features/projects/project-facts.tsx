import {Frame} from "@/components/frame/frame";
import type {Project} from "@/lib/content/projects";

const HEADING_ID = "facts-heading";

/** Label and value pairs; a fact the content doesn't have is left out (facts spec). */
function factsOf({area, city, year, typeLabel, size}: Project) {
  const facts = [
    {label: "Location", value: `${area}, ${city}`},
    {label: "Completed", value: year},
    {label: "Type", value: typeLabel},
    {label: "Size", value: size},
  ];
  return facts.filter((fact): fact is {label: string; value: string} => fact.value !== undefined);
}

/** Matic P8 rows with mono labels, beside the story on desktop and above it on phones. */
export function ProjectFacts({project}: {project: Project}) {
  return (
    <section aria-labelledby={HEADING_ID} className="pt-12 md:pt-16">
      <Frame className="grid gap-10 lg:grid-cols-3 lg:gap-12">
        <h2 id={HEADING_ID} className="sr-only">
          About this project
        </h2>
        <dl className="flex flex-col gap-5 border-t border-line pt-6">
          {factsOf(project).map((fact) => (
            <div key={fact.label}>
              <dt className="type-label text-ink-muted">{fact.label}</dt>
              <dd className="mt-1 type-body text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex max-w-prose flex-col gap-5 type-body-lg text-ink lg:col-span-2">
          {project.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Frame>
    </section>
  );
}
