import {defineConfig} from "vite-plus";
import react from "@vitejs/plugin-react";
import {sharedTestConfig, sharedViteConfig} from "./vitest.shared.ts";

export default defineConfig({
  ...sharedViteConfig,
  plugins: [react()],
  test: {
    ...sharedTestConfig,
    projects: [
      {
        extends: true,
        test: {
          name: "dom",
          include: ["src/**/*.{test,spec}.{ts,tsx}"],
          exclude: ["**/*.browser.test.{ts,tsx}"],
          environment: "jsdom",
          setupFiles: ["./vitest.setup.ts"],
        },
      },
    ],
  },
});
