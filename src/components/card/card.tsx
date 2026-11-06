import {cn} from "cn";
import {ArrowRight} from "lucide-react";
import {MediaBox} from "@/components/media-box/media-box";

type Division = "phones" | "engineering" | "autos";
type CardImage = {src: string; alt: string; width: number; height: number};

type CardProps = {
  heading: string;
  eyebrow?: string;
  description?: string;
  href?: string;
} & (
  | {variant?: "content" | "inset-link"; division?: never; image?: never}
  // Division cards take an image, never a video: a video's pause button cannot sit inside the card's link.
  | {variant: "division"; division: Division; image: CardImage}
);

const SURFACE = {
  content: "rounded-md bg-card p-6 md:p-8",
  "inset-link": "rounded-md bg-card p-6",
  division: "rounded-md",
} as const;

// Pushed to the bottom so arrows line up across a row of cards; 24px from the text above at the least.
function Arrow() {
  return (
    <span aria-hidden className="mt-auto pt-6">
      <span
        data-card-arrow
        className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors ease-standard group-hover:border-ink group-hover:bg-ink group-hover:text-on-dark"
      >
        <ArrowRight size={20} strokeWidth={1.5} />
      </span>
    </span>
  );
}

// A stretched link: the heading carries the only link, and its ::after layer covers the whole card so any click lands on it.
// The link is named by the heading alone, and axe's label-in-name rule holds because the name is the link's visible text.
function Heading({heading, href}: {heading: string; href?: string}) {
  if (href === undefined) return <h3 className="type-h3 text-ink">{heading}</h3>;
  return (
    <h3 className="type-h3 text-ink group-hover:underline">
      <a href={href} className="outline-none after:absolute after:inset-0">
        {heading}
      </a>
    </h3>
  );
}

function Text({eyebrow, heading, description, href}: {eyebrow?: string; heading: string; description?: string; href?: string}) {
  return (
    <>
      {eyebrow && <p className="mb-3 type-label text-ink-muted in-division:text-accent">{eyebrow}</p>}
      <Heading heading={heading} href={href} />
      {description && <p className="mt-2 type-body text-ink-muted">{description}</p>}
      {href !== undefined && <Arrow />}
    </>
  );
}

export function Card({heading, eyebrow, description, href, variant = "content", division, image}: CardProps) {
  const text = <Text eyebrow={eyebrow} heading={heading} description={description} href={href} />;
  return (
    <div
      data-card
      data-division={division}
      className={cn(
        "relative flex h-full flex-col items-start",
        SURFACE[variant],
        // The focus ring goes round the whole card, not just the heading text.
        href !== undefined && "group outline-offset-2 outline-brand-navy has-focus-visible:outline-2 has-focus-visible:outline-solid"
      )}
    >
      {image ? (
        <>
          <MediaBox ratio="4:5" media={{kind: "image", ...image}} />
          <div className="mt-4 flex flex-1 flex-col items-start">{text}</div>
        </>
      ) : (
        text
      )}
    </div>
  );
}
