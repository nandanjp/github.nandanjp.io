import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Track } from '@/lib/api'
import { BlurImage } from '@/components/ui/blur-image'

interface AlbumSceneProps {
    tracks: Track[]
}

function AlbumCard({ track }: { track: Track }) {
    return (
        <motion.div
            key={track.album_art_url}
            className="group flex w-27 shrink-0 cursor-pointer flex-col gap-2"
            whileHover={{
                y: -3,
                transition: { type: 'spring', stiffness: 300, damping: 22 }
            }}
            onClick={() =>
                window.open(track.external_url, '_blank', 'noopener,noreferrer')
            }
        >
            {/* Album art */}
            <div className="relative size-27 overflow-hidden rounded-lg shadow-md">
                <BlurImage
                    src={track.album_art_url}
                    width={160}
                    height={160}
                    alt={track.album_name}
                    sizes="108px"
                    draggable={false}
                    className="object-cover"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end justify-end bg-black/30 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex size-8 items-center justify-center rounded-full bg-black/50 shadow-lg backdrop-blur-sm">
                        <ExternalLink className="size-3.5 text-white" />
                    </div>
                </div>
            </div>

            {/* Labels */}
            <div className="min-w-0">
                <p className="font-hand truncate text-sm leading-tight font-bold">
                    {track.album_name}
                </p>
                <p className="text-muted-foreground/55 truncate font-mono text-xs">
                    {track.artists[0]}
                </p>
            </div>
        </motion.div>
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
            <p className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
                {albums.length} albums
            </p>

            {/* Horizontal scroll shelf */}
            <div
                className="flex gap-4 overflow-x-auto py-3"
                style={{ scrollbarWidth: 'none' }}
            >
                {albums.map(track => (
                    <AlbumCard key={track.album_art_url} track={track} />
                ))}
            </div>
        </div>
    )
}
