import {LinkBanner} from "@/components/link-banner/link-banner";
import {PageLayout} from "@/components/page-layout/page-layout";
import {PostArticle} from "@/features/news/post-article";
import {RelatedPosts} from "@/features/news/related-posts";
import type {postPage} from "@/lib/content/news-page";
import {pageNav} from "@/lib/page-nav";
import {pageExists} from "@/lib/site-pages";

type PostViewProps = ReturnType<typeof postPage>;

/** One post: the article, other posts, then a banner into the business the post is about. */
export function PostView({post, body, related, banner}: PostViewProps) {
  return (
    <PageLayout links={pageNav(post.href, pageExists)} division={post.business}>
      <PostArticle post={post} body={body.value} />
      <RelatedPosts posts={related} />
      <LinkBanner
        name="About this business"
        headingId="business-heading"
        division={post.business}
        eyebrow={banner.eyebrow}
        heading={banner.heading}
        href={banner.link.href}
        linkHint={banner.link.hint}
        image={banner.image}
      />
    </PageLayout>
  );
}
