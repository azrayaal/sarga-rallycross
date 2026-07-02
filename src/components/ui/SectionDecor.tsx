import { cn } from '@/utils/cn'

type Motif = 'grid' | 'grid-sm' | 'dots' | 'diagonal' | 'vlines' | 'none'
type Ornament = 'chevrons' | 'rings' | 'checker' | 'contour' | 'none'
type Glow = 'tl' | 'br' | 'both' | 'none'

interface SectionDecorProps {
  motif?: Motif
  /** Accent hex for glows + ornaments. */
  accent?: string
  ornament?: Ornament
  glow?: Glow
  watermark?: string
  className?: string
}

/**
 * Layered, non-interactive background ornamentation for a section:
 * a faint technical motif (grid/dots/diagonal), one or two accent glows,
 * and an optional SVG ornament + oversized watermark. Purely decorative.
 */
export function SectionDecor({
  motif = 'grid',
  accent = 'var(--color-crimson)',
  ornament = 'none',
  glow = 'both',
  watermark,
  className,
}: SectionDecorProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      {motif !== 'none' && (
        <div
          className={cn('absolute inset-0', `motif-${motif}`)}
          style={{
            WebkitMaskImage: 'radial-gradient(130% 100% at 50% 0%, #000 25%, transparent 82%)',
            maskImage: 'radial-gradient(130% 100% at 50% 0%, #000 25%, transparent 82%)',
          }}
        />
      )}

      {(glow === 'tl' || glow === 'both') && (
        <div
          className="absolute -left-40 -top-48 h-[38rem] w-[38rem] rounded-full opacity-[0.16]"
          style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 60%)` }}
        />
      )}
      {(glow === 'br' || glow === 'both') && (
        <div
          className="absolute -bottom-56 -right-40 h-[44rem] w-[44rem] rounded-full opacity-[0.13]"
          style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 62%)` }}
        />
      )}

      {ornament === 'chevrons' && <Chevrons accent={accent} />}
      {ornament === 'rings' && <Rings accent={accent} />}
      {ornament === 'checker' && <Checker />}
      {ornament === 'contour' && <Contour accent={accent} />}

      {watermark && (
        <span className="absolute -right-4 bottom-2 select-none font-display text-[11rem] font-black leading-none text-bone/[0.022] sm:text-[15rem]">
          {watermark}
        </span>
      )}
    </div>
  )
}

function Chevrons({ accent }: { accent: string }) {
  return (
    <svg
      className="absolute right-8 top-12 h-32 w-32 opacity-[0.18] sm:h-44 sm:w-44"
      viewBox="0 0 110 100"
      fill="none"
      stroke={accent}
      strokeWidth="3"
      strokeLinecap="square"
    >
      {[0, 16, 32, 48].map((x) => (
        <polyline key={x} points={`${x},18 ${x + 24},50 ${x},82`} />
      ))}
    </svg>
  )
}

function Rings({ accent }: { accent: string }) {
  return (
    <svg
      className="absolute -left-20 top-1/4 h-[26rem] w-[26rem] opacity-[0.12]"
      viewBox="0 0 200 200"
      fill="none"
      stroke={accent}
    >
      <circle cx="100" cy="100" r="94" strokeWidth="1" strokeDasharray="3 9" />
      <circle cx="100" cy="100" r="66" strokeWidth="1" strokeDasharray="2 7" />
      <circle cx="100" cy="100" r="40" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="3" fill={accent} stroke="none" />
    </svg>
  )
}

function Checker() {
  const cells = []
  const n = 6
  const s = 14
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      if ((r + c) % 2 === 0) cells.push(<rect key={`${r}-${c}`} x={c * s} y={r * s} width={s} height={s} />)
  return (
    <svg className="absolute bottom-8 left-8 h-20 w-20 fill-bone opacity-[0.05] sm:h-28 sm:w-28" viewBox="0 0 84 84">
      {cells}
    </svg>
  )
}

function Contour({ accent }: { accent: string }) {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 h-72 w-full opacity-[0.09]"
      viewBox="0 0 1200 220"
      fill="none"
      stroke={accent}
      strokeWidth="1"
      preserveAspectRatio="none"
    >
      {[0, 30, 60, 90, 120, 150].map((o, i) => (
        <path key={i} d={`M0 ${170 - o} C 320 ${90 - o}, 640 ${230 - o}, 1200 ${120 - o}`} />
      ))}
    </svg>
  )
}
