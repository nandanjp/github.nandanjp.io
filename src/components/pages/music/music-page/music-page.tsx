import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useMusic } from '@/hooks/use-music'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

import type { Track } from '@/lib/api'
import { TrackGrid } from './components/track-grid'
import { AlbumScene } from './components/album-scene'
import { ArtistExplorer } from './components/artist-explorer'

const PER_PAGE = 8

function TrackGridSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border">
                    <Skeleton className="size-16 rounded-lg shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-2/5" />
                        <Skeleton className="h-3 w-1/3" />
                        <Skeleton className="h-2.5 w-1/4" />
                    </div>
                    <Skeleton className="h-3 w-8 shrink-0" />
                </div>
            ))}
        </div>
    )
}

function formatTotalTime(tracks: Track[]): string {
    const ms = tracks.reduce((sum, t) => sum + t.duration_ms, 0)
    const h = Math.floor(ms / 3_600_000)
    const m = Math.floor((ms % 3_600_000) / 60_000)
    return h > 0 ? `${h}h ${m}m` : `${m}m`
}

function buildPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

    const pages: (number | 'ellipsis')[] = [1]
    if (current > 3) pages.push('ellipsis')

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    for (let i = start; i <= end; i++) pages.push(i)

    if (current < total - 2) pages.push('ellipsis')
    pages.push(total)
    return pages
}

export function MusicPage() {
    const { data, isLoading, isError } = useMusic()
    const [playingId, setPlayingId]     = useState<string | null>(null)
    const [progress, setProgress]       = useState(0)
    const [page, setPage]               = useState(1)
    const audioRef                      = useRef<HTMLAudioElement | null>(null)

    useEffect(() => () => { audioRef.current?.pause() }, [])

    function handlePlay(track: Track) {
        audioRef.current?.pause()
        if (!track.preview_url) return

        const audio = new Audio(track.preview_url)
        audio.volume = 0.7
        audio.play().catch(() => null)
        audio.addEventListener('timeupdate', () => {
            if (audio.duration) setProgress(audio.currentTime / audio.duration)
        })
        audio.addEventListener('ended', () => { setPlayingId(null); setProgress(0) })
        audioRef.current = audio
        setPlayingId(track.id)
        setProgress(0)
    }

    function handleStop() {
        audioRef.current?.pause()
        audioRef.current = null
        setPlayingId(null)
        setProgress(0)
    }

    function goTo(p: number) {
        const totalPages = data ? Math.ceil(data.tracks.length / PER_PAGE) : 1
        setPage(Math.max(1, Math.min(totalPages, p)))
        handleStop()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (isLoading) return <TrackGridSkeleton />

    if (isError || !data?.tracks.length) {
        return (
            <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
                <p className="font-hand font-bold text-2xl">Nothing here yet.</p>
                <p className="text-sm">Check back soon.</p>
            </div>
        )
    }

    const tracks = data.tracks
    const totalPages = Math.ceil(tracks.length / PER_PAGE)
    const pageTracks = tracks.slice((page - 1) * PER_PAGE, page * PER_PAGE)
    const playingTrack = playingId ? tracks.find(t => t.id === playingId) : null
    const previewCount = tracks.filter(t => t.preview_url).length

    return (
        <div className="flex flex-col gap-6">
            {/* Stats strip */}
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                <span>{tracks.length} tracks</span>
                <span className="text-muted-foreground/20">·</span>
                <span>{formatTotalTime(tracks)}</span>
                <span className="text-muted-foreground/20">·</span>
                <span>{previewCount} with previews</span>
            </div>

            {/* Album art mosaic */}
            <AlbumScene tracks={tracks} />

            {/* Artist explorer widget */}
            <ArtistExplorer tracks={tracks} />

            {/* Now-playing banner */}
            <AnimatePresence>
                {playingTrack && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="rounded-xl border bg-card/60 backdrop-blur-sm px-4 py-3 flex items-center gap-3 mb-2">
                            <img
                                src={import.meta.env.DEV
                                    ? playingTrack.album_art_url
                                    : `/.netlify/images?url=${encodeURIComponent(playingTrack.album_art_url)}&w=80&fit=cover&f=webp`}
                                alt={playingTrack.album_name}
                                className="size-10 rounded-lg object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-0.5">
                                    now playing
                                </p>
                                <p className="font-hand font-bold text-lg leading-tight truncate text-primary">
                                    {playingTrack.name}
                                </p>
                                <p className="font-mono text-xs text-muted-foreground/60 truncate">
                                    {playingTrack.artists.join(', ')}
                                </p>
                            </div>
                            {/* Waveform */}
                            <NowPlayingWave />
                            {/* Duration remaining */}
                            <span className="font-mono text-xs text-muted-foreground tabular-nums shrink-0">
                                0:{String(Math.round((1 - progress) * 30)).padStart(2, '0')}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={handleStop}
                                aria-label="Stop"
                                className="text-muted-foreground hover:text-foreground shrink-0"
                            >
                                <Pause className="size-4" />
                            </Button>
                        </div>
                        {/* Banner progress bar */}
                        <div className="h-[2px] bg-foreground/8 rounded-full mb-4 overflow-hidden">
                            <motion.div
                                className="h-full bg-primary/50 rounded-full"
                                animate={{ width: `${progress * 100}%` }}
                                transition={{ duration: 0.15, ease: 'linear' }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <TrackGrid
                tracks={pageTracks}
                startIndex={(page - 1) * PER_PAGE}
                playingId={playingId}
                progress={progress}
                onPlay={handlePlay}
                onStop={handleStop}
            />

            {totalPages > 1 && (
                <Pagination className="justify-center sm:justify-end">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => { e.preventDefault(); goTo(page - 1) }}
                                className={page === 1 ? 'pointer-events-none opacity-40' : ''}
                            />
                        </PaginationItem>

                        {buildPageNumbers(page, totalPages).map((n, i) =>
                            n === 'ellipsis' ? (
                                <PaginationItem key={`e-${i}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={n}>
                                    <PaginationLink
                                        href="#"
                                        isActive={n === page}
                                        onClick={(e) => { e.preventDefault(); goTo(n as number) }}
                                    >
                                        {n}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => { e.preventDefault(); goTo(page + 1) }}
                                className={page === totalPages ? 'pointer-events-none opacity-40' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}

function NowPlayingWave() {
    const bars = [8, 14, 10, 14, 8]
    const delays = [0, 0.14, 0.07, 0.21, 0.04]
    return (
        <span className="flex items-end gap-[2.5px] shrink-0">
            {bars.map((h, i) => (
                <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-primary/60"
                    animate={{ scaleY: [1, 0.3, 0.7, 0.3, 1] }}
                    transition={{ duration: 0.85, repeat: Infinity, delay: delays[i], ease: 'easeInOut' }}
                    style={{ height: h, transformOrigin: 'bottom' }}
                />
            ))}
        </span>
    )
}
