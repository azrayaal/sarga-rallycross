import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { Reveal } from './Reveal'

interface SectionHeaderProps {
  index?: string
  kicker: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  index,
  kicker,
  title,
  intro,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <Reveal>
        <div className="flex items-center gap-4">
          {index && (
            <span className="font-display text-sm font-bold text-molten">/{index}</span>
          )}
          <span className="h-px w-8 bg-molten" />
          <span className="kicker text-ash">{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="text-display text-4xl leading-[0.92] sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed text-ash md:text-lg',
              align === 'center' && 'mx-auto',
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  )
}
