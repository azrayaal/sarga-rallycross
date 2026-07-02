import { useEffect, useRef, useState } from 'react'

/** Animates a number from 0 → target once the element scrolls into view. */
export function useCountUp(target: number, duration = 1600) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration)
              // easeOutExpo
              const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
              setValue(Math.round(eased * target))
              if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])

  return { ref, value }
}
