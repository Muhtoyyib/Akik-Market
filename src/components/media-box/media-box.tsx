import {cn} from "cn";
import type {ReactNode} from "react";
import {LoopVideo} from "@/components/media-box/loop-video";

// "4:5/16:9" is portrait on phones and wide from tablets up, for boxes that should fill a phone screen.
type Ratio = "16:9" | "4:5" | "3:2" | "1:1" | "4:5/16:9";

type Media =
  | {kind: "image"; src: string; alt: string; width: number; height: number; srcSet?: string; sizes?: string}
  | {kind: "video"; src: string; poster: string};

type MediaBoxProps = {
  ratio: Ratio;
  media: Media;
  /** The first media on the page: loads eagerly and first. */
  priority?: boolean;
  /** Full-width banners take the largest radius. */
  banner?: boolean;
  /** A gradient under overlay text. Text is readable (4.5:1) over the lower third of the box. */
  scrim?: boolean;
  caption?: {title: string; description: string};
  children?: ReactNode;
};

const RATIO_CLASS: Record<Ratio, string> = {
  "16:9": "aspect-video",
  "4:5": "aspect-portrait",
  "3:2": "aspect-photo",
  "1:1": "aspect-square",
  "4:5/16:9": "aspect-portrait md:aspect-video",
};

const FILL = "absolute inset-0 size-full object-cover";

function MediaElement({media, priority}: {media: Media; priority: boolean}) {
  if (media.kind === "video") return <LoopVideo src={media.src} poster={media.poster} priority={priority} className={FILL} />;
  return (
    <img
      src={media.src}
      srcSet={media.srcSet}
      sizes={media.sizes}
      alt={media.alt}
      width={media.width}
      height={media.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={FILL}
    />
  );
}

function Caption({title, description}: {title: string; description: string}) {
  return (
    <div className="mt-4">
      <h3 className="type-h3 text-ink">{title}</h3>
      <p className="type-body text-ink-muted">{description}</p>
    </div>
  );
}

export function MediaBox({ratio, media, priority = false, banner = false, scrim = false, caption, children}: MediaBoxProps) {
  // w-full: the box's media is absolutely placed, so without it a box in a flex column shrinks to nothing.
  return (
    <div className="w-full">
      <div className={cn("relative overflow-hidden bg-card", RATIO_CLASS[ratio], banner ? "rounded-lg" : "rounded-md")}>
        <MediaElement media={media} priority={priority} />
        {scrim && (
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-ink/80 via-ink/60 via-50% to-transparent" />
        )}
        {children}
      </div>
      {caption && <Caption title={caption.title} description={caption.description} />}
    </div>
  );
}
