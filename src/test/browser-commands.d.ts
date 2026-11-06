// Types for the custom commands registered in vitest.browser.config.ts.
declare module "vitest/browser" {
  interface BrowserCommands {
    emulateReducedMotion: (reduce: boolean) => Promise<void>;
  }
}
export {};
