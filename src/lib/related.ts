// "More like this" under a project or a post (projects related spec, news related spec): the same rule for both.

const RELATED_COUNT = 3;

type Key = {id: string; group: string; date: string};

/** Up to three others: the newest in the same group, then the newest of any group, never the current one. Dates are
 * ISO strings, which sort by date as plain text. */
export function relatedItems<T>(current: T, all: readonly T[], key: (item: T) => Key): T[] {
  const own = key(current);
  const others = all.filter((item) => key(item).id !== own.id).sort((a, b) => key(b).date.localeCompare(key(a).date));
  const same = others.filter((item) => key(item).group === own.group);
  const rest = others.filter((item) => key(item).group !== own.group);
  return [...same, ...rest].slice(0, RELATED_COUNT);
}
