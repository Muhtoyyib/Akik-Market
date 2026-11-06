import {useSyncExternalStore} from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return matchMedia(QUERY).matches;
}

// Prerendered HTML assumes reduced motion, so nothing starts moving before the visitor's setting is known.
function getServerSnapshot() {
  return true;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
