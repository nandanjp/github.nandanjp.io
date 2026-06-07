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
| PhotoCard | 280 | 40 | |
| CollageCluster | 280 | 40 | |
| PhotoLightbox blur backdrop | 280 | 40 | Same URL as card = cache hit |
| PhotoLightbox full image | 280 | 40 | Same URL as card = zero extra fetch |
| PhotoGallery prefetch | 280 | 40 | Must match lightbox URL |
| TrackCard album art | 64 | 20 | Displayed at 64px |
| AlbumScene album art | 108 | 20 | Displayed at 108px |
| ArtistExplorer SVG nodes | NODE_R*2 (40) | 65 | SVG `<image>` elements |
| HeroSection profile | 600 | 75 | |

## Why `unoptimized`

Next.js custom loader (`netlifyImageLoader`) was generating a full srcset (640w, 750w, 828w…) on top of our Netlify CDN URLs, causing browsers to fetch much larger images than intended. `unoptimized` passes the explicit `src` through as-is with no additional srcset.

## Lightbox

`PhotoLightbox` uses Next.js `<Image fill unoptimized>` inside a container with `style={{ width: '85vw', height: '78vh' }}`. The blur backdrop and full image use the **same URL** as the card, so opening the lightbox makes zero new network requests. Motion animations (scale, opacity) live on `motion.div` wrappers.
