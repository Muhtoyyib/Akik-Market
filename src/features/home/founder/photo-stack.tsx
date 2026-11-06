import {cn} from "cn";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {useRef, useState} from "react";
import {stackDepth, turnStack} from "@/lib/photo-stack";

type Photo = {src: string; alt: string; width: number; height: number};

// Two photos peek out behind the front one, a little shorter each time (Matic P10); any further back wait unseen.
const DEPTH = [
  "z-30 translate-x-0",
  "z-20 translate-x-4 scale-y-95",
  "z-10 translate-x-8 scale-y-90",
  "z-0 translate-x-8 scale-y-90 opacity-0",
];

// A drag shorter than this is a tap or a wobble, not a swipe.
const SWIPE_DISTANCE = 40;

const ARROW =
  "inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-ink text-ink transition-colors ease-standard outline-offset-2 outline-brand-navy hover:bg-ink hover:text-on-dark focus-visible:outline-2 focus-visible:outline-solid";

function StackedPhoto({photo, depth}: {photo: Photo; depth: number}) {
  return (
    <div
      data-depth={depth}
      aria-hidden={depth > 0 || undefined}
      className={cn(
        "absolute inset-0 origin-right overflow-hidden rounded-md bg-card transition duration-400 ease-standard",
        DEPTH[Math.min(depth, DEPTH.length - 1)]
      )}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading="lazy"
        decoding="async"
        className="size-full object-cover"
      />
    </div>
  );
}

/** The front photo is the only one assistive technology sees; the rest are decoration until they come forward. */
export function PhotoStack({photos}: {photos: readonly Photo[]}) {
  const [front, setFront] = useState(0);
  const swipeStart = useRef<number | null>(null);
  const turn = (step: 1 | -1) => setFront((current) => turnStack(current, step, photos.length));

  function endSwipe(x: number) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (start === null || Math.abs(x - start) < SWIPE_DISTANCE) return;
    turn(x < start ? 1 : -1);
  }

  return (
    <div className="flex items-center justify-center gap-4 md:gap-24">
      <button type="button" className={ARROW} onClick={() => turn(-1)} aria-label="Previous photo">
        <ArrowLeft aria-hidden size={20} strokeWidth={1.5} />
      </button>
      <div
        // mr-8 keeps room for the photos peeking 32px out behind; w-48 lets arrows, stack and peek fit a 390px phone.
        className="relative mr-8 aspect-portrait w-48 touch-pan-y md:w-68"
        onPointerDown={(event) => (swipeStart.current = event.clientX)}
        onPointerUp={(event) => endSwipe(event.clientX)}
      >
        {photos.map((photo, index) => (
          <StackedPhoto key={photo.src} photo={photo} depth={stackDepth(index, front, photos.length)} />
        ))}
      </div>
      <button type="button" className={ARROW} onClick={() => turn(1)} aria-label="Next photo">
        <ArrowRight aria-hidden size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
}
