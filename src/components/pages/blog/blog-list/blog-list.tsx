import { useState } from 'react'
import { BlogCard } from './components/blog-card'
import { getAllPosts } from '@/lib/blog'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'

const PER_PAGE = 5

export function BlogList() {
    const [page, setPage] = useState(1)
    const posts = getAllPosts()

    if (posts.length === 0) {
        return (
            <div className="text-muted-foreground flex flex-col items-center gap-2 py-16">
                <p className="font-hand text-2xl font-bold">
                    Nothing here yet.
                </p>
                <p className="text-sm">Check back soon.</p>
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
