import { useEffect, useState } from 'react'

/** Tracks vertical scroll offset + a 0–1 page progress value. */
export function useScrollProgress() {
  const [scrolled, setScrolled] = useState(false)
  const [y, setY] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const top = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        setY(top)
        setScrolled(top > 40)
        setProgress(max > 0 ? Math.min(1, top / max) : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return { scrolled, y, progress }
}
