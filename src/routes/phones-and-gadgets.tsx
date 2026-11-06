import {createFileRoute} from "@tanstack/react-router";
import {DivisionView} from "@/features/division/view";
import {divisionPage} from "@/lib/content/division-page";
import {divisionHead} from "@/lib/page-heads";
import {pageExists} from "@/lib/site-pages";

// The content is built inside the component, which the router splits into this page's own chunk; the head reads only
// the description (page-heads.ts).
export const Route = createFileRoute("/phones-and-gadgets")({
  head: () => divisionHead("phones"),
  component: () => <DivisionView page={divisionPage("phones", pageExists)} />,
});
