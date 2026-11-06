import {Frame} from "@/components/frame/frame";
import {MediaBox} from "@/components/media-box/media-box";
import {SwipeRow} from "@/components/swipe-row/swipe-row";
import {SIZES} from "@/lib/responsive-image";

type GalleryPhoto = {src: string; alt: string; width: number; height: number; srcSet?: string; sizes?: string};

const HEADING_ID = "gallery-heading";

/** Matic P4: every photo after the hero's in a swipe row; left out when the hero is the only one (gallery spec). */
export function ProjectGallery({photos}: {photos: readonly GalleryPhoto[]}) {
  const rest = photos.slice(1);
  if (rest.length === 0) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={HEADING_ID} className="type-h2 text-ink">
          More photos
        </h2>
        <div className="mt-8 md:mt-12">
          <SwipeRow
            items={rest.map((photo) => ({
              key: photo.src,
              node: <MediaBox ratio="3:2" media={{kind: "image", ...photo, sizes: SIZES.halfWidth}} />,
            }))}
            itemClassName="w-4/5 md:w-1/2 lg:w-5/12"
            noun="photo"
            focusLabel="More photos"
          />
        </div>
      </Frame>
    </section>
  );
}
