import {Pause, Play} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {usePrefersReducedMotion} from "@/lib/use-prefers-reduced-motion";

type LoopVideoProps = {src: string; poster: string; priority: boolean; className: string};

// Start loading and playing a little before the clip scrolls into view.
const NEAR_VIEWPORT = "200px";

// play() rejects when a pause interrupts it; that is expected here, not an error.
function playQuietly(video: HTMLVideoElement) {
  video.play().catch(() => {});
}

/** A muted loop that plays only while near the viewport, never by itself under reduced motion, with a pause control. */
export function LoopVideo({src, poster, priority, className}: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(true);
  const [heldByVisitor, setHeldByVisitor] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || reducedMotion || heldByVisitor) return;
    const observer = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? playQuietly(video) : video.pause()), {
      rootMargin: NEAR_VIEWPORT,
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion, heldByVisitor]);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    setHeldByVisitor(!paused);
    if (paused) playQuietly(video);
    else video.pause();
  }

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "none"}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        className={className}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? "Play video" : "Pause video"}
        className="absolute bottom-4 left-4 inline-flex size-10 items-center justify-center rounded-full bg-ink text-on-dark outline-offset-2 outline-on-dark transition-colors ease-standard before:absolute before:size-11 hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-solid md:bottom-6 md:left-6"
      >
        {paused ? <Play aria-hidden size={20} strokeWidth={1.5} /> : <Pause aria-hidden size={20} strokeWidth={1.5} />}
      </button>
    </>
  );
}
