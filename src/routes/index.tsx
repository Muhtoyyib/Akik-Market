import {createFileRoute} from "@tanstack/react-router";
import {HomeView} from "@/features/home/view";
import {homeHead} from "@/lib/home-head";

export const Route = createFileRoute("/")({
  head: () => homeHead(),
  component: HomeView,
});
