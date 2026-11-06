export type LeadQuoteContent = {before: string; highlight: string; source: string};

/** Matic P5's big centred quote (Home's proof, the Testimonials wall). The highlight is <em> as well as red, so it
 * isn't colour alone. */
export function LeadQuote({before, highlight, source}: LeadQuoteContent) {
  return (
    <figure className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <blockquote className="type-quote text-ink">
        <p>
          “{before} <em className="text-brand-red not-italic">{highlight}</em>”
        </p>
      </blockquote>
      <figcaption className="mt-6 type-label text-ink-muted">{source}</figcaption>
    </figure>
  );
}
