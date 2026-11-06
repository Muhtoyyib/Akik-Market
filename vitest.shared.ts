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
