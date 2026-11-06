import {Frame} from "@/components/frame/frame";
import {NewsGrid} from "@/features/news/news-grid";
import type {Post} from "@/lib/content/news";

const HEADING_ID = "related-heading";

/** Up to three other posts as index cards; left out with none (related spec). */
export function RelatedPosts({posts}: {posts: readonly Post[]}) {
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <h2 id={HEADING_ID} className="type-h2 text-ink">
          More news
        </h2>
        <div className="mt-8 md:mt-12">
          <NewsGrid posts={posts} level={3} />
        </div>
      </Frame>
    </section>
  );
}
