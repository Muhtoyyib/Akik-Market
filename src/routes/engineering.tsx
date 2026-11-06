import {createFileRoute} from "@tanstack/react-router";
import {DivisionView} from "@/features/division/view";
import {divisionPage} from "@/lib/content/division-page";
import {pageExists} from "@/lib/site-pages";

const page = divisionPage("engineering", pageExists);

export const Route = createFileRoute("/engineering")({
  head: () => page.head,
  component: () => <DivisionView page={page} />,
});
