/**
 * Asset resolution.
 *
 * The project ships an `/assets` convention (see /public/assets). In this POC
 * we don't bundle heavy media, so `img()` resolves each descriptive seed to a
 * hand-picked, subject-matched photo. Car imagery is exclusively DIRT / RALLY
 * cars (Pexels) — no road/sports cars. Driver portraits use people photos
 * (Unsplash). The mapping is deterministic, so a given slot always renders the
 * same image, and <SmartImage/> shows a branded gradient fallback on failure.
 *
 * ID convention:
 *   - contains "-"  → Unsplash CDN  (photo-<id>)         e.g. "1500648767791-00dcc994a43e"
 *   - digits only   → Pexels CDN    (pexels-photo-<id>)  e.g. "9609223"
 *
 * To use real local media, drop files into /public/assets/... and pass an
 * absolute path (e.g. "/assets/races/stage.jpg") — `img()` passes through any
 * path starting with "/" or "http" unchanged.
 */

// Curated, availability-checked photo IDs by subject.
const POOLS: Record<string, string[]> = {
  // Dirt / rally cars in action — gravel, dust, forest, snow. (Pexels)
  racing: [
    '9609135', // rally car, huge dust cloud, mountain
    '9609223', // Ford Fiesta WRC kicking dust
    '9197927', // rally car in thick orange dust
    '32858399', // WRC car, big gravel dust
    '9609144', // Hyundai i20 WRC on dirt
    '32858400', // Toyota Yaris WRC, dust
    '26978202', // Toyota Yaris WRC, forest dust
    '33611533', // Subaru on gravel road
    '33611532', // Subaru, gravel turn
    '38051980', // red rally car, forest road
    '24861723', // rally car, dust
    '36781543', // Skoda Fabia, dust
    '30925259', // rally car, orange desert dust
    '27860938', // rally car, dust
    '11097915', // Mitsubishi Evo, snow rally
    '9609130', // rally car, dust corner
    '17186559', // rally car airborne (jump)
    '38051991', // rally car, green stage
  ],
  // Service park / pit / driver-by-car. (Pexels)
  garage: ['37261859', '15167796', '26978202'],
  // Driver portraits — people. (Unsplash)
  portrait: [
    '1500648767791-00dcc994a43e',
    '1507003211169-0a1dd7228f2d',
    '1519085360753-af0119f7cbe7',
    '1506794778202-cad84cf45f1d',
    '1494790108377-be9c29b29330',
    '1438761681033-6461ffad8d80',
    '1544005313-94ddf0286df2',
    '1531123897727-8f129e1688ce',
    '1502823403499-6ccfcf4fb453',
    '1524504388940-b1c1722653e1',
  ],
}

// Exact seed → photo overrides.
const EXACT: Record<string, string> = {
  // Drivers — distinct, gender-appropriate portraits (Unsplash).
  'driver-reza': '1500648767791-00dcc994a43e',
  'driver-mateo': '1506794778202-cad84cf45f1d',
  'driver-kenji': '1519085360753-af0119f7cbe7',
  'driver-noah': '1502823403499-6ccfcf4fb453',
  'driver-lena': '1438761681033-6461ffad8d80',
  'driver-amara': '1544005313-94ddf0286df2',
  'driver-sofia': '1494790108377-be9c29b29330',
  'driver-ayla': '1524504388940-b1c1722653e1',
  // Signature rally shots for prominent slots (Pexels).
  'hero-rally': '9609135',
  'media-onboard': '9609223',
  'media-jump': '17186559',
  'weekend-final': '11097915',
}

function poolFor(seed: string): string[] {
  const s = seed.toLowerCase()
  if (s.startsWith('driver')) return POOLS.portrait
  if (s.includes('pit') || s.includes('garage') || s.includes('rebuild') || s.includes('data') || s.includes('service'))
    return POOLS.garage
  // Everything else → dirt / rally cars.
  return POOLS.racing
}

/** Deterministic small hash for stable seed → photo mapping. */
function hash(seed: string): number {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h
}

/** Build a CDN URL for a curated photo id (Unsplash or Pexels). */
function cdn(id: string, w: number, h: number): string {
  if (id.includes('-')) {
    return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=72`
  }
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`
}

export function img(seed: string, w = 1400, h = 900): string {
  if (seed.startsWith('/') || seed.startsWith('http')) return seed
  const pool = poolFor(seed)
  const id = EXACT[seed] ?? pool[hash(seed) % pool.length]
  return cdn(id, w, h)
}

/** Local video convention. Drop a file at /public/assets/videos/<name>. */
export function video(name: string): string {
  return `/assets/videos/${name}`
}

/** Hero background video candidates (first that loads wins). Local file preferred. */
export const HERO_VIDEO_SOURCES: string[] = ['/assets/videos/hero.mp4']
