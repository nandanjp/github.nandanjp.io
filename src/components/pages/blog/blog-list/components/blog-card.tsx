import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/blog'
import type { BlogPost } from '@/lib/blog'

interface BlogCardProps {
    post: BlogPost
    index: number
}

const THEMES = [
    {
        bg:     'bg-sky-50/60     dark:bg-sky-950/20',
        border: 'border-sky-200/60  dark:border-sky-800/30',
        chrome: 'bg-sky-100/60    dark:bg-sky-950/30',
        glow:   '0 0 14px 1px rgba(147,197,253,0.25)',
    },
    {
        bg:     'bg-violet-50/60  dark:bg-violet-950/20',
        border: 'border-violet-200/60 dark:border-violet-800/30',
        chrome: 'bg-violet-100/60 dark:bg-violet-950/30',
        glow:   '0 0 14px 1px rgba(196,181,253,0.25)',
    },
    {
        bg:     'bg-emerald-50/60 dark:bg-emerald-950/20',
        border: 'border-emerald-200/60 dark:border-emerald-800/30',
        chrome: 'bg-emerald-100/60 dark:bg-emerald-950/30',
        glow:   '0 0 14px 1px rgba(110,231,183,0.25)',
    },
    {
        bg:     'bg-rose-50/60    dark:bg-rose-950/20',
        border: 'border-rose-200/60  dark:border-rose-800/30',
        chrome: 'bg-rose-100/60   dark:bg-rose-950/30',
        glow:   '0 0 14px 1px rgba(253,164,175,0.25)',
    },
    {
        bg:     'bg-amber-50/60   dark:bg-amber-950/20',
        border: 'border-amber-200/60 dark:border-amber-800/30',
        chrome: 'bg-amber-100/60  dark:bg-amber-950/30',
        glow:   '0 0 14px 1px rgba(252,211,77,0.20)',
    },
    {
        bg:     'bg-teal-50/60    dark:bg-teal-950/20',
        border: 'border-teal-200/60  dark:border-teal-800/30',
        chrome: 'bg-teal-100/60   dark:bg-teal-950/30',
        glow:   '0 0 14px 1px rgba(94,234,212,0.25)',
    },
] as const

const ROTATIONS = [-1.4, 0.9, -0.6, 1.2, -1.0, 0.7] as const

export function BlogCard({ post, index }: BlogCardProps) {
    const theme = THEMES[index % THEMES.length]
    const rotation = ROTATIONS[index % ROTATIONS.length]

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
                rotate: 0,
                scale: 1.015,
                y: -5,
                boxShadow: theme.glow,
                transition: { type: 'spring', stiffness: 300, damping: 22 },
            }}
            style={{ rotate: `${rotation}deg` }}
            className="rounded-xl"
        >
            <Link
                to="/blog/$blogId"
                params={{ blogId: post.slug }}
                className={cn(
                    'group block rounded-xl border-2 overflow-hidden',
                    theme.bg,
                    theme.border,
                )}
            >
                {/* Window chrome */}
                <div className={cn(
                    'flex items-center gap-1.5 px-4 py-2.5 border-b',
                    theme.chrome,
                    theme.border,
                )}>
                    <span className="size-2.5 rounded-full bg-red-400/70" />
                    <span className="size-2.5 rounded-full bg-yellow-400/70" />
                    <span className="size-2.5 rounded-full bg-green-400/70" />
                    <span className="ml-auto font-mono text-xs text-muted-foreground">
                        {post.slug}.mdx
                    </span>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6">
                    {/* Tags */}
                    {post.meta.tags && post.meta.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.meta.tags.slice(0, 4).map(tag => (
                                <span
                                    key={tag}
                                    className="font-mono text-xs px-1.5 py-0.5 rounded border border-foreground/10 bg-background/40 text-muted-foreground/60"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h2 className="font-hand font-bold text-2xl sm:text-3xl leading-tight mb-4 transition-colors group-hover:text-primary">
                        {post.meta.title}
                    </h2>

                    {/* Summary preview box */}
                    {post.meta.summary && (
                        <div className="relative rounded-lg border border-foreground/10 bg-background/50 px-3.5 py-3 mb-4 overflow-hidden">
                            <p className="font-mono text-xs text-muted-foreground/70 leading-relaxed line-clamp-3">
                                {post.meta.summary}
                            </p>
                            <div className="pointer-events-none absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-background/60 to-transparent" />
                        </div>
                    )}

                    {/* Metadata row */}
                    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground/60">
                        <span>{formatDate(post.meta.date)}</span>
                        <span className="text-muted-foreground/30">·</span>
                        <span>{post.readingTime} min read</span>
                        <ArrowRight className="ml-auto size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}
