---
name: image-optimization
description: Netlify CDN image strategy — explicit URLs, unoptimized Next.js Image, progressive thumbnail loading, no srcset
metadata:
  type: project
---

## Strategy

All images go through `/.netlify/images` via helpers in `lib/netlify-image-loader.ts`:

- `netlifyImageSrc(url, width, quality)` — explicit display URL, no srcset generated
- `netlifyThumbnailSrc(url)` — w=20, q=5, always <1kb, used as CSS-blurred loading placeholder

## BlurImage component (`components/ui/blur-image.tsx`)

- Wraps Next.js `<Image unoptimized>` — keeps LCP/lazy-load benefits, kills srcset entirely
- Accepts optional `thumbnailSrc` prop — shown as CSS `background-image` with `blur(12px) scale(1.12)` while main image loads
- On `onLoad`, thumbnail fades out, main image fades in
- Transition effects go on **wrapper divs**, never on the `<Image>` tag itself

## Per-component sizes

| Component | Width | Quality | Notes |
|---|---|---|---|
| Thumbnail placeholder | 20 | 5 | All images, CSS blur while loading |
| PhotoCard | 280 | 30 | Medium quality, small display, some blur fine |
| CollageCluster | 280 | 30 | Same as PhotoCard |
| PhotoLightbox full image | 600 | 60 | Sharp enough, ~86kb max, only loads on user click |
| PhotoGallery prefetch | 600 | 60 | Must match lightbox URL |
| TrackCard album art | 64 | 45 | Displayed at 64px |
| AlbumScene album art | 108 | 45 | Displayed at 108px |
| ArtistExplorer SVG nodes | NODE_R*2 (40) | 65 | SVG `<image>` elements |
| HeroSection profile | 600 | 75 | |

## Why `unoptimized`

Next.js custom loader (`netlifyImageLoader`) was generating a full srcset (640w, 750w, 828w…) on top of our Netlify CDN URLs, causing browsers to fetch much larger images than intended. `unoptimized` passes the explicit `src` through as-is with no additional srcset.

## Lightbox (`PhotoLightbox`)

- No blur backdrop — black overlay (`bg-black/92`) serves as the loading state
- Single `motion.div` container with `rounded-2xl overflow-hidden`, `style={{ width: '85vw', height: '78vh' }}`
- Fades + scales in on `onLoad` via the container, not the `<Image>` tag
- 86kb max is acceptable — only fetches on user interaction, invisible to Lighthouse/CWV

## 86kb lightbox image is fine

Images behind user interaction don't affect Core Web Vitals (LCP, CLS). What matters for perf scores is initial page load — photocards and hero. Anything < 100kb for a content image is considered good.
