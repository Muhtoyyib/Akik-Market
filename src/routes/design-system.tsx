import {createFileRoute} from "@tanstack/react-router";
import {DesignSystemView} from "@/features/design-system/view";
import {getPageTitle} from "@/lib/site-config";

export const Route = createFileRoute("/design-system")({
  // Internal review page: kept out of search results.
  head: () => ({meta: [{title: getPageTitle("Design system")}, {name: "robots", content: "noindex, nofollow"}]}),
  component: DesignSystemView,
});
