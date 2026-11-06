import {defineConfig} from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import {playwright} from "vite-plus/test/browser-playwright";
import {sharedTestConfig, sharedViteConfig} from "./vitest.shared.ts";

export default defineConfig({
  ...sharedViteConfig,
  // Tailwind runs here so browser tests see the real tokens and utilities from app.css.
  plugins: [tailwindcss(), react()],
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
            // The site is light-only (design-system D3), so every browser test runs with the system set to dark to prove it.
            provider: playwright({contextOptions: {colorScheme: "dark"}}),
            headless: true,
            instances: [{browser: "chromium"}],
          },
        },
      },
    ],
  },
});
