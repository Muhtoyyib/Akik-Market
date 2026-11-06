import {act, renderHook} from "@testing-library/react";
import {createElement} from "react";
import {renderToString} from "react-dom/server";
import {afterEach, describe, expect, it, vi} from "vite-plus/test";
import {usePrefersReducedMotion} from "@/lib/use-prefers-reduced-motion";

// jsdom has no matchMedia; this stands in for the browser's.
function stubMatchMedia(initiallyReduced: boolean) {
  const listeners = new Set<() => void>();
  const query = {
    matches: initiallyReduced,
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: (type: string, listener: () => void) => type === "change" && listeners.add(listener),
    removeEventListener: (type: string, listener: () => void) => type === "change" && listeners.delete(listener),
  };
  const matchMedia = vi.fn((media: string) => ({...query, media, matches: media === query.media && query.matches}));
  vi.stubGlobal("matchMedia", matchMedia);
  return {
    matchMedia,
    listeners,
    change(reduced: boolean) {
      query.matches = reduced;
      listeners.forEach((listener) => listener());
    },
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("usePrefersReducedMotion", () => {
  it("is true when the system asks for reduced motion", () => {
    stubMatchMedia(true);
    expect(renderHook(() => usePrefersReducedMotion()).result.current).toBe(true);
  });

  it("is false when the system allows motion", () => {
    stubMatchMedia(false);
    expect(renderHook(() => usePrefersReducedMotion()).result.current).toBe(false);
  });

  it("follows the setting when the visitor changes it", () => {
    const media = stubMatchMedia(false);
    const {result} = renderHook(() => usePrefersReducedMotion());
    act(() => media.change(true));
    expect(result.current).toBe(true);
  });

  it("stops listening once unmounted", () => {
    const media = stubMatchMedia(false);
    renderHook(() => usePrefersReducedMotion()).unmount();
    expect(media.listeners.size).toBe(0);
  });

  it("assumes reduced motion in prerendered HTML, before the visitor's setting is known", () => {
    function Probe() {
      return createElement("span", null, String(usePrefersReducedMotion()));
    }
    expect(renderToString(createElement(Probe))).toBe("<span>true</span>");
  });
});
