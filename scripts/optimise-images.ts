// Writes the WebP copies that `photo()` in src/lib/responsive-image.ts points to. Originals live in media/ (not
// deployed); the copies go to public/ at the same path. Run after adding or replacing a photo: `bun run images`.
import {mkdirSync, readdirSync, statSync} from "node:fs";
import {dirname, join, relative} from "node:path";
import sharp from "sharp";
import {variantPath, variantWidths} from "../src/lib/responsive-image.ts";

const SOURCE = "media";
const TARGET = "public";
// Measured on these placeholders: quality 72 keeps photos clean at roughly a third of the JPEG size.
const QUALITY = 72;

function originals(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return originals(path);
    return /\.(jpe?g|png)$/i.test(name) ? [path] : [];
  });
}

for (const file of originals(SOURCE)) {
  const src = `/${relative(SOURCE, file)}`;
  const {width} = await sharp(file).metadata();
  for (const size of variantWidths(width)) {
    const out = join(TARGET, variantPath(src, size));
    mkdirSync(dirname(out), {recursive: true});
    const {size: bytes} = await sharp(file).resize({width: size}).webp({quality: QUALITY, effort: 6}).toFile(out);
    console.log(`${String(Math.round(bytes / 1024)).padStart(4)} KB  ${out}`);
  }
}
