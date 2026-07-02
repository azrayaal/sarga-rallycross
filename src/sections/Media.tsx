import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactPlayer from 'react-player'
import { Play, X, Clock, Images, Instagram, ArrowUpRight } from 'lucide-react'
import { MEDIA, MEDIA_CATEGORIES, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/data/media'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionDecor } from '@/components/ui/SectionDecor'
import { InstagramFeed } from '@/components/ui/InstagramFeed'
import { SmartImage } from '@/components/ui/SmartImage'
import { cn } from '@/utils/cn'
import type { MediaItem } from '@/types'

function MediaCard({ item, onPlay, wide = false }: { item: MediaItem; onPlay: (m: MediaItem) => void; wide?: boolean }) {
  const isGallery = item.category === 'Gallery'
  return (
    <button
      onClick={() => onPlay(item)}
      className={cn(
        'group relative flex flex-col overflow-hidden border border-bone/10 bg-carbon text-left transition-colors hover:border-molten/50',
        wide ? 'h-full' : '',
      )}
    >
      <div className={cn('relative overflow-hidden', wide ? 'aspect-[16/10] lg:aspect-auto lg:h-full' : 'aspect-video')}>
        <SmartImage
          seed={item.thumbnail}
          alt={item.title}
          duotone
          className="h-full w-full transition-transform duration-[1.2s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/5" />

        {/* Play / gallery affordance */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-bone/30 bg-ink/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-molten group-hover:bg-molten">
            {isGallery ? (
              <Images className="h-5 w-5 text-bone" />
            ) : (
              <Play className="h-5 w-5 translate-x-0.5 fill-bone text-bone transition-colors group-hover:fill-white" />
            )}
          </span>
        </span>

        {/* Category + duration */}
        <span className="absolute left-3 top-3 kicker bg-ink/70 px-2 py-1 text-molten backdrop-blur-sm">
          {item.category}
        </span>
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-ink/70 px-2 py-1 text-[0.62rem] font-semibold text-bone backdrop-blur-sm">
          <Clock className="h-3 w-3" />
          {item.duration}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 p-4">
        <h3 className={cn('font-display font-bold uppercase leading-tight text-bone', wide ? 'text-xl sm:text-2xl' : 'text-base')}>
          {item.title}
        </h3>
      </div>
    </button>
  )
}

function PlayerModal({ item, onClose }: { item: MediaItem | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-lg sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <span className="kicker text-molten">{item.category}</span>
                <h3 className="mt-1 font-display text-xl font-extrabold text-bone sm:text-2xl">{item.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-molten hover:text-molten"
                aria-label="Close player"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full overflow-hidden border border-bone/15 bg-black">
              {item.videoUrl ? (
                <ReactPlayer
                  url={item.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing
                  config={{ youtube: { playerVars: { modestbranding: 1 } } }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <SmartImage seed={item.thumbnail} alt={item.title} duotone className="absolute inset-0 h-full w-full" />
                  <span className="relative kicker bg-ink/70 px-4 py-2 text-bone backdrop-blur">
                    Gallery — {item.duration}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Media() {
  const [filter, setFilter] = useState<string>('All')
  const [active, setActive] = useState<MediaItem | null>(null)

  const featured = MEDIA.find((m) => m.featured) ?? MEDIA[0]
  const filtered = useMemo(
    () => MEDIA.filter((m) => (filter === 'All' ? true : m.category === filter) && m.id !== featured.id),
    [filter, featured.id],
  )

  return (
    <section id="media" className="relative overflow-hidden bg-void py-24 sm:py-32">
      <SectionDecor motif="diagonal" accent="var(--color-crimson)" ornament="chevrons" glow="tl" />
      <div className="relative z-10 mx-auto max-w-[112rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            index="06"
            kicker="Social & Media Hub"
            title={
              <>
                Relive every
                <br />
                <span className="text-gradient-molten">flat-out moment.</span>
              </>
            }
            intro="Onboard laps, garage secrets and the shots that define the weekend — straight from our Instagram."
          />

          {/* Instagram follow */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 border border-bone/20 px-5 py-3 transition-colors hover:border-molten"
          >
            <Instagram className="h-5 w-5 text-molten" />
            <span className="flex flex-col leading-tight">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-smoke">Follow us</span>
              <span className="font-display text-sm font-bold text-bone group-hover:text-molten">
                @{INSTAGRAM_HANDLE}
              </span>
            </span>
          </a>
        </div>

        {/* Filters */}
        <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1">
          {MEDIA_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                'shrink-0 border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors',
                filter === c
                  ? 'border-molten bg-molten text-white'
                  : 'border-bone/15 text-ash hover:border-bone/40 hover:text-bone',
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured + grid */}
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          {(filter === 'All' || filter === featured.category) && (
            <div className="lg:row-span-1">
              <MediaCard item={featured} onPlay={setActive} wide />
            </div>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.slice(0, filter === 'All' || filter === featured.category ? 4 : 6).map((m) => (
              <MediaCard key={m.id} item={m} onPlay={setActive} />
            ))}
          </div>
        </div>

        {/* Remaining as a row */}
        {filtered.length > 4 && (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.slice(filter === 'All' || filter === featured.category ? 4 : 6).map((m) => (
              <MediaCard key={m.id} item={m} onPlay={setActive} />
            ))}
          </div>
        )}

        {/* Live embedded Instagram posts / reels */}
        {/* <InstagramFeed /> */}

        <div className="mt-12 flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-molten px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-molten-hot clip-angle"
          >
            <Instagram className="h-4 w-4" />
            View all on Instagram
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>
      </div>

      <PlayerModal item={active} onClose={() => setActive(null)} />
    </section>
  )
}
