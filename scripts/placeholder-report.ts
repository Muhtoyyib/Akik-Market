// Prints Home's placeholder report, and adds it to the GitHub job summary in CI. A report, never a failure:
// the pitch build ships with placeholders by agreement (home-page design D2).
import {appendFileSync} from "node:fs";

// The content reads the build year that Vite's `define` normally injects (vitest.shared.ts); outside Vite, set it here.
Object.assign(globalThis, {__BUILD_YEAR__: new Date().getFullYear()});

const {homeContent} = await import("../src/lib/content/home.ts");
const {placeholderReport} = await import("../src/lib/placeholder-report.ts");

const report = placeholderReport(homeContent);
console.log(report);
const summary = process.env.GITHUB_STEP_SUMMARY;
if (summary) appendFileSync(summary, `${report}\n`);
