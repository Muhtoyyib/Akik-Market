/** The photo at the front after one press of an arrow; the stack goes round in a loop. */
export function turnStack(front: number, step: 1 | -1, count: number): number {
  return (front + step + count) % count;
}

/** How far behind the front a photo sits: 0 is the front, 1 peeks just behind it, and so on. */
export function stackDepth(index: number, front: number, count: number): number {
  return (index - front + count) % count;
}
