import {resolve} from "node:path";

export const sharedViteConfig = {
  // Spec (footer link-columns, "Legal line"): the copyright year is fixed when the site is built, not read in the browser.
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
};

// Asset budget (home-page task 1.4; imagery spec, "Weight"), in KB. Set above what was measured on 2026-11-06:
// largest photo 155, largest phone copy 64, hero loop 904, all JS gzipped 168 (Home loads 165 of it; the menu's
// dialog added 18 to the routes chunk). Since the division pages, scripts are budgeted per page (what one page's HTML
// loads), measured 2026-11-06 at 171.7 for Engineering, the heaviest, with shared components in one chunk and
// page copy kept out of route heads.
// Budgets only go down: lower one when
// the site gets lighter, and never raise one to get a change through.
export const assetBudget = {
  photoKb: 200,
  phonePhotoKb: 80,
  videoKb: 1024,
  scriptsGzipKb: 174,
};

export const sharedTestConfig = {
  globals: true,
  css: true,
  coverage: {
    provider: "v8" as const,
    reporter: ["text", "json-summary", "html"],
    include: ["src/lib/**/*.ts"],
    exclude: ["**/*.d.ts", "**/*.gen.ts", "**/__tests__/**"],
    // Floors only go up: raise them to the measured value when coverage improves, never lower one to pass.
    thresholds: {
      lines: 90,
      functions: 90,
      branches: 90,
      statements: 90,
    },
  },
};
