type Track = {scrollLeft: number; clientWidth: number};
type Item = {offsetLeft: number; offsetWidth: number};

/** The track's scrollLeft that brings the item fully into view, moving as little as possible. */
export function scrollLeftToReveal(track: Track, item: Item): number {
  const scrollToShowEnd = item.offsetLeft + item.offsetWidth - track.clientWidth;
  return Math.min(item.offsetLeft, Math.max(track.scrollLeft, scrollToShowEnd));
}
