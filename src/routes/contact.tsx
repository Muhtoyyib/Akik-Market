import {createFileRoute} from "@tanstack/react-router";
import {ContactView} from "@/features/contact/view";
import {contactHead} from "@/lib/home-head";

export const Route = createFileRoute("/contact")({
  head: () => contactHead(),
  component: ContactView,
});
