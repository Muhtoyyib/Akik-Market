import {createFileRoute} from "@tanstack/react-router";
import {DivisionView} from "@/features/division/view";
import {divisionPage} from "@/lib/content/division-page";
import {autosPage} from "@/lib/content/divisions/autos";
import {divisionHead} from "@/lib/page-heads";
import {pageExists} from "@/lib/site-pages";

// The content is built inside the component, which the router splits into this page's own chunk; the head reads only
// the description (page-heads.ts).
export const Route = createFileRoute("/autos")({
  head: () => divisionHead("autos"),
  component: () => <DivisionView page={divisionPage({key: "autos", page: autosPage}, pageExists)} />,
});
