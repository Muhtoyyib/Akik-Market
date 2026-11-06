import {Button} from "@/components/button/button";
import {Frame} from "@/components/frame/frame";
import {MediaBox} from "@/components/media-box/media-box";

type HeroMedia =
  | {kind: "video"; poster: string; src: string}
  | {kind: "image"; src: string; alt: string; width: number; height: number; srcSet?: string; sizes?: string};

type HeroProps = {
  media: HeroMedia;
  heading: string;
  claims: readonly string[];
  whatsappHref: string;
  /** The business name over the h1 on a division page. */
  eyebrow?: string;
  /** Home's "See what we do", to the divisions heading. */
  seeMoreHref?: string;
};

/** Matic P2: the media box leads, then the page's one h1, the WhatsApp pill and a line of short claims. */
export function Hero({media, heading, claims, whatsappHref, eyebrow, seeMoreHref}: HeroProps) {
  return (
    <section aria-labelledby="hero-heading">
      <Frame>
        <MediaBox ratio="4:5/16:9" media={media} priority />
        <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center text-center">
          {eyebrow && <p className="mb-3 type-label text-ink-muted in-division:text-accent">{eyebrow}</p>}
          <h1 id="hero-heading" className="type-display text-balance">
            {heading}
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <Button href={whatsappHref}>Chat on WhatsApp</Button>
            {seeMoreHref && (
              <Button href={seeMoreHref} variant="link">
                See what we do
              </Button>
            )}
          </div>
          {/* Each claim stays whole; the line may only wrap between them. */}
          <p className="mt-6 type-small text-ink-muted">
            {claims.map((claim, index) => (
              <span key={claim}>
                {index > 0 && " · "}
                <span className="whitespace-nowrap">{claim}</span>
              </span>
            ))}
          </p>
        </div>
      </Frame>
    </section>
  );
}
