import {Frame} from "@/components/frame/frame";
import {PageLayout} from "@/components/page-layout/page-layout";
import {SectionHeader} from "@/components/section-header/section-header";
import {NewsFilter} from "@/features/news/news-filter";
import type {BusinessKey} from "@/lib/content/business";
import type {Post} from "@/lib/content/news";
import {newsIndex} from "@/lib/content/news-page";
import {pageNav} from "@/lib/page-nav";
import {pageExists} from "@/lib/site-pages";

type NewsIndexViewProps = {posts: readonly Post[]; businesses: readonly BusinessKey[]};

/** News: Matic P3's header with the page's h1 and the Instagram link, then the filter tabs and every post. */
export function NewsIndexView({posts, businesses}: NewsIndexViewProps) {
  const {eyebrow, heading, intro, instagram} = newsIndex;
  return (
    <PageLayout links={pageNav("/news", pageExists)}>
      <section aria-labelledby="news-index-heading" className="pt-12 md:pt-20">
        <Frame>
          <SectionHeader
            level={1}
            eyebrow={eyebrow.value}
            heading={heading.value}
            description={intro.value}
            action={{href: instagram.href, label: instagram.label.value}}
            headingId="news-index-heading"
          />
          <div className="mt-12 md:mt-16">
            <NewsFilter posts={posts} businesses={businesses} />
          </div>
        </Frame>
      </section>
    </PageLayout>
  );
}
