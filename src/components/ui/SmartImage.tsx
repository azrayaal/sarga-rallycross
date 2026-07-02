import { useState } from 'react'
import { cn } from '@/utils/cn'
import { img } from '@/utils/assets'

interface SmartImageProps {
  /** Asset seed or absolute path/url. */
  seed: string
  alt: string
  width?: number
  height?: number
  className?: string
  /** Apply the signature molten duotone treatment. */
  duotone?: boolean
  loading?: 'lazy' | 'eager'
}

/**
 * Image with a branded gradient fallback. If the network asset fails, we render
 * a deterministic SARGA-styled gradient so the layout never breaks.
 */
export function SmartImage({
  seed,
  alt,
  width = 1400,
  height = 900,
  className,
  duotone = false,
  loading = 'lazy',
}: SmartImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn('relative overflow-hidden bg-carbon', className)}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 120% at 15% 10%, #2a0c0a 0%, #14141a 45%, #08080a 100%)',
          }}
        />
        <div className="hazard absolute -right-10 top-0 h-full w-32 opacity-[0.06]" />
        <div className="grain absolute inset-0" />
        <div className="absolute bottom-4 left-4 kicker text-smoke">SARGA / MEDIA</div>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden bg-carbon', className)}>
      <img
        src={img(seed, width, height)}
        alt={alt}
        loading={loading}
        onError={() => setFailed(true)}
        className={cn(
          'h-full w-full object-cover',
          duotone && 'grayscale-[18%] contrast-[1.03] brightness-[1.06] saturate-[1.05]',
        )}
      />
      {duotone && (
        <>
          {/* Crimson wash — adds brand tint without crushing the photo */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(218,41,28,0.22), transparent 42%, rgba(161,25,18,0.18))',
              mixBlendMode: 'soft-light',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(160deg, rgba(242,51,37,0.10), transparent 55%)' }}
          />
        </>
      )}
    </div>
  )
}
