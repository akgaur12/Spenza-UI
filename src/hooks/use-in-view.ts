import { useEffect, useState } from 'react'

/**
 * Returns a callback ref to attach to a sentinel element, and whether it's currently intersecting
 * the viewport — used to trigger infinite-scroll loads.
 *
 * Uses a callback ref (state), not `useRef`, because the sentinel element often only mounts on a
 * later render (e.g. once a loading state resolves) — a plain ref's `.current` change wouldn't
 * re-run the observer-setup effect, so the observer would never actually attach to the real node.
 */
export function useInView<T extends Element>(rootMargin = '200px') {
  const [node, setNode] = useState<T | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { rootMargin })
    observer.observe(node)
    return () => observer.disconnect()
  }, [node, rootMargin])

  return { ref: setNode, isInView }
}
