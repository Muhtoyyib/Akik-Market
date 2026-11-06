import {existsSync, readdirSync, statSync} from "node:fs";
import {extname, join} from "node:path";
import {describe, expect, it} from "vite-plus/test";
import {homeContent} from "@/lib/content/home";
import {assetBudget} from "../../../vitest.shared";

const PUBLIC_MEDIA = "public/placeholders";
const PHONE_WIDTH = "-480.webp";

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const kb = (path: string) => statSync(path).size / 1024;
const over = (paths: string[], limit: number) =>
  paths.filter((path) => kb(path) > limit).map((path) => `${path} ${Math.round(kb(path))} KB`);

// Every srcset in the content, so a photo can't point at a copy that was never generated.
function srcSets(node: unknown): string[] {
  if (typeof node !== "object" || node === null) return [];
  const own = "srcSet" in node && typeof node.srcSet === "string" ? [node.srcSet] : [];
  return [...own, ...Object.values(node).flatMap(srcSets)];
}

describe("asset budget", () => {
  const media = files(PUBLIC_MEDIA);
  const photos = media.filter((path) => extname(path) === ".webp");

  it("ships photos only as WebP and clips only as WebM", () => {
    expect(media.filter((path) => ![".webp", ".webm"].includes(extname(path)))).toEqual([]);
  });

  it(`keeps every photo copy under ${assetBudget.photoKb} KB`, () => {
    expect(over(photos, assetBudget.photoKb)).toEqual([]);
  });

  it(`keeps every phone-sized copy under ${assetBudget.phonePhotoKb} KB`, () => {
    expect(
      over(
        photos.filter((path) => path.endsWith(PHONE_WIDTH)),
        assetBudget.phonePhotoKb
      )
    ).toEqual([]);
  });

  it(`keeps every looping clip under ${assetBudget.videoKb} KB`, () => {
    expect(
      over(
        media.filter((path) => extname(path) === ".webm"),
        assetBudget.videoKb
      )
    ).toEqual([]);
  });

  it("has a file on disk for every copy a photo lists", () => {
    const listed = srcSets(homeContent).flatMap((srcSet) => srcSet.split(", ").map((entry) => entry.split(" ")[0]));
    expect([listed.length > 0, listed.filter((src) => !existsSync(`public${src}`))]).toEqual([true, []]);
  });
});
