import {MediaBox} from "@/components/media-box/media-box";
import {priceLabel} from "@/lib/featured";
import {opensInNewTab} from "@/lib/links";

export type FeaturedItem = {
  name: string;
  detail: string;
  price?: number;
  href: string;
  image: {src: string; alt: string; width: number; height: number};
};

/**
 * A Krea-style card: text over the bottom of a 4:5 photo. The name carries the card's only link, and its ::after layer
 * covers the whole card (the text layer fills the box so the stretch reaches every edge).
 */
export function ItemCard({name, detail, price, href, image}: FeaturedItem) {
  const newTab = opensInNewTab(href);
  return (
    <div className="group rounded-md outline-offset-2 outline-brand-navy has-focus-visible:outline-2 has-focus-visible:outline-solid">
      <MediaBox ratio="4:5" scrim media={{kind: "image", ...image}}>
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-on-dark">
          <h3 className="type-h3 group-hover:underline">
            <a
              href={href}
              target={newTab ? "_blank" : undefined}
              rel={newTab ? "noopener noreferrer" : undefined}
              className="outline-none after:absolute after:inset-0"
            >
              <span className="sr-only">Ask about</span> {name} <span className="sr-only">on WhatsApp</span>
            </a>
          </h3>
          <p className="mt-2 type-label">{detail}</p>
          <p className="mt-1 type-label">{priceLabel(price)}</p>
        </div>
      </MediaBox>
    </div>
  );
}
