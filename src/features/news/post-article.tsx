import {BackLink} from "@/components/back-link/back-link";
import {Frame} from "@/components/frame/frame";
import {MediaBox} from "@/components/media-box/media-box";
import {PostBody} from "@/features/news/post-body";
import {business} from "@/lib/content/business";
import type {Post} from "@/lib/content/news";
import type {Block} from "@/lib/content/news-bodies";
import {newsDate} from "@/lib/news";

const HEADING_ID = "post-heading";

/** A post (article spec): back link, the business and date, the page's h1, a 3:2 photo, then the body, all in one
 * centred column. */
export function PostArticle({post, body}: {post: Post; body: readonly Block[]}) {
  const {title, date, image} = post;
  return (
    <article aria-labelledby={HEADING_ID} className="pt-6 md:pt-8">
      <Frame>
        <div className="mx-auto max-w-prose">
          <BackLink href="/news" label="All news" />
          <p className="mt-8 type-label text-ink-muted">
            <span className="text-accent">{business(post.business).name}</span> · <time dateTime={date}>{newsDate(date)}</time>
          </p>
          <h1 id={HEADING_ID} className="mt-3 type-display text-ink">
            {title.value}
          </h1>
          <div className="mt-8 md:mt-12">
            <MediaBox ratio="3:2" media={{kind: "image", ...image.value}} priority />
          </div>
          <div className="mt-8 md:mt-12">
            <PostBody blocks={body} />
          </div>
        </div>
      </Frame>
    </article>
  );
}
