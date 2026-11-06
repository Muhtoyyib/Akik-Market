import {createFileRoute} from "@tanstack/react-router";
import {AboutView} from "@/features/about/view";
import {aboutContent, aboutHead} from "@/lib/content/about";

export const Route = createFileRoute("/about")({
  head: () => aboutHead,
  component: () => <AboutView content={aboutContent} />,
});
