import {useState} from "react";
import {Frame} from "@/components/frame/frame";
import {LeadQuote} from "@/components/lead-quote/lead-quote";
import {CustomerTile, FillerTile} from "@/components/quote-wall/wall-tile";
import type {quoteWall} from "@/lib/content/quote-wall";

type QuoteWallProps = typeof quoteWall;

const HEADING_ID = "wall-heading";

/**
 * The Alvo photo wall (quote-wall spec): the lead quote, staggered rows of round photos with a tile per customer, and
 * the chosen customer's quote in a card below. The card announces each change politely.
 */
export function QuoteWall({lead, quotes, rows}: QuoteWallProps) {
  const [selected, setSelected] = useState(0);
  const chosen = quotes[selected];
  if (!chosen) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={HEADING_ID} className="sr-only">
          What customers say
        </h2>
        <LeadQuote {...lead.value} />
        <div data-wall role="group" aria-label="Customers" className="mt-12 flex flex-col items-center gap-1 md:mt-16 md:gap-3">
          {rows.map((row) => (
            <div key={row.map((tile) => `${tile.kind}${tile.index}`).join()} className="flex justify-center gap-1 md:gap-3">
              {row.map((tile) => {
                if (tile.kind === "filler") return <FillerTile key={`f${tile.index}`} image={tile.image} />;
                const quote = quotes[tile.index]!;
                return (
                  <CustomerTile
                    key={`c${tile.index}`}
                    name={quote.name}
                    business={quote.business}
                    image={quote.photo}
                    selected={tile.index === selected}
                    onSelect={() => setSelected(tile.index)}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div aria-live="polite" className="mt-10 flex justify-center md:mt-12">
          <figure data-division={chosen.business} className="flex max-w-xl flex-col items-center rounded-md bg-card p-6 text-center md:p-8">
            <blockquote className="type-h3 text-ink">
              <p>“{chosen.quote.value}”</p>
            </blockquote>
            <figcaption className="mt-4 type-label">
              <span className="text-ink">{chosen.name}</span> · <span className="text-accent">{chosen.businessName}</span>
            </figcaption>
          </figure>
        </div>
      </Frame>
    </section>
  );
}
