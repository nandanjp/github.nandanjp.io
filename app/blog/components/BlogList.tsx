'use client'

import { useState } from 'react'
import { BlogCard } from './BlogCard'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import { EmptyHeading, EmptyBody } from '@/components/ui/typography'
import { buildPageNumbers } from '@/lib/utils'
import type { BlogPost } from '@/lib/blog'

const PER_PAGE = 5

interface BlogListProps {
    posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
    const [page, setPage] = useState(1)

    if (posts.length === 0) {
        return (
            <div className="text-muted-foreground flex flex-col items-center gap-2 py-16">
                <EmptyHeading>Nothing here yet.</EmptyHeading>
                <EmptyBody>Check back soon.</EmptyBody>
            </div>
        )
    }

    const totalPages = Math.ceil(posts.length / PER_PAGE)
    const pagePosts = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    function goTo(p: number) {
        setPage(Math.max(1, Math.min(totalPages, p)))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="flex flex-col gap-8 pb-16">
            <div className="flex flex-col gap-8">
                {pagePosts.map((post, i) => (
                    <BlogCard key={post.slug} post={post} index={i} />
                ))}
            </div>

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

