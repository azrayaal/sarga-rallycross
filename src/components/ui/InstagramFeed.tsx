import { motion } from 'framer-motion'
import { Instagram, Play, Heart, ArrowUpRight } from 'lucide-react'
import { INSTAGRAM_HANDLE, INSTAGRAM_POSTS, INSTAGRAM_URL } from '@/data/media'
import { SmartImage } from '@/components/ui/SmartImage'

/**
 * Live-sourced Instagram feed. Post covers + captions are pulled from
 * @indonesiashorseracing and mirrored locally; every card links straight to the
 * real post/reel. Styled on-brand (dark) rather than using the default white
 * Instagram embed.
 */
export function InstagramFeed() {
  return (
    <div className="mt-20">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-molten to-molten-hot">
            <Instagram className="h-5 w-5 text-white" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="kicker text-molten">Live from Instagram</span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-lg font-extrabold text-bone hover:text-molten"
            >
              @{INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {INSTAGRAM_POSTS.map((post, i) => (
          <motion.a
            key={post.code}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: (i % 5) * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col overflow-hidden border border-bone/10 bg-carbon transition-colors hover:border-molten/50"
          >
            <div className="relative aspect-square overflow-hidden">
              <SmartImage
                seed={post.image}
                alt={post.caption}
                className="h-full w-full transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10" />

              {/* type glyph */}
              <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink/50 backdrop-blur-sm">
                {post.type === 'reel' ? (
                  <Play className="h-3.5 w-3.5 translate-x-px fill-white text-white" />
                ) : (
                  <Instagram className="h-3.5 w-3.5 text-white" />
                )}
              </span>

              {/* hover action */}
              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-1.5 bg-molten px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white">
                  <Heart className="h-3 w-3 fill-white" /> View
                </span>
              </span>
            </div>

            <p className="line-clamp-2 p-3 text-xs leading-snug text-ash transition-colors group-hover:text-bone">
              {post.caption}
            </p>
          </motion.a>
        ))}

        {/* Follow tile */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-center gap-3 border border-dashed border-bone/20 bg-carbon/50 p-4 text-center transition-colors hover:border-molten"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-molten to-molten-hot">
            <Instagram className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-sm font-bold uppercase text-bone group-hover:text-molten">
            Follow
          </span>
          <span className="flex items-center gap-1 text-[0.62rem] uppercase tracking-wider text-smoke">
            More posts <ArrowUpRight className="h-3 w-3" />
          </span>
        </a>
      </div>
    </div>
  )
}
