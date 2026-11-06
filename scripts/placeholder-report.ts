// Prints the placeholder report for every content module, and adds it to the GitHub job summary in CI. A report, never a failure:
// the pitch build ships with placeholders by agreement (home-page design D2).
import {appendFileSync} from "node:fs";

// The content reads the build year that Vite's `define` normally injects (vitest.shared.ts); outside Vite, set it here.
Object.assign(globalThis, {__BUILD_YEAR__: new Date().getFullYear()});

const {allContent} = await import("../src/lib/content/all-content.ts");
const {placeholderReport} = await import("../src/lib/placeholder-report.ts");

const report = placeholderReport(allContent);
console.log(report);
const summary = process.env.GITHUB_STEP_SUMMARY;
if (summary) appendFileSync(summary, `${report}\n`);
