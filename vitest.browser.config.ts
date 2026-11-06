import {defineConfig} from "vite-plus";
import react from "@vitejs/plugin-react";
import {playwright} from "vite-plus/test/browser-playwright";
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
          name: "browser",
          include: ["src/**/*.browser.test.{ts,tsx}"],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{browser: "chromium"}],
          },
        },
      },
    ],
  },
});
