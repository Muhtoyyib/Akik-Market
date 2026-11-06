import {Frame} from "@/features/home/frame";

type LeadQuote = {before: string; highlight: string; source: string};
type ProofColumn = {key: "phones" | "engineering" | "autos"; quote: {value: string}; source: {value: string}};
type ProofProps = {heading: string; lead: LeadQuote; columns: readonly ProofColumn[]};

const HEADING_ID = "proof-heading";

/**
 * Matic P5: one big centred quote, then a column per business. The section has no visible heading, so a hidden h2
 * keeps the page outline and names the landmark. The highlight is <em> as well as red, so it isn't colour alone.
 */
export function Proof({heading, lead, columns}: ProofProps) {
  // Spec (page-shell, "Section with no content"): nothing to show, so no section and no gap.
  if (columns.length === 0) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={HEADING_ID} className="sr-only">
          {heading}
        </h2>
        <figure className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <blockquote className="type-quote text-ink">
            <p>
              “{lead.before} <em className="text-brand-red not-italic">{lead.highlight}</em>”
            </p>
          </blockquote>
          <figcaption className="mt-6 type-label text-ink-muted">{lead.source}</figcaption>
        </figure>
        <ul className="mt-16 grid gap-8 md:mt-24 md:grid-cols-3 md:gap-6">
          {columns.map((column) => (
            <li key={column.key} data-division={column.key} className="border-t border-line pt-6">
              <figure>
                <blockquote className="type-h3 text-ink">
                  <p>“{column.quote.value}”</p>
                </blockquote>
                <figcaption className="mt-6 type-label text-accent">{column.source.value}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Frame>
    </section>
  );
}
