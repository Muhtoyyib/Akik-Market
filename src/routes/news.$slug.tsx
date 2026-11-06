import {createFileRoute} from "@tanstack/react-router";
import {PostView} from "@/features/news/post-view";
import {postPage} from "@/lib/content/news-page";
import {newsPostHead} from "@/lib/page-heads";

// No loader: the content is bundled, so the page is built from the slug and nothing is serialised into the HTML.
export const Route = createFileRoute("/news/$slug")({
  head: ({params}) => newsPostHead(params.slug),
  component: NewsPostRoute,
});

function NewsPostRoute() {
  return <PostView {...postPage(Route.useParams().slug)} />;
}
