import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { BodyText, MonoText } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { mdxComponents } from './mdx-components'
import type { BlogMeta } from '@/lib/blog'

interface BlogPostProps {
    source: string
    meta: BlogMeta
}

export function BlogPost({ source, meta }: BlogPostProps) {
    return (
        <div className="mx-auto w-full max-w-2xl">
            <Link
                href="/blog"
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
                    {meta.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                    <MonoText className="text-sm">{formatDate(meta.date)}</MonoText>
                    {meta.tags?.map(tag => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="px-2 py-0 text-xs font-normal"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
                {meta.summary && <BodyText className="text-base">{meta.summary}</BodyText>}
            </header>

            <hr className="border-border mb-8" />

            <article className="prose prose-neutral dark:prose-invert prose-headings:font-mono prose-a:no-underline prose-pre:my-0 prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0 prose-pre:rounded-none prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-img:rounded-xl prose-img:my-0 [&_.not-prose]:not-prose max-w-none">
                <MDXRemote
                    source={source}
                    components={mdxComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [
                                rehypeSlug,
                                [
                                    rehypePrettyCode,
                                    {
                                        theme: {
                                            dark: 'github-dark',
                                            light: 'github-light'
                                        },
                                        keepBackground: false
                                    }
                                ]
                            ]
                        }
                    }}
                />
            </article>
        </div>
    )
}
