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
if (typeof window.IntersectionObserver !== "function") {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    }
  );
}
