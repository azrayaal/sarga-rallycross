import { useCountUp } from '@/hooks/useCountUp'
import { cn } from '@/utils/cn'

interface StatCounterProps {
  value: number
  prefix?: string
  suffix?: string
  label: string
  hint?: string
  className?: string
  decimals?: number
}

export function StatCounter({ value, prefix, suffix, label, hint, className, decimals = 0 }: StatCounterProps) {
  const { ref, value: current } = useCountUp(Math.round(value * Math.pow(10, decimals)))
  const display = (current / Math.pow(10, decimals)).toFixed(decimals)

  return (
    <div className={cn('flex flex-col', className)}>
      <span ref={ref} className="text-display text-5xl font-extrabold tabular-nums text-bone sm:text-6xl">
        {prefix}
        {display}
        <span className="text-gradient-molten">{suffix}</span>
      </span>
      <span className="mt-3 font-display text-sm font-bold uppercase tracking-wide text-bone">
        {label}
      </span>
      {hint && <span className="mt-1 text-sm text-smoke">{hint}</span>}
    </div>
  )
}
