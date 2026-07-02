import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface MarqueeProps {
  items: ReactNode[]
  className?: string
  itemClassName?: string
  slow?: boolean
  separator?: ReactNode
}

/** Infinite horizontal marquee. Duplicates content for a seamless loop. */
export function Marquee({ items, className, itemClassName, slow, separator }: MarqueeProps) {
  const row = (aria: boolean) => (
    <div
      className={cn('flex shrink-0 items-center', slow ? 'animate-marquee-slow' : 'animate-marquee')}
      aria-hidden={aria}
    >
      {items.map((item, i) => (
        <span key={i} className={cn('flex items-center', itemClassName)}>
          {item}
          {separator ?? <span className="mx-8 text-molten">/</span>}
        </span>
      ))}
    </div>
  )
  return (
    <div className={cn('flex w-full overflow-hidden', className)}>
      {row(false)}
      {row(true)}
    </div>
  )
}
