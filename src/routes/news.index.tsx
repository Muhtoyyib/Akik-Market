import {createFileRoute} from "@tanstack/react-router";
import {NewsIndexView} from "@/features/news/index-view";
import {newsGrid} from "@/lib/content/news-page";
import {newsIndexHead} from "@/lib/page-heads";

export const Route = createFileRoute("/news/")({
  head: () => newsIndexHead,
  component: () => <NewsIndexView posts={newsGrid.posts} businesses={newsGrid.businesses} />,
});
