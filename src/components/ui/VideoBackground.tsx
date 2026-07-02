import { useRef, useState } from 'react'
import { cn } from '@/utils/cn'
import { SmartImage } from './SmartImage'

interface VideoBackgroundProps {
  /** Candidate video sources (local /assets/videos preferred). */
  sources: string[]
  /** Poster/fallback image seed rendered under and instead of the video. */
  posterSeed: string
  className?: string
  /** Ken-burns drift on the poster when no video is available. */
  drift?: boolean
}

/**
 * Full-bleed background video with graceful degradation:
 *  - Tries to play the first working source (muted, looped, inline).
 *  - Always renders the poster underneath, so if no video file exists
 *    (the default in this POC) we show a cinematic, subtly drifting image.
 */
export function VideoBackground({ sources, posterSeed, className, drift = true }: VideoBackgroundProps) {
  const [canPlay, setCanPlay] = useState(false)
  const ref = useRef<HTMLVideoElement | null>(null)

  return (
    <div className={cn('absolute inset-0 overflow-hidden bg-ink', className)}>
      {/* Poster — always present, drives the look when video is absent */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-1000',
          canPlay ? 'opacity-0' : 'opacity-100',
          drift && !canPlay && 'motion-safe:animate-[kenburns_24s_ease-in-out_infinite_alternate]',
        )}
      >
        <SmartImage seed={posterSeed} alt="" duotone className="h-full w-full" loading="eager" />
      </div>

      <video
        ref={ref}
        className={cn(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000',
          canPlay ? 'opacity-100' : 'opacity-0',
        )}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setCanPlay(true)}
      >
        {sources.map((src) => (
          <source key={src} src={src} type="video/mp4" />
        ))}
      </video>

      <style>{`
        @keyframes kenburns {
          from { transform: scale(1.05) translate3d(0,0,0); }
          to { transform: scale(1.18) translate3d(-2%, -1.5%, 0); }
        }
      `}</style>
    </div>
  )
}
