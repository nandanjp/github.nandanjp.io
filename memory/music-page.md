---
name: music-page
description: Music page structure and component decisions — ArtistLeaderboard replaced ArtistExplorer
metadata:
  type: project
---

## Current structure

`MusicContent` renders three sections in order:
1. `AlbumScene` — horizontal scroll of unique album covers
2. `ArtistLeaderboard` — top 5 artists by track count in a MacCard
3. `TrackGrid` — paginated track list (8 per page)

## ArtistLeaderboard

Replaced the old `ArtistExplorer` SVG graph. Derives top 5 artists client-side from the tracks array already in memory — no extra fetch. Each row: rank · 36px album art (`w=36, q=45`) · artist name · track count. Wrapped in `MacCard title="top-artists.txt"` for UI consistency.

**Why:** The SVG graph was too complex to build and maintain. The leaderboard shows the same insight (most-listened artists) in a fraction of the code.

## Removed files

- `app/music/components/ArtistExplorer.tsx` — replaced by ArtistLeaderboard
- `hooks/use-music.ts`, `hooks/use-photos.ts`, `hooks/use-github.ts` — superseded by async server component pattern
- `components/ui/aspect-ratio.tsx`, `components/ui/progress.tsx` — unused Radix wrappers
- `hooks/` folder — deleted entirely after emptying
