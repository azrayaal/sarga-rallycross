import { AnimatePresence, motion } from 'framer-motion'
import { useCountdown } from '@/hooks/useCountdown'
import { pad } from '@/utils/format'
import { cn } from '@/utils/cn'

interface CountdownProps {
  target: string
  className?: string
  showSeconds?: boolean
}

function Unit({ value, label }: { value: number; label: string }) {
  const display = pad(value)
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-16 min-w-[3.6rem] items-center justify-center overflow-hidden border border-bone/10 bg-carbon/70 px-3 backdrop-blur-md sm:h-20 sm:min-w-[4.6rem]">
        <div className="absolute left-0 top-0 h-full w-px bg-molten/60" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl font-extrabold tabular-nums text-bone sm:text-4xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 kicker text-smoke">{label}</span>
    </div>
  )
}

export function Countdown({ target, className, showSeconds = true }: CountdownProps) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(target)

  if (isComplete) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <span className="h-2 w-2 animate-pulse bg-molten" />
        <span className="font-display text-xl font-bold uppercase tracking-wide text-molten">
          Lights Out — We Are Racing
        </span>
      </div>
    )
  }

  return (
    <div className={cn('flex items-end gap-2 sm:gap-3', className)}>
      <Unit value={days} label="Days" />
      <span className="pb-8 font-display text-2xl text-steel">:</span>
      <Unit value={hours} label="Hours" />
      <span className="pb-8 font-display text-2xl text-steel">:</span>
      <Unit value={minutes} label="Minutes" />
      {showSeconds && (
        <>
          <span className="pb-8 font-display text-2xl text-steel">:</span>
          <Unit value={seconds} label="Seconds" />
        </>
      )}
    </div>
  )
}
