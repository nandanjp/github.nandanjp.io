import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { getArtistColor } from './artist-color'
import type { Track } from '@/lib/api'
import { BlurImage } from '@/components/ui/blur-image'
import { cn, formatDuration } from '@/lib/utils'

interface TrackCardProps {
    track: Track
    index: number
}

export function TrackCard({ track, index }: TrackCardProps) {
    const [hovered, setHovered] = useState(false)
    const c = getArtistColor(track.artists[0])

    return (
        <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.3,
                delay: (index % 8) * 0.04,
                ease: [0.22, 1, 0.36, 1]
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() =>
                window.open(track.external_url, '_blank', 'noopener,noreferrer')
            }
            className={cn(
                'group relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
                hovered ? c.activeBg : ''
            )}
        >
            {/* Track # */}
            <div className="flex w-8 shrink-0 items-center justify-center">
                <span className="text-muted-foreground font-mono text-xs tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>

            {/* Album art */}
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg shadow-sm">
                <BlurImage
                    src={track.album_art_url}
                    width={128}
                    height={128}
                    alt={track.album_name}
                    sizes="64px"
                    className="object-center"
                />
            </div>

            {/* Track info */}
            <div className="min-w-0 flex-1">
                <p
                    className={cn(
                        'font-hand truncate text-[17px] leading-tight font-bold transition-colors',
                        hovered ? 'text-white' : 'text-foreground'
                    )}
                >
                    {track.name}
                </p>
                <div className="flex min-w-0 flex-wrap items-center gap-1 overflow-hidden">
                    {track.artists.map(a => {
                        const ac = getArtistColor(a)
                        return (
                            <span
                                key={a}
                                className={cn(
                                    'inline-flex shrink-0 items-center rounded-full px-1.5 py-px font-mono text-xs leading-none transition-colors',
                                    hovered
                                        ? 'bg-white/20 text-white/90'
                                        : cn(ac.bg, ac.text)
                                )}
                            >
                                {a}
                            </span>
                        )
                    })}
                    <span
                        className={cn(
                            'truncate font-mono text-xs transition-colors',
                            hovered ? 'text-white/60' : 'text-muted-foreground'
                        )}
                    >
                        <span className="mx-1 opacity-50">·</span>
                        {track.album_name}
                    </span>
                </div>
            </div>

            {/* Duration + open link */}
            <div className="flex shrink-0 items-center gap-2.5">
                <span
                    className={cn(
                        'w-8 text-right font-mono text-xs tabular-nums transition-colors',
                        hovered ? 'text-white/60' : 'text-muted-foreground/45'
                    )}
                >
                    {formatDuration(track.duration_ms)}
                </span>
                <a
                    href={track.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    aria-label="Open in Spotify"
                    className="text-muted-foreground/35 hover:text-foreground opacity-0 transition-all group-hover:opacity-100"
                >
                    <ExternalLink className="size-3.5" />
                </a>
            </div>
        </motion.div>
    )
}
