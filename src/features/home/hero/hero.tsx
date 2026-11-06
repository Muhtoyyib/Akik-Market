import {Button} from "@/components/button/button";
import {MediaBox} from "@/components/media-box/media-box";
import {Frame} from "@/features/home/frame";

type HeroProps = {
  media: {poster: string; src: string};
  heading: string;
  claims: readonly string[];
  whatsappHref: string;
};

export function Hero({media, heading, claims, whatsappHref}: HeroProps) {
  return (
    <section aria-labelledby="hero-heading">
      <Frame>
        <MediaBox ratio="4:5/16:9" media={{kind: "video", ...media}} priority />
        <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center text-center">
          <h1 id="hero-heading" className="type-display text-balance">
            {heading}
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <Button href={whatsappHref}>Chat on WhatsApp</Button>
            <Button href="#divisions" variant="link">
              See what we do
            </Button>
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
