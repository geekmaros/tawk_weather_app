export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 300,
  immediate: boolean = false,
): {
  (...args: Parameters<T>): void
  cancel: () => void
} {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)

    if (immediate && !timeout) {
      fn(...args)
    }

    timeout = setTimeout(() => {
      if (!immediate) fn(...args)
      timeout = null
    }, delay)
  }

  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
