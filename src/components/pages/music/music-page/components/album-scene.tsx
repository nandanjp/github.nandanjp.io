import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Track } from '@/lib/api'

interface AlbumSceneProps {
    tracks: Track[]
}

function AlbumCard({ track }: { track: Track }) {
    const [loaded, setLoaded] = useState(false)
    const thumb = import.meta.env.DEV
        ? track.album_art_url
        : `/.netlify/images?url=${encodeURIComponent(track.album_art_url)}&w=20&h=20&fit=cover&f=webp`
    const src = import.meta.env.DEV
        ? track.album_art_url
        : `/.netlify/images?url=${encodeURIComponent(track.album_art_url)}&w=216&h=216&fit=cover&f=webp`

    return (
        <motion.div
            key={track.album_art_url}
            className="group flex flex-col gap-2 shrink-0 w-[108px] cursor-pointer"
            whileHover={{ y: -3, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
            onClick={() => window.open(track.external_url, '_blank', 'noopener,noreferrer')}
        >
            {/* Album art */}
            <div className="relative rounded-lg overflow-hidden shadow-md size-[108px]">
                <img
                    src={thumb}
                    alt=""
                    aria-hidden
                    draggable={false}
                    className={cn(
                        'absolute inset-0 h-full w-full object-cover blur-sm scale-105 transition-opacity duration-500',
                        loaded ? 'opacity-0' : 'opacity-100',
                    )}
                />
                <img
                    src={src}
                    alt={track.album_name}
                    draggable={false}
                    onLoad={() => setLoaded(true)}
                    className={cn(
                        'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
                        loaded ? 'opacity-100' : 'opacity-0',
                    )}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end justify-end p-2 opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                    <div className="flex size-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm shadow-lg">
                        <ExternalLink className="size-3.5 text-white" />
                    </div>
                </div>
            </div>

            {/* Labels */}
            <div className="min-w-0">
                <p className="font-hand font-bold text-sm leading-tight truncate">
                    {track.album_name}
                </p>
                <p className="font-mono text-xs text-muted-foreground/55 truncate">
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
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {albums.length} albums
            </p>

            {/* Horizontal scroll shelf */}
            <div
                className="flex gap-4 overflow-x-auto py-3"
                style={{ scrollbarWidth: 'none' }}
            >
                {albums.map((track) => (
                    <AlbumCard key={track.album_art_url} track={track} />
                ))}
            </div>
        </div>
    )
}
