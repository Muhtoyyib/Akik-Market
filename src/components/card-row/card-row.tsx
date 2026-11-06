import {cn} from "cn";
import {MediaBox} from "@/components/media-box/media-box";

type CardRowItem = {title: string; line: string; image: {src: string; alt: string; width: number; height: number}};
type CardRowProps = {label: string; items: readonly CardRowItem[]};

// Four fit in a row at 1024px; five or six wrap to rows of three.
const COLUMNS: Record<number, string> = {3: "lg:grid-cols-3", 4: "lg:grid-cols-4"};

/**
 * Matic P4: 4:5 photo cards with a caption under each. Under 1024px a swipe row with the next card peeking; from
 * 1024px a grid. The row scrolls sideways on phones with nothing focusable in it, so it takes focus itself for
 * keyboard scrolling (axe scrollable-region-focusable).
 */
export function CardRow({label, items}: CardRowProps) {
  return (
    <ul
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      aria-label={label}
      className={cn(
        "rounded-md outline-offset-2 outline-brand-navy focus-visible:outline-2 focus-visible:outline-solid",
        "-mr-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 md:-mr-8 md:mt-12 md:pr-8 lg:mr-0 lg:grid lg:gap-6 lg:overflow-visible lg:pr-0",
        COLUMNS[items.length] ?? "lg:grid-cols-3"
      )}
    >
      {items.map((item) => (
        <li key={item.title} className="w-4/5 shrink-0 snap-start md:w-2/5 lg:w-auto">
          <MediaBox ratio="4:5" media={{kind: "image", ...item.image}} caption={{title: item.title, description: item.line}} />
        </li>
      ))}
    </ul>
  );
}
