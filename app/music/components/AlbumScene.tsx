'use client'

import { BlurImage } from '@/components/ui/blur-image'
import { netlifyImageSrc, netlifyThumbnailSrc } from '@/lib/netlify-image-loader'
import { ExternalLink } from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { SubLabel, CardHeading, MonoText } from '@/components/ui/typography'
import type { Track } from '@/lib/api'

interface AlbumSceneProps {
    tracks: Track[]
}

function AlbumCard({ track }: { track: Track }) {
    return (
        <div
            className="group flex w-27 shrink-0 cursor-pointer flex-col gap-2 transition-transform duration-200 ease-out hover:-translate-y-[3px]"
            onClick={() =>
                window.open(track.external_url, '_blank', 'noopener,noreferrer')
            }
        >
            <div className="relative size-27 overflow-hidden rounded-md">
                <BlurImage
                    src={netlifyImageSrc(track.album_art_url, 216, 75)}
                    thumbnailSrc={netlifyThumbnailSrc(track.album_art_url)}
                    alt={track.album_name}
                    fill
                    draggable={false}
                    className="object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-end bg-black/30 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex size-8 items-center justify-center rounded-full bg-black/50 shadow-lg backdrop-blur-sm">
                        <ExternalLink className="size-3.5 text-white" />
                    </div>
                </div>
            </div>

            <div className="min-w-0">
                <CardHeading className="truncate text-sm sm:text-sm">
                    {track.album_name}
                </CardHeading>
                <MonoText className="truncate text-muted-foreground/55">
                    {track.artists[0]}
                </MonoText>
            </div>
        </div>
    )
}

export function AlbumScene({ tracks }: AlbumSceneProps) {
    const seen = new Set<string>()
    const albums: Track[] = []
    for (const t of tracks) {
        if (!seen.has(t.album_art_url)) {
            seen.add(t.album_art_url)
            albums.push(t)
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <SubLabel>{albums.length} albums</SubLabel>
            <ScrollArea className="w-full overflow-hidden">
                <div className="flex gap-4 py-3 pb-4">
                    {albums.map(track => (
                        <AlbumCard key={track.album_art_url} track={track} />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}
