import {ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect, useState, type ReactNode} from "react";
import {ItemCard, type FeaturedItem} from "@/features/home/featured/item-card";
import {rowEnds} from "@/lib/row-ends";
import {usePrefersReducedMotion} from "@/lib/use-prefers-reduced-motion";

type ItemCarouselProps = {items: readonly FeaturedItem[]; action: ReactNode};

const ARROW =
  "inline-flex size-11 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors ease-standard outline-offset-2 outline-brand-navy hover:border-ink hover:bg-ink hover:text-on-dark focus-visible:outline-2 focus-visible:outline-solid disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-line disabled:hover:bg-card disabled:hover:text-ink";

/** Keeps the arrows' disabled state in step with the row as it scrolls or resizes. */
function useRowEnds(track: HTMLUListElement | null) {
  const [ends, setEnds] = useState({atStart: true, atEnd: false});
  useEffect(() => {
    if (!track) return;
    const update = () => setEnds(rowEnds(track));
    const resize = new ResizeObserver(update);
    resize.observe(track);
    track.addEventListener("scroll", update, {passive: true});
    return () => {
      resize.disconnect();
      track.removeEventListener("scroll", update);
    };
  }, [track]);
  return ends;
}

/** One step is the distance between neighbouring cards, so each press snaps exactly one card along. */
function cardStep(track: HTMLUListElement): number {
  const [first, second] = track.children;
  if (first instanceof HTMLElement && second instanceof HTMLElement) return second.offsetLeft - first.offsetLeft;
  return track.clientWidth;
}

/** Spec (featured-now/item-card, "Carousel"): a plain swipe row (home design.md D1) with arrows on desktop. */
export function ItemCarousel({items, action}: ItemCarouselProps) {
  // State, not a ref, so the scroll and resize listeners attach once the row is in the page.
  const [track, setTrack] = useState<HTMLUListElement | null>(null);
  const ends = useRowEnds(track);
  const reducedMotion = usePrefersReducedMotion();

  function move(direction: 1 | -1) {
    track?.scrollBy({left: direction * cardStep(track), behavior: reducedMotion ? "auto" : "smooth"});
  }

  return (
    <div>
      <ul
        ref={setTrack}
        className="-mr-4 flex snap-x snap-mandatory scrollbar-hidden gap-4 overflow-x-auto pr-4 md:-mr-8 md:pr-8 lg:gap-6 xl:-mr-16 xl:pr-16"
      >
        {items.map((item) => (
          <li key={item.name} className="w-4/5 shrink-0 snap-start md:w-2/5 lg:w-2/9">
            <ItemCard {...item} />
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between gap-6">
        {action}
        <div className="hidden gap-3 lg:flex">
          <button type="button" className={ARROW} onClick={() => move(-1)} disabled={ends.atStart} aria-label="Previous item">
            <ChevronLeft aria-hidden size={20} strokeWidth={1.5} />
          </button>
          <button type="button" className={ARROW} onClick={() => move(1)} disabled={ends.atEnd} aria-label="Next item">
            <ChevronRight aria-hidden size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
