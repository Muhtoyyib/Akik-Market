import {createFileRoute} from "@tanstack/react-router";
import {DivisionView} from "@/features/division/view";
import {divisionPage} from "@/lib/content/division-page";
import {engineeringPage} from "@/lib/content/divisions/engineering";
import {divisionHead} from "@/lib/page-heads";
import {pageExists} from "@/lib/site-pages";

// The content is built inside the component, which the router splits into this page's own chunk; the head reads only
// the description (page-heads.ts).
export const Route = createFileRoute("/engineering")({
  head: () => divisionHead("engineering"),
  component: () => <DivisionView page={divisionPage({key: "engineering", page: engineeringPage}, pageExists)} />,
});
