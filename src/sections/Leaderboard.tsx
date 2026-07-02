import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Trophy } from 'lucide-react'
import { DRIVER_STANDINGS, TEAM_STANDINGS } from '@/data/standings'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionDecor } from '@/components/ui/SectionDecor'
import { cn } from '@/utils/cn'
import type { StandingRow } from '@/types'

type Tab = 'drivers' | 'teams'

function Delta({ delta }: { delta: number }) {
  if (delta === 0)
    return (
      <span className="flex items-center gap-1 text-smoke">
        <Minus className="h-3.5 w-3.5" />
      </span>
    )
  const up = delta > 0
  return (
    <span className={cn('flex items-center gap-0.5 text-xs font-semibold', up ? 'text-acid' : 'text-ember')}>
      {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
      {Math.abs(delta)}
    </span>
  )
}

function Row({ row, index, max }: { row: StandingRow; index: number; max: number }) {
  const leader = row.position === 1
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-bone/10 py-4 pl-4 pr-4 transition-colors sm:grid-cols-[3rem_1fr_5rem_5rem_4rem] sm:gap-6',
        leader ? 'bg-molten/[0.06]' : 'hover:bg-bone/[0.02]',
      )}
    >
      {/* position accent */}
      <span className="absolute left-0 top-0 h-full w-0.5" style={{ background: row.color }} />

      <span className={cn('font-display text-2xl font-extrabold tabular-nums', leader ? 'text-molten' : 'text-bone')}>
        {row.position}
      </span>

      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-2">
          {row.flag && <span className="text-sm">{row.flag}</span>}
          <span className="truncate font-display text-base font-bold uppercase text-bone sm:text-lg">
            {row.name}
          </span>
          {leader && <Trophy className="h-4 w-4 shrink-0 text-gold" />}
        </div>
        {row.team && <span className="truncate text-xs text-smoke">{row.team}</span>}
        {/* Points bar */}
        <div className="mt-2 hidden h-1 w-full max-w-[16rem] overflow-hidden bg-slate sm:block">
          <motion.div
            className="h-full"
            style={{ background: row.color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${(row.points / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.05 + 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <div className="hidden flex-col items-end sm:flex">
        <span className="font-display text-lg font-bold tabular-nums text-bone">{row.wins}</span>
        <span className="text-[0.58rem] uppercase tracking-wider text-smoke">Wins</span>
      </div>

      <div className="hidden items-center justify-center sm:flex">
        <Delta delta={row.delta} />
      </div>

      <div className="flex flex-col items-end">
        <span className="font-display text-2xl font-extrabold tabular-nums text-bone">{row.points}</span>
        <span className="text-[0.58rem] uppercase tracking-wider text-smoke">Points</span>
      </div>
    </motion.div>
  )
}

export function Leaderboard() {
  const [tab, setTab] = useState<Tab>('drivers')
  const rows = tab === 'drivers' ? DRIVER_STANDINGS : TEAM_STANDINGS
  const max = Math.max(...rows.map((r) => r.points))

  return (
    <section id="leaderboard" className="relative overflow-hidden bg-oxblood py-24 sm:py-32">
      <SectionDecor motif="dots" accent="var(--color-crimson)" ornament="rings" glow="br" />
      <div className="relative z-10 mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            index="05"
            kicker="Championship Standings"
            title="The title race"
            intro="Six rounds down, one to go. The finale at Sentul Highlands decides everything."
          />

          {/* Tabs */}
          <div className="relative flex w-fit border border-bone/15">
            {(['drivers', 'teams'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'relative px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors',
                  tab === t ? 'text-white' : 'text-ash hover:text-bone',
                )}
              >
                {tab === t && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-molten"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative z-10">{t === 'drivers' ? 'Drivers' : 'Teams'}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 border border-bone/10 bg-carbon/40">
          {/* Header row */}
          <div className="hidden grid-cols-[3rem_1fr_5rem_5rem_4rem] gap-6 border-b border-bone/10 px-4 py-3 sm:grid">
            <span className="kicker text-smoke">Pos</span>
            <span className="kicker text-smoke">{tab === 'drivers' ? 'Driver' : 'Team'}</span>
            <span className="kicker text-right text-smoke">Wins</span>
            <span className="kicker text-center text-smoke">Trend</span>
            <span className="kicker text-right text-smoke">Pts</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {rows.map((row, i) => (
                <Row key={`${tab}-${row.position}`} row={row} index={i} max={max} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
