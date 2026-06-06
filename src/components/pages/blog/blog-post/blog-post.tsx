import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { MdxContent } from './components/mdx-content'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatDate, getPost } from '@/lib/blog'

interface BlogPostProps {
    slug: string
}

export function BlogPost({ slug }: BlogPostProps) {
    const mod = getPost(slug)

    if (!mod) {
        return (
            <div className="text-muted-foreground flex flex-col items-center gap-2 py-16">
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
                    'text-muted-foreground mb-8 -ml-2 flex w-fit items-center gap-1.5'
                )}
            >
                <ArrowLeft className="size-4" />
                All posts
            </Link>

            <header className="mb-8 flex flex-col gap-3">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {mod.meta.title}
                </h1>
                <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
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
                    <p className="text-muted-foreground text-base">
                        {mod.meta.summary}
                    </p>
                )}
            </header>

            <hr className="border-border mb-8" />

            <MdxContent component={mod.default} />
        </div>
    )
}
