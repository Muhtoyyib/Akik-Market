import {resolve} from "node:path";

export const sharedViteConfig = {
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
