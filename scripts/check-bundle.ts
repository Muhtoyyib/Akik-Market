// Fails the build when the JavaScript shipped to browsers, gzipped, passes the budget in vitest.shared.ts.
// Runs after `vp build` in ci:build (home-page task 1.4).
import {readdirSync, readFileSync} from "node:fs";
import {join} from "node:path";
import {gzipSync} from "node:zlib";
import {assetBudget} from "../vitest.shared.ts";

const ASSETS = "dist/client/assets";

const scripts = readdirSync(ASSETS).filter((name) => name.endsWith(".js"));
const totalKb = scripts.reduce((sum, name) => sum + gzipSync(readFileSync(join(ASSETS, name)), {level: 9}).length, 0) / 1024;
const line = `JavaScript: ${totalKb.toFixed(1)} KB gzipped across ${scripts.length} files (budget ${assetBudget.scriptsGzipKb} KB)`;

if (totalKb > assetBudget.scriptsGzipKb) {
  console.error(`Over budget. ${line}`);
  process.exit(1);
}
console.log(line);
