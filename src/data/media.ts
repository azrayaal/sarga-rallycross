import type { MediaItem } from '@/types'

/** SARGA social feed — media is curated from this Instagram account. */
export const INSTAGRAM_HANDLE = 'indonesiashorseracing'
export const INSTAGRAM_URL = 'https://www.instagram.com/indonesiashorseracing/'

export interface IgPost {
  code: string
  type: 'p' | 'reel'
  image: string
  caption: string
  permalink: string
}

/** Real posts/reels from @indonesiashorseracing (covers mirrored locally). */
export const INSTAGRAM_POSTS: IgPost[] = [
  {
    code: 'DaFj5bGJtPB',
    type: 'reel',
    image: '/assets/instagram/DaFj5bGJtPB.jpg',
    caption: 'Kemenangan ini bikin owner Naga Sembilan langsung tantang King Argentin.',
    permalink: 'https://www.instagram.com/reel/DaFj5bGJtPB/',
  },
  {
    code: 'DZfQjjSJOm9',
    type: 'reel',
    image: '/assets/instagram/DZfQjjSJOm9.jpg',
    caption: 'Ngobrol santai di Podcast Pacuan Kuda — obrolan seru seputar dunia pacuan kuda.',
    permalink: 'https://www.instagram.com/reel/DZfQjjSJOm9/',
  },
  {
    code: 'DaIIrnNknQv',
    type: 'p',
    image: '/assets/instagram/DaIIrnNknQv.jpg',
    caption: 'Meski pimpin klasemen, BHM Stable bukan yang paling sering menang?!',
    permalink: 'https://www.instagram.com/p/DaIIrnNknQv/',
  },
  {
    code: 'DaP3CJKJGSR',
    type: 'reel',
    image: '/assets/instagram/DaP3CJKJGSR.jpg',
    caption: 'Dominator jago di lintasan — tapi gimana di balik layarnya?',
    permalink: 'https://www.instagram.com/reel/DaP3CJKJGSR/',
  },
  {
    code: 'DaSbyQIEmAt',
    type: 'p',
    image: '/assets/instagram/DaSbyQIEmAt.jpg',
    caption: 'Kuda bisa tidur sambil berdiri?! Bukan sulap — ini penjelasannya.',
    permalink: 'https://www.instagram.com/p/DaSbyQIEmAt/',
  },
  {
    code: 'DX8fVnqkrpB',
    type: 'p',
    image: '/assets/instagram/DX8fVnqkrpB.jpg',
    caption: 'Mark your calendar — the 2026 season is ongoing.',
    permalink: 'https://www.instagram.com/p/DX8fVnqkrpB/',
  },
]

export const MEDIA: MediaItem[] = [
  {
    id: 'm1',
    title: 'Volcano Pass — The Full Onboard',
    category: 'Highlights',
    duration: '4:12',
    thumbnail: 'media-onboard',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    featured: true,
  },
  {
    id: 'm2',
    title: 'Ninety Seconds: A Rally1 Rebuild',
    category: 'Behind The Scenes',
    duration: '6:48',
    thumbnail: 'media-rebuild',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'm3',
    title: 'Reza Adnan on the Title Fight',
    category: 'Interviews',
    duration: '9:05',
    thumbnail: 'media-reza-int',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'm4',
    title: 'Night Stage Sparks',
    category: 'Shorts',
    duration: '0:38',
    thumbnail: 'media-sparks',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'm5',
    title: 'Canyon Jump — Every Angle',
    category: 'Highlights',
    duration: '3:24',
    thumbnail: 'media-jump',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'm6',
    title: 'Inside Nordkraft: Data Night',
    category: 'Behind The Scenes',
    duration: '7:19',
    thumbnail: 'media-data',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'm7',
    title: 'Service Park at Dawn',
    category: 'Gallery',
    duration: '24 shots',
    thumbnail: 'media-dawn',
  },
  {
    id: 'm8',
    title: 'Lena Hovda: Reading the Notes',
    category: 'Interviews',
    duration: '8:11',
    thumbnail: 'media-lena-int',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'm9',
    title: 'Gravel Ballet — Slow Motion',
    category: 'Shorts',
    duration: '0:52',
    thumbnail: 'media-slowmo',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
]

export const MEDIA_CATEGORIES = [
  'All',
  'Highlights',
  'Behind The Scenes',
  'Interviews',
  'Shorts',
  'Gallery',
] as const
