// `import {cn} from "cn"` resolves here (vite.config.ts and vitest.shared.ts alias it): cn's own build setup, with merge
// tables compiled to the classes this site uses (cn-tables.ts, rewritten by the cn/vite plugin on every build). The full
// tables cost every page about 2 KB more gzipped (measured 2026-11-06: 5.2 KB against 3.0).
import {createCn} from "cn/engine";
import tables from "@/lib/cn-tables";

export const cn = createCn(tables);
