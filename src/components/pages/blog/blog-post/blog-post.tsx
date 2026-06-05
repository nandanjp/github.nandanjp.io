import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getPost, formatDate } from '@/lib/blog'
import { MdxContent } from './components/mdx-content'

interface BlogPostProps {
    slug: string
}

export function BlogPost({ slug }: BlogPostProps) {
    const mod = getPost(slug)

    if (!mod) {
        return (
            <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
                <p className="text-lg font-medium">Post not found</p>
                <Link
                    to="/blog"
                    className={cn(
                        buttonVariants({ variant: 'ghost', size: 'sm' }),
                        'mt-2'
                    )}
                >
                    Back to blog
                </Link>
            </div>
        )
    }

    return (
        <div className="mx-auto w-full max-w-2xl">
            <Link
                to="/blog"
                className={cn(
                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                    '-ml-2 mb-8 flex w-fit items-center gap-1.5 text-muted-foreground'
                )}
            >
                <ArrowLeft className="size-4" />
                All posts
            </Link>

            <header className="mb-8 flex flex-col gap-3">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {mod.meta.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <time>{formatDate(mod.meta.date)}</time>
                    {mod.meta.tags?.map(tag => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="px-2 py-0 text-xs font-normal"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
                {mod.meta.summary && (
                    <p className="text-base text-muted-foreground">{mod.meta.summary}</p>
                )}
            </header>

            <hr className="mb-8 border-border" />

            <MdxContent component={mod.default} />
        </div>
    )
}
