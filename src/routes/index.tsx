import {createFileRoute} from "@tanstack/react-router";
import {HomeView} from "@/features/home/view";
import {homeContent} from "@/lib/home-content";
import {homeHead} from "@/lib/home-head";

export const Route = createFileRoute("/")({
  head: () => homeHead(homeContent),
  component: HomeView,
});
