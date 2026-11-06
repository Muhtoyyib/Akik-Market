// @ts-check
/** @type {import("@stryker-mutator/api/core").PartialStrykerOptions} */
export default {
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress"],
  testRunner: "vitest",
  coverageAnalysis: "perTest",
  mutate: ["src/lib/**/*.ts", "!src/**/*.test.*", "!src/**/__tests__/**", "!src/**/*.gen.ts", "!src/**/*.d.ts"],
  // Stryker rewrites the named tsconfig in its sandbox through the TypeScript JS API, which TypeScript 7 no
  // longer ships. The rewrite only fixes up `extends` and project references, and tsconfig.json has neither,
  // so point it at a file that doesn't exist to skip it. Remove this once Stryker supports TypeScript 7.
  tsconfigFile: "stryker-skip-tsconfig-rewrite.json",
  thresholds: {high: 90, low: 80, break: 80},
  tempDirName: ".stryker-tmp",
  ignorePatterns: [".claude", ".agents", "openspec", "AGENTS.md", "CLAUDE.md", "docs", "reports", "dist", "coverage"],
};
