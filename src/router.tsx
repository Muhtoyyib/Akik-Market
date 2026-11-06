import {createRouter as createTanStackRouter} from "@tanstack/react-router";
import {routedPath} from "@/lib/site-pages";
import {routeTree} from "./routeTree.gen";

export function getRouter() {
  return createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    // Unknown paths render the 404 route, matching the 404.html the host serves there; the address bar keeps the path.
    rewrite: {
      input: ({url}) => {
        url.pathname = routedPath(url.pathname);
        return url;
      },
    },
  });
}
