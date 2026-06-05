import { useState } from 'react'
import { Play, Pause, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { formatDuration } from '@/lib/utils'
import type { Track } from '@/lib/api'
import { getArtistColor } from './artist-color'

function TrackWaveform() {
    const bars = [8, 13, 9, 13, 8]
    const delays = [0, 0.15, 0.08, 0.22, 0.04]
    return (
        <span className="flex items-end gap-[2px]">
            {bars.map((h, i) => (
                <motion.span
                    key={i}
                    className="w-[2.5px] rounded-full bg-primary"
                    animate={{ scaleY: [1, 0.3, 0.7, 0.3, 1] }}
                    transition={{ duration: 0.85, repeat: Infinity, delay: delays[i], ease: 'easeInOut' }}
                    style={{ height: h, transformOrigin: 'bottom' }}
                />
            ))}
        </span>
    )
}

interface TrackCardProps {
    track: Track
    index: number
    isPlaying: boolean
    progress: number
    onPlay: (track: Track) => void
    onStop: () => void
}

export function TrackCard({ track, index, isPlaying, progress, onPlay, onStop }: TrackCardProps) {
    const hasPreview = !!track.preview_url
    const [hovered, setHovered] = useState(false)
    const c = getArtistColor(track.artists[0])
    const albumArtSrc = import.meta.env.DEV
        ? track.album_art_url
        : `/.netlify/images?url=${encodeURIComponent(track.album_art_url)}&w=128&fit=cover&f=webp`

    return (
        <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: (index % 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                'group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-default',
                isPlaying || hovered ? c.activeBg : '',
            )}
        >
            {/* Track # / waveform / play button */}
            <div className="w-8 shrink-0 flex items-center justify-center">
                {isPlaying ? (
                    <button onClick={onStop} aria-label="Stop" className="flex items-center justify-center">
                        <TrackWaveform />
                    </button>
                ) : (
                    <>
                        <span className={cn(
                            'font-mono text-xs text-muted-foreground/40 tabular-nums',
                            hasPreview && 'group-hover:hidden',
                        )}>
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        {hasPreview && (
                            <button
                                onClick={() => onPlay(track)}
                                aria-label="Play preview"
                                className="hidden group-hover:flex items-center justify-center text-foreground"
                            >
                                <Play className="size-3.5 fill-current" />
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* Album art */}
            <img
                src={albumArtSrc}
                alt={track.album_name}
                className="size-16 rounded-lg object-cover shrink-0 shadow-sm"
            />

            {/* Track info */}
            <div className="flex-1 min-w-0">
                <p className={cn(
                    'font-hand font-bold text-[17px] leading-tight truncate transition-colors',
                    isPlaying || hovered ? 'text-white' : 'text-foreground',
                )}>
                    {track.name}
                </p>
                <div className="flex items-center gap-1 flex-wrap min-w-0 overflow-hidden">
                    {track.artists.map(a => {
                        const ac = getArtistColor(a)
                        return (
                            <span key={a} className={cn(
                                'inline-flex items-center text-[9px] px-1.5 py-px rounded-full font-mono leading-none shrink-0 transition-colors',
                                isPlaying || hovered ? 'bg-white/20 text-white/90' : cn(ac.bg, ac.text),
                            )}>
                                {a}
                            </span>
                        )
                    })}
                    <span className={cn(
                        'font-mono text-[10px] truncate transition-colors',
                        isPlaying || hovered ? 'text-white/60' : 'text-muted-foreground/40',
                    )}>
                        <span className="mx-1 opacity-50">·</span>
                        {track.album_name}
                    </span>
                </div>
            </div>

            {/* Duration + controls */}
            <div className="flex items-center gap-2.5 shrink-0">
                {isPlaying && (
                    <button
                        onClick={onStop}
                        aria-label="Stop"
                        className="text-muted-foreground/50 hover:text-foreground transition-colors"
                    >
                        <Pause className="size-3.5" />
                    </button>
                )}
                <span className={cn(
                    'font-mono text-[10px] tabular-nums w-8 text-right transition-colors',
                    isPlaying || hovered ? 'text-white/60' : 'text-muted-foreground/45',
                )}>
                    {formatDuration(track.duration_ms)}
                </span>
                <a
                    href={track.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    aria-label="Open in Spotify"
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground/35 hover:text-foreground transition-all"
                >
                    <ExternalLink className="size-3.5" />
                </a>
            </div>

            {/* Playback progress — thin line at row bottom */}
            {isPlaying && (
                <div className="absolute bottom-0 left-3 right-3 h-px bg-foreground/8">
                    <motion.div
                        className="h-full bg-primary/40 rounded-full"
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 0.15, ease: 'linear' }}
                    />
                </div>
            )}
        </motion.div>
    )
}
