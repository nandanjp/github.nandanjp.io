'use client'

import { BlurImage } from '@/components/ui/blur-image'
import { MacCard } from '@/components/ui/mac-card'
import { netlifyImageSrc, netlifyThumbnailSrc } from '@/lib/netlify-image-loader'
import { SubLabel, MonoText } from '@/components/ui/typography'
import type { Track } from '@/lib/api'

interface ArtistLeaderboardProps {
    tracks: Track[]
}

export function ArtistLeaderboard({ tracks }: ArtistLeaderboardProps) {
    const artistMap = new Map<string, { count: number; albumArtUrl: string }>()
    for (const track of tracks) {
        const artist = track.artists[0]
        if (!artistMap.has(artist)) {
            artistMap.set(artist, { count: 0, albumArtUrl: track.album_art_url })
        }
        artistMap.get(artist)!.count++
    }

    const ranked = [...artistMap.entries()]
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 5)

    return (
        <MacCard title="top-artists.txt" className="bg-card/40 rounded-xl border shadow-sm">
            <div className="flex flex-col divide-y px-4">
                {ranked.map(([artist, { count, albumArtUrl }], index) => (
                    <div key={artist} className="flex items-center gap-3 py-2.5">
                        <MonoText className="w-4 shrink-0 text-muted-foreground/40">
                            {index + 1}
                        </MonoText>
                        <div className="relative size-9 shrink-0 overflow-hidden rounded-md">
                            <BlurImage
                                src={netlifyImageSrc(albumArtUrl, 36, 45)}
                                thumbnailSrc={netlifyThumbnailSrc(albumArtUrl)}
                                alt={artist}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="flex-1 truncate text-sm font-medium">{artist}</span>
                        <MonoText className="shrink-0 text-muted-foreground/50">
                            {count} {count === 1 ? 'track' : 'tracks'}
                        </MonoText>
                    </div>
                ))}
            </div>
        </MacCard>
    )
}
