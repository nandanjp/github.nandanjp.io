'use client'

import { useState } from 'react'
import { AlbumScene } from './AlbumScene'
import { ArtistExplorer } from './ArtistExplorer'
import { TrackGrid } from './TrackGrid'
import type { Track } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import { EmptyHeading, EmptyBody, MonoText } from '@/components/ui/typography'
import { buildPageNumbers, formatTotalDuration } from '@/lib/utils'

const PER_PAGE = 8

export function TrackGridSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
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

interface MusicContentProps {
    tracks: Track[]
}

export function MusicContent({ tracks }: MusicContentProps) {
    const [page, setPage] = useState(1)

    if (tracks.length === 0) {
        return (
            <div className="flex flex-col items-center gap-2 py-16">
                <EmptyHeading>Nothing here yet.</EmptyHeading>
                <EmptyBody>Check back soon.</EmptyBody>
            </div>
        )
    }

    const totalPages = Math.ceil(tracks.length / PER_PAGE)
    const pageTracks = tracks.slice((page - 1) * PER_PAGE, page * PER_PAGE)
    const totalDurationMs = tracks.reduce((sum, track) => sum + track.duration_ms, 0)

    function goTo(targetPage: number) {
        setPage(Math.max(1, Math.min(totalPages, targetPage)))
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="text-muted-foreground flex items-center gap-3 font-mono text-xs">
                <MonoText>{tracks.length} tracks</MonoText>
                <span className="text-muted-foreground/20">·</span>
                <MonoText>{formatTotalDuration(totalDurationMs)}</MonoText>
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
                                onClick={event => {
                                    event.preventDefault()
                                    goTo(page - 1)
                                }}
                                className={
                                    page === 1 ? 'pointer-events-none opacity-40' : ''
                                }
                            />
                        </PaginationItem>

                        {buildPageNumbers(page, totalPages).map((pageNum, index) =>
                            pageNum === 'ellipsis' ? (
                                <PaginationItem key={`ellipsis-${index}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink
                                        href="#"
                                        isActive={pageNum === page}
                                        onClick={event => {
                                            event.preventDefault()
                                            goTo(pageNum)
                                        }}
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={event => {
                                    event.preventDefault()
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
