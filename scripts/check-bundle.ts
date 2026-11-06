// Fails the build when any page's JavaScript, gzipped, passes the budget in vitest.shared.ts. A page's JavaScript is
// every script its prerendered HTML loads or preloads; chunks for other pages load only on navigation, so they don't
// count against it. Runs after `vp build` in ci:build.
import {readdirSync, readFileSync} from "node:fs";
import {join} from "node:path";
import {gzipSync} from "node:zlib";
import {assetBudget} from "../vitest.shared.ts";

const CLIENT = "dist/client";
const SCRIPT_URL = /(?:src|href)="(\/assets\/[^"]+\.js)"/g;

const gzKb = (path: string) => gzipSync(readFileSync(join(CLIENT, path)), {level: 9}).length / 1024;

const pages = readdirSync(CLIENT)
  .filter((name) => name.endsWith(".html"))
  .map((name) => {
    const scripts = new Set([...readFileSync(join(CLIENT, name), "utf8").matchAll(SCRIPT_URL)].map((match) => match[1]!));
    return {name, kb: [...scripts].reduce((sum, path) => sum + gzKb(path), 0), files: scripts.size};
  })
  .sort((a, b) => b.kb - a.kb);

for (const {name, kb, files} of pages) console.log(`${name}: ${kb.toFixed(1)} KB gzipped across ${files} files`);
const [heaviest] = pages;
const line = `Heaviest page ${heaviest?.name}: ${heaviest?.kb.toFixed(1)} KB (budget ${assetBudget.scriptsGzipKb} KB per page)`;
if (!heaviest || heaviest.kb > assetBudget.scriptsGzipKb) {
  console.error(`Over budget. ${line}`);
  process.exit(1);
}
console.log(line);
