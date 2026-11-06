import {runnerImport} from "vite";
import {defineConfig, lazyPlugins} from "vite-plus";
import {tanstackStart} from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import {cn} from "cn/vite";
import {sharedViteConfig} from "./vitest.shared.ts";

export default defineConfig({
  fmt: {
    printWidth: 140,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
    arrowParens: "always",
    bracketSpacing: false,
    bracketSameLine: false,
    endOfLine: "lf",
    ignorePatterns: ["routeTree.gen.ts", "cn-tables.ts"],
  },
  lint: {
    plugins: ["react", "react-perf", "typescript", "jsx-a11y"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/prefer-tag-over-role": "off",
      "typescript/no-explicit-any": "error",
      "eslint/complexity": ["error", {max: 10}],
      "eslint/max-lines-per-function": ["error", {max: 50, skipComments: true}],
      "eslint/max-lines": ["error", {max: 250, skipBlankLines: true, skipComments: true}],
      "eslint/max-params": ["error", 3],
      "eslint/max-depth": ["error", 3],
      "eslint/max-statements": ["error", 25],
      "eslint/max-classes-per-file": ["error", 1],
      "oxc/branches-sharing-code": "warn",
      "vite-plus/prefer-vite-plus-imports": "error",
      "shadcn/no-raw-colors": "error",
      "shadcn/no-arbitrary-values": [
        "error",
        {
          // Marketing layouts and per-element letter-spacing/line-height are bespoke by design.
          allow: ["layout", "tracking-*", "leading-*"],
        },
      ],
      "shadcn/no-inline-styles": "error",
      "shadcn/no-unknown-classes": "error",
    },
    ignorePatterns: ["*.html", "public", "__tests__", "*.test.ts", "*.test.tsx", "*.config.ts", "routeTree.gen.ts", "cn-tables.ts"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {name: "vite-plus", specifier: "vite-plus/oxlint-plugin"},
      {name: "shadcn", specifier: "@shadcn/lint"},
    ],
  },
  plugins: lazyPlugins(async () => {
    // Loaded through Vite so the page list can import content modules, which use the @ alias the config loader can't
    // resolve (site-shell task 3.2).
    const {module: sitePages} = await runnerImport<typeof import("./src/lib/site-pages.ts")>("./src/lib/site-pages.ts", {
      configFile: false,
      ...sharedViteConfig,
    });
    return [
      // Refits src/lib/cn-tables.ts to the classes in src on every build and dev change (src/lib/cn.ts).
      cn({content: ["src/**/*.{ts,tsx}"], out: "src/lib/cn-tables.ts"}),
      tailwindcss(),
      tanstackStart({
        prerender: {
          enabled: true,
          autoStaticPathsDiscovery: false,
          crawlLinks: false,
          autoSubfolderIndex: false,
        },
        router: {
          quoteStyle: "double",
        },
        pages: sitePages.prerenderPathnames.map((path) => ({path})),
      }),
      react({compiler: true}),
    ];
  }),
  define: sharedViteConfig.define,
  // Components that two or more pages share go in one chunk. Split per module, each new page broke them into more,
  // smaller files that compress worse (measured with About added: Home 179.2 KB across 14 files, 172.5 across 4).
  // Content stays out of it: grouped with src/lib, every page loaded every page's copy. The page-head helpers join it
  // because every page loads them anyway; as two files of their own they cost 0.3 KB more (measured with News added).
  // Components that the heaviest pages don't load up front stay out (Stories, LeadQuote, ClosingBlock, BodyBlocks,
  // BackLink): in the group they cost those pages 0.1 to 0.4 KB each (measured with Testimonials and Contact added).
  // QuoteWall too, since Home loads it late: grouped, every division page carried it (171.7 KB against 170.4). Icons stay out too: grouped, Home loaded every division's icons (172.2 KB against 170.9).
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "shared",
              test: /\/src\/(components\/(?!stories\/|quote-wall\/|lead-quote\/|closing-block\/|body-blocks\/|back-link\/)|lib\/page-head\.ts|lib\/content\/page-descriptions\.ts)/,
              minShareCount: 2,
            },
          ],
        },
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
    alias: sharedViteConfig.resolve.alias,
  },
  server: {
    port: 5180,
  },
});
