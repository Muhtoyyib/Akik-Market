import {Button} from "@/components/button/button";
import {MediaBox} from "@/components/media-box/media-box";
import {SectionHeader} from "@/components/section-header/section-header";
import {Frame} from "@/features/home/frame";
import {newsDate} from "@/lib/news";

type Post = {
  date: string;
  title: {value: string};
  href?: string;
  image: {value: {src: string; alt: string; width: number; height: number}};
};
type NewsProps = {eyebrow: string; heading: string; posts: readonly Post[]; action: {label: string; href: string}};

const HEADING_ID = "news-heading";

/** A link only once the post exists (news spec, "Links"): the title's ::after layer then covers the whole card. */
function Title({title, href}: {title: string; href?: string}) {
  if (href === undefined) return <h3 className="type-h3">{title}</h3>;
  return (
    <h3 className="type-h3 group-hover:underline">
      <a href={href} className="outline-none after:absolute after:inset-0">
        {title}
      </a>
    </h3>
  );
}

function NewsCard({date, title, href, image}: Post) {
  return (
    <div className="group rounded-md outline-offset-2 outline-brand-navy has-focus-visible:outline-2 has-focus-visible:outline-solid">
      <MediaBox ratio="3:2" scrim media={{kind: "image", ...image.value}}>
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-on-dark">
          <time dateTime={date} className="mb-2 type-label">
            {newsDate(date)}
          </time>
          <Title title={title.value} href={href} />
        </div>
      </MediaBox>
    </div>
  );
}

/** Matic P9: centred header, three image cards with the date and title over the photo, then one text link. */
export function News({eyebrow, heading, posts, action}: NewsProps) {
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <SectionHeader eyebrow={eyebrow} heading={heading} headingId={HEADING_ID} />
        {/* Focusable so a keyboard can scroll the swipe row (WCAG 2.1.1, axe scrollable-region-focusable): until the
            News page exists the cards hold no links. */}
        <ul
          // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a scrolling region must take focus; see above.
          tabIndex={0}
          aria-label="Latest posts"
          className="-mr-4 mt-8 flex snap-x snap-mandatory scrollbar-hidden gap-4 overflow-x-auto rounded-md pr-4 outline-offset-4 outline-brand-navy focus-visible:outline-2 focus-visible:outline-solid md:-mr-8 md:mt-12 md:pr-8 lg:mr-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pr-0"
        >
          {posts.map((post) => (
            <li key={post.date} className="w-4/5 shrink-0 snap-start md:w-2/5 lg:w-auto">
              <NewsCard {...post} />
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Button href={action.href} variant="link">
            {action.label}
          </Button>
        </div>
      </Frame>
    </section>
  );
}
