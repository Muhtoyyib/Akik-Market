import {cn} from "cn";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect, useState, type ReactNode} from "react";
import {ROUND_ICON_BUTTON} from "@/components/button/round-icon-button";
import {rowEnds} from "@/lib/row-ends";
import {usePrefersReducedMotion} from "@/lib/use-prefers-reduced-motion";

type SwipeRowProps = {
  items: readonly {key: string; node: ReactNode}[];
  /** Each item's width per breakpoint, so the next one peeks in. */
  itemClassName: string;
  /** What one item is, for the arrows' names: "item" gives "Previous item" and "Next item". */
  noun: string;
  /** Sits left of the arrows, for example a "See all" link. */
  action?: ReactNode;
  /** For a row with nothing focusable in it, such as photos: the row then takes focus itself so the keyboard can
   * scroll it (axe scrollable-region-focusable), and this names it. */
  focusLabel?: string;
};

const ARROW = cn(
  ROUND_ICON_BUTTON,
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-line disabled:hover:bg-card disabled:hover:text-ink"
);

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

/** One step is the distance between neighbouring items, so each press snaps exactly one along. */
function itemStep(track: HTMLUListElement): number {
  const [first, second] = track.children;
  if (first instanceof HTMLElement && second instanceof HTMLElement) return second.offsetLeft - first.offsetLeft;
  return track.clientWidth;
}

/** A plain swipe row (home design D1) with arrows from 1024px, shown only while the row overflows. */
export function SwipeRow({items, itemClassName, noun, action, focusLabel}: SwipeRowProps) {
  // State, not a ref, so the scroll and resize listeners attach once the row is in the page.
  const [track, setTrack] = useState<HTMLUListElement | null>(null);
  const ends = useRowEnds(track);
  const reducedMotion = usePrefersReducedMotion();
  const overflows = !(ends.atStart && ends.atEnd);

  function move(direction: 1 | -1) {
    track?.scrollBy({left: direction * itemStep(track), behavior: reducedMotion ? "auto" : "smooth"});
  }

  return (
    <div>
      <ul
        ref={setTrack}
        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={focusLabel ? 0 : undefined}
        aria-label={focusLabel}
        className="-mr-4 flex snap-x snap-mandatory scrollbar-hidden gap-4 overflow-x-auto rounded-md pr-4 outline-offset-2 outline-brand-navy focus-visible:outline-2 focus-visible:outline-solid md:-mr-8 md:pr-8 lg:gap-6 xl:-mr-16 xl:pr-16"
      >
        {items.map((item) => (
          <li key={item.key} className={cn("shrink-0 snap-start", itemClassName)}>
            {item.node}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between gap-6">
        {action}
        {overflows && (
          <div className="hidden gap-3 lg:flex">
            <button type="button" className={ARROW} onClick={() => move(-1)} disabled={ends.atStart} aria-label={`Previous ${noun}`}>
              <ChevronLeft aria-hidden size={20} strokeWidth={1.5} />
            </button>
            <button type="button" className={ARROW} onClick={() => move(1)} disabled={ends.atEnd} aria-label={`Next ${noun}`}>
              <ChevronRight aria-hidden size={20} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
