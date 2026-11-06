import {defineConfig} from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import {playwright} from "vite-plus/test/browser-playwright";
import {sharedTestConfig, sharedViteConfig} from "./vitest.shared.ts";

export default defineConfig({
  ...sharedViteConfig,
  // Tailwind runs here so browser tests see the real tokens and utilities from app.css.
  plugins: [tailwindcss(), react()],
  // Pre-bundled up front: when Vite finds a dependency mid-run it reloads the browser and every test file fails to import.
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "@base-ui/react/tabs",
      "@base-ui/react/dialog",
      "lucide-react",
      "axe-core",
      "@testing-library/react",
      "cn",
    ],
  },
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
            commands: {
              // Lets a test switch the reduced-motion preference, which context options can only set once per run.
              emulateReducedMotion: async ({page}, reduce: boolean) => {
                await page.emulateMedia({reducedMotion: reduce ? "reduce" : "no-preference"});
              },
            },
            instances: [{browser: "chromium"}],
          },
        },
      },
    ],
  },
});
