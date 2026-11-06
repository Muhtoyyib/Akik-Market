import "@testing-library/jest-dom/vitest";
import {cleanup} from "@testing-library/react";
import {afterEach, vi} from "vite-plus/test";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// jsdom lacks these browser APIs. Minimal stand-ins let components mount; real behaviour is covered by *.browser.test.tsx.
if (typeof window.matchMedia !== "function") {
  vi.stubGlobal("matchMedia", (media: string) => ({
    media,
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}
// Both observers only need to exist in jsdom: observing does nothing, and the browser tests cover what they drive.
class InertObserver {
  observe() {}
  disconnect() {}
}
for (const name of ["IntersectionObserver", "ResizeObserver"] as const) {
  if (typeof window[name] !== "function") vi.stubGlobal(name, InertObserver);
}
