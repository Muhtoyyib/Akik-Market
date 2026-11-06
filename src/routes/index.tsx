import {createFileRoute} from "@tanstack/react-router";
import {HomeView} from "@/features/home/view";

export const Route = createFileRoute("/")({
  component: HomeView,
});
