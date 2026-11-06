// Spec (news, "Header and cards"): Home shows the three newest posts.
const POSTS_ON_HOME = 3;

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/**
 * "2026-11-06" as "6 NOV 2026". Read from the string, not a Date, so a visitor west of UTC never sees the day before.
 * Dates come from our own content source, always written as YYYY-MM-DD.
 */
export function newsDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

/** The newest posts first. YYYY-MM-DD strings sort by date as plain text. */
export function latestPosts<T extends {date: string}>(posts: readonly T[]): T[] {
  return newestPosts(posts).slice(0, POSTS_ON_HOME);
}

/** The tabs on the News page: a business gets one only once it has a post, in the order given (filters spec). */
export function postBusinesses<K extends string>(posts: readonly {business: string}[], order: readonly K[]): K[] {
  return order.filter((key) => posts.some((post) => post.business === key));
}

/** Every post, newest first, without changing the collection. */
export function newestPosts<T extends {date: string}>(posts: readonly T[]): T[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}
