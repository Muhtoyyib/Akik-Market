import type {Block} from "@/lib/content/news-bodies";

/** One block of a post, in the house type styles (article spec, "Body"). Sub-headings are h2 under the post's h1. */
function BodyBlock({block}: {block: Block}) {
  if (block.kind === "paragraph") return <p>{block.text}</p>;
  if (block.kind === "heading") return <h2 className="mt-4 type-h3 text-ink">{block.text}</h2>;
  if (block.kind === "list")
    return (
      <ul className="flex list-disc flex-col gap-2 pl-6">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  const {image, caption} = block;
  return (
    <figure>
      <img {...image} alt={image.alt} loading="lazy" decoding="async" className="aspect-photo w-full rounded-md bg-card object-cover" />
      {caption && <figcaption className="mt-3 type-small text-ink-muted">{caption}</figcaption>}
    </figure>
  );
}

/** The body at the readable line length, its blocks in order. */
export function PostBody({blocks}: {blocks: readonly Block[]}) {
  return (
    <div data-post-body className="flex max-w-prose flex-col gap-5 type-body-lg text-ink">
      {blocks.map((block, index) => (
        // Blocks have no id of their own and never reorder on the page, so their place is a stable key.
        // oxlint-disable-next-line react/no-array-index-key
        <BodyBlock key={index} block={block} />
      ))}
    </div>
  );
}
