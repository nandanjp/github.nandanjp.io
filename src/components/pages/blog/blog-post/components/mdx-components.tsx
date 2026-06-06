import { MdxCodeBlock } from './mdx-code-block'
import { MdxImage } from './mdx-image'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>
type HRProps = ComponentPropsWithoutRef<'hr'>

function isExternalHref(href: string | undefined): boolean {
    return !!href && (href.startsWith('http') || href.startsWith('//'))
}

export const mdxComponents = {
    h1: ({ className, ...props }: HeadingProps) => (
        <h1
            className={cn(
                'mt-10 mb-4 scroll-m-20 text-3xl font-bold tracking-tight',
                className
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }: HeadingProps) => (
        <h2
            className={cn(
                'border-border mt-10 mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight',
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: HeadingProps) => (
        <h3
            className={cn(
                'mt-8 mb-3 scroll-m-20 text-xl font-semibold tracking-tight',
                className
            )}
            {...props}
        />
    ),
    h4: ({ className, ...props }: HeadingProps) => (
        <h4
            className={cn(
                'mt-6 mb-2 scroll-m-20 text-lg font-semibold',
                className
            )}
            {...props}
        />
    ),
    p: ({ className, ...props }: ParagraphProps) => (
        <p
            className={cn(
                'mb-5 leading-7 [&:not(:first-child)]:mt-4',
                className
            )}
            {...props}
        />
    ),
    a: ({ className, href, children, ...props }: AnchorProps) => {
        const external = isExternalHref(href)
        return (
            <a
                href={href}
                className={cn(
                    'decoration-primary/40 hover:decoration-primary font-medium underline underline-offset-4 transition-[text-decoration-color] duration-150',
                    className
                )}
                {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                {...props}
            >
                {children}
                {external && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-0.5 inline-block size-3 align-baseline opacity-60"
                        aria-hidden
                    >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                )}
            </a>
        )
    },
    blockquote: ({ className, ...props }: BlockquoteProps) => (
        <blockquote
            className={cn(
                'border-primary bg-primary/5 text-muted-foreground my-6 rounded-r-lg border-l-4 py-3 pr-4 pl-5 [&>p]:mb-0',
                className
            )}
            {...props}
        />
    ),
    ul: ({ className, ...props }: ComponentPropsWithoutRef<'ul'>) => (
        <ul
            className={cn('my-5 ml-6 list-disc space-y-2', className)}
            {...props}
        />
    ),
    ol: ({ className, ...props }: ComponentPropsWithoutRef<'ol'>) => (
        <ol
            className={cn('my-5 ml-6 list-decimal space-y-2', className)}
            {...props}
        />
    ),
    li: ({ className, ...props }: ComponentPropsWithoutRef<'li'>) => (
        <li className={cn('leading-7', className)} {...props} />
    ),
    hr: ({ className, ...props }: HRProps) => (
        <hr className={cn('border-border my-10', className)} {...props} />
    ),
    pre: ({
        className,
        children,
        ...props
    }: ComponentPropsWithoutRef<'pre'> & {
        'data-language'?: string
        'data-theme'?: string
    }) => (
        <MdxCodeBlock className={className} {...props}>
            {children}
        </MdxCodeBlock>
    ),
    code: ({ className, ...props }: ComponentPropsWithoutRef<'code'>) => {
        const isBlock =
            className?.includes('language-') ||
            (props as Record<string, unknown>)['data-language']
        if (isBlock) return <code className={className} {...props} />
        return (
            <code
                className={cn(
                    'border-border bg-muted rounded-md border px-[0.35em] py-[0.15em] font-mono text-[0.85em]',
                    className
                )}
                {...props}
            />
        )
    },
    img: ({ className, ...props }: ComponentPropsWithoutRef<'img'>) => (
        <MdxImage className={className} {...props} />
    ),
    table: ({ className, ...props }: ComponentPropsWithoutRef<'table'>) => (
        <div className="border-border my-6 w-full overflow-auto rounded-xl border">
            <table
                className={cn('w-full border-collapse text-sm', className)}
                {...props}
            />
        </div>
    ),
    thead: ({ className, ...props }: ComponentPropsWithoutRef<'thead'>) => (
        <thead className={cn('bg-muted/60', className)} {...props} />
    ),
    th: ({ className, ...props }: ComponentPropsWithoutRef<'th'>) => (
        <th
            className={cn(
                'border-border text-muted-foreground border-b px-4 py-2.5 text-left text-xs font-semibold tracking-wider uppercase',
                className
            )}
            {...props}
        />
    ),
    td: ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => (
        <td
            className={cn(
                'border-border border-b px-4 py-3 last:border-0 [tr:last-child>&]:border-0',
                className
            )}
            {...props}
        />
    ),
    strong: ({ className, ...props }: ComponentPropsWithoutRef<'strong'>) => (
        <strong className={cn('font-semibold', className)} {...props} />
    ),
    em: ({ className, ...props }: ComponentPropsWithoutRef<'em'>) => (
        <em className={cn('italic', className)} {...props} />
    )
}
