import {CardRow} from "@/components/card-row/card-row";
import {Frame} from "@/components/frame/frame";

type Person = {name: string; role: string; photo: {src: string; alt: string; width: number; height: number}};
type TeamProps = {heading: string; people: readonly Person[]};

const HEADING_ID = "team-heading";

/** Matic P4, one card per person. Renders only with real people from the owner (about team spec, "Real people only"). */
export function Team({heading, people}: TeamProps) {
  if (people.length === 0) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={HEADING_ID} className="max-w-3xl type-h2 text-ink">
          {heading}
        </h2>
        <CardRow label={heading} items={people.map((person) => ({title: person.name, line: person.role, image: person.photo}))} />
      </Frame>
    </section>
  );
}
