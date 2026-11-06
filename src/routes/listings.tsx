import {createFileRoute} from "@tanstack/react-router";
import {ListingsView} from "@/features/listings/view";
import {listingsGrid} from "@/lib/content/listings-page";
import {listingsHead} from "@/lib/page-heads";

export const Route = createFileRoute("/listings")({
  head: () => listingsHead,
  component: () => <ListingsView tabs={listingsGrid} />,
});
