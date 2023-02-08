export function* getRangeIterator({ start = 1, end = Infinity, step = 1 }) {
  let x = start - step
  while (x <= end - step) yield (x += step)
}
