import {MediaBox} from "@/components/media-box/media-box";
import {newsDate} from "@/lib/news";

export type NewsCardPost = {
  date: string;
  title: {value: string};
  href?: string;
  image: {value: {src: string; alt: string; width: number; height: number}};
};

type NewsCardProps = NewsCardPost & {
  /** h3 under a section's h2 (Home, a post's related posts), h2 straight under the News page's h1. */
  level?: 2 | 3;
};

/** Matic P9's card: the date and title over the bottom of a 3:2 photo. A link only once the post exists (news spec,
 * "Links"): the title's ::after layer then covers the whole card. */
export function NewsCard({date, title, href, image, level = 3}: NewsCardProps) {
  const Title = level === 2 ? "h2" : "h3";
  return (
    <div className="group rounded-md outline-offset-2 outline-brand-navy has-focus-visible:outline-2 has-focus-visible:outline-solid">
      <MediaBox ratio="3:2" scrim media={{kind: "image", ...image.value}}>
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-on-dark">
          <time dateTime={date} className="mb-2 type-label">
            {newsDate(date)}
          </time>
          <Title className={href ? "type-h3 group-hover:underline" : "type-h3"}>
            {href ? (
              <a href={href} className="outline-none after:absolute after:inset-0">
                {title.value}
              </a>
            ) : (
              title.value
            )}
          </Title>
        </div>
      </MediaBox>
    </div>
  );
}
