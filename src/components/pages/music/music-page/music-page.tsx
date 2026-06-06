import { useState } from 'react'
import { TrackGrid } from './components/track-grid'
import { AlbumScene } from './components/album-scene'
import { ArtistExplorer } from './components/artist-explorer'
import type { Track } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'
import { useMusic } from '@/hooks/use-music'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'

const PER_PAGE = 8

function TrackGridSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border p-3"
                >
                    <Skeleton className="size-16 shrink-0 rounded-lg" />
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

function buildPageNumbers(
    current: number,
    total: number
): (number | 'ellipsis')[] {
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
    const [page, setPage] = useState(1)

    function goTo(p: number) {
        const totalPages = data ? Math.ceil(data.tracks.length / PER_PAGE) : 1
        setPage(Math.max(1, Math.min(totalPages, p)))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (isLoading) return <TrackGridSkeleton />

    if (isError || !data?.tracks.length) {
        return (
            <div className="text-muted-foreground flex flex-col items-center gap-2 py-16">
                <p className="font-hand text-2xl font-bold">
                    Nothing here yet.
                </p>
                <p className="text-sm">Check back soon.</p>
            </div>
        )
    }

    const tracks = data.tracks
    const totalPages = Math.ceil(tracks.length / PER_PAGE)
    const pageTracks = tracks.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    return (
        <div className="flex flex-col gap-6">
            {/* Stats strip */}
            <div className="text-muted-foreground flex items-center gap-3 font-mono text-xs">
                <span>{tracks.length} tracks</span>
                <span className="text-muted-foreground/20">·</span>
                <span>{formatTotalTime(tracks)}</span>
            </div>

            <AlbumScene tracks={tracks} />
            <ArtistExplorer tracks={tracks} />

            <TrackGrid tracks={pageTracks} startIndex={(page - 1) * PER_PAGE} />

            {totalPages > 1 && (
                <Pagination className="justify-center sm:justify-end">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={e => {
                                    e.preventDefault()
                                    goTo(page - 1)
                                }}
                                className={
                                    page === 1
                                        ? 'pointer-events-none opacity-40'
                                        : ''
                                }
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
                                        onClick={e => {
                                            e.preventDefault()
                                            goTo(n)
                                        }}
                                    >
                                        {n}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={e => {
                                    e.preventDefault()
                                    goTo(page + 1)
                                }}
                                className={
                                    page === totalPages
                                        ? 'pointer-events-none opacity-40'
                                        : ''
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}
