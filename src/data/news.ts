import type { NewsItem } from '@/types'

/**
 * Editorial feed sourced from the SARGA news portal (https://news.sarga.co/).
 * Cover images are the real article covers, mirrored into /public/assets/news/
 * (the CMS blocks external hotlinking). Every card and the "See all" action
 * deep-links to the live article on the portal.
 */
export const NEWS_PORTAL_URL = 'https://news.sarga.co/'
const ART = 'https://news.sarga.co'

export const NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'RX5: Mobil Kecil, Duel Besar di FIA Rallycross World Cup Indonesia 2026',
    category: 'Motorsport',
    date: '26 Jun 2026',
    excerpt:
      'Kelas RX5 jadi panggung duel paling seru — mobil mungil, adu nyali besar di lintasan Rallycross World Cup Indonesia.',
    image: '/assets/news/rx5-rallycross.webp',
    href: `${ART}/id/motorsport/rx5-mobil-kecil-duel-besar-di-fia-rallycross-world-cup-indonesia-2026-mvk.html`,
    featured: true,
  },
  {
    id: 'n2',
    title: 'Kaos di Sepanjang Sirkuit, Duel di Pintu Keluar Joker Lap RX5 pada Euro RX Hungaria',
    category: 'Motorsport',
    date: '30 Jun 2026',
    excerpt:
      'Joker lap jadi titik penentu — duel sengit di pintu keluar mewarnai seri Euro RX Hungaria kelas RX5.',
    image: '/assets/news/euro-rx.webp',
    href: `${ART}/id/motorsport/kaos-di-sepanjang-sirkuit-duel-di-pintu-keluar-joker-lap-rx5-pada-euro-rx-hungaria-mvk.html`,
  },
  {
    id: 'n3',
    title: 'Mikki Fight Jadi Juara Bertahan Teio Sho 2026, Jagoan Baru Kuda Dirt Jepang',
    category: 'G1 Jepang',
    date: '02 Jul 2026',
    excerpt:
      'Mikki Fight mempertahankan gelarnya dan menegaskan diri sebagai jagoan baru lintasan dirt Jepang musim ini.',
    image: '/assets/news/mikki-fight.webp',
    href: `${ART}/id/news/mikki-fight-jadi-juara-bertahan-teio-sho-2026-jagoan-baru-kuda-dirt-jepang-mvk.html`,
  },
  {
    id: 'n4',
    title: 'Naga Sembilan, Arceus Nagari, Paco Eclipse yang Belum Terkalahkan di IHR 2026',
    category: 'IHR 2026',
    date: '01 Jul 2026',
    excerpt:
      'Tiga nama panas mendominasi kelasnya masing-masing dan belum tersentuh kekalahan sepanjang IHR 2026.',
    image: '/assets/news/naga-sembilan.webp',
    href: `${ART}/id/news/naga-sembilan-arceus-nagari-paco-eclipse-yang-belum-terkalahkan-di-ihr-2026-mvk.html`,
  },
  {
    id: 'n5',
    title: 'Duel Hingga Garis Finis, Berkahsari Juarai Kelas Lokal DIY 1.000 Meter',
    category: 'Galeri Foto',
    date: '01 Jul 2026',
    excerpt:
      'Adu cepat ketat sampai garis akhir, Berkahsari unggul tipis atas Masih Rindu 99 di kelas lokal DIY.',
    image: '/assets/news/berkahsari.webp',
    href: `${ART}/id/news/duel-hingga-garis-finis-berkahsari-juarai-kelas-lokal-diy-1000-meter-mvk.html`,
  },
  {
    id: 'n6',
    title: 'PORDASI Bekali Dokter Hewan Muda, Perkuat SDM Veteriner Olahraga Berkuda Indonesia',
    category: 'Pordasi',
    date: '01 Jul 2026',
    excerpt:
      'Program pembekalan PORDASI menyiapkan generasi dokter hewan muda untuk mendukung olahraga tanah air.',
    image: '/assets/news/pordasi.webp',
    href: `${ART}/id/news/pordasi-bekali-dokter-hewan-muda-perkuat-sdm-veteriner-olahraga-berkuda-indonesia-mvk.html`,
  },
]
