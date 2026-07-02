# /assets

Drop real SARGA Rally media here to override the remote placeholders used in
this POC. The convention is referenced throughout `src/` (see
`src/utils/assets.ts`).

```
assets/
  logo/        Brand marks & lockups (SVG preferred)
  videos/      Background & hero loops   →  hero.mp4 is auto-used by the Hero
  images/      General photography
  races/       Race-weekend / stage imagery
  drivers/     Driver portraits
  sponsors/    Partner logos
  media/       Highlights, BTS, gallery thumbnails
```

## How resolution works

`img(seed)` in `src/utils/assets.ts` maps a descriptive seed (e.g.
`"driver-reza"`, `"weekend-race"`) to an image.

- Pass an **absolute path** (`"/assets/drivers/reza.jpg"`) or a full URL and it
  is used verbatim.
- Otherwise a deterministic, subject-matched placeholder photo is returned.
- If any image fails to load, `<SmartImage/>` renders a branded gradient
  fallback so the layout never breaks.

## Hero video

`src/utils/assets.ts` → `HERO_VIDEO_SOURCES` points at `/assets/videos/hero.mp4`.
Drop a file there and the Hero background plays it automatically (muted, looped,
inline). Until then, a cinematic Ken-Burns poster stands in.
