// Pure rules for the Testimonials page: the photo wall's layout, permission for real quotes and story tab labels
// (testimonials-page specs).

// Spec (quote-wall, "Photo wall"): centred rows that stagger.
export const WALL_ROWS = [6, 7, 8, 7, 6] as const;

export type WallTile = {kind: "customer"; index: number} | {kind: "filler"; index: number};

/** The wall's rows, with `customers` tiles spread evenly through it and filler tiles everywhere else. Past the wall's
 * size, the rows repeat so every customer still gets a tile. */
export function wallLayout(customers: number): WallTile[][] {
  const rows: number[] = [...WALL_ROWS];
  while (rows.reduce((sum, count) => sum + count, 0) < customers) rows.push(...WALL_ROWS);
  const total = rows.reduce((sum, count) => sum + count, 0);
  const spots = new Map(Array.from({length: customers}, (_, index) => [Math.floor(((index + 0.5) * total) / customers), index]));
  let cell = 0;
  let filler = 0;
  return rows.map((count) =>
    Array.from({length: count}, () => {
      const customer = spots.get(cell++);
      return customer === undefined ? {kind: "filler" as const, index: filler++} : {kind: "customer" as const, index: customer};
    })
  );
}

type Quoted = {name: string; quote: {placeholder: boolean}; permission?: {date: string; recordedBy: string}};

/** Spec (page, "Permission for real customers"): the names of real quotes with no permission record. */
export function missingPermission(quotes: readonly Quoted[]): string[] {
  return quotes.filter((item) => !item.quote.placeholder && !item.permission).map((item) => item.name);
}

/** A story's tab: the business's short name, plus the first name when that business has more than one story. */
export function storyTabLabel(tab: string, name: string, storiesOfBusiness: number): string {
  return storiesOfBusiness > 1 ? `${tab} · ${name}` : tab;
}
