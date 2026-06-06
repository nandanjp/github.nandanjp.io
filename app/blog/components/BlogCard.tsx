'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { CardHeading, MonoText } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { MacWindowHeader } from '@/components/ui/mac-card'

const THEMES = [
    {
        bg: 'bg-sky-50/60     dark:bg-sky-950/20',
        border: 'border-sky-200/60  dark:border-sky-800/30',
        chrome: 'bg-sky-100/60    dark:bg-sky-950/30',
        glow: '0 0 14px 1px rgba(147,197,253,0.25)'
    },
    {
        bg: 'bg-violet-50/60  dark:bg-violet-950/20',
        border: 'border-violet-200/60 dark:border-violet-800/30',
        chrome: 'bg-violet-100/60 dark:bg-violet-950/30',
        glow: '0 0 14px 1px rgba(196,181,253,0.25)'
    },
    {
        bg: 'bg-emerald-50/60 dark:bg-emerald-950/20',
        border: 'border-emerald-200/60 dark:border-emerald-800/30',
        chrome: 'bg-emerald-100/60 dark:bg-emerald-950/30',
        glow: '0 0 14px 1px rgba(110,231,183,0.25)'
    },
    {
        bg: 'bg-rose-50/60    dark:bg-rose-950/20',
        border: 'border-rose-200/60  dark:border-rose-800/30',
        chrome: 'bg-rose-100/60   dark:bg-rose-950/30',
        glow: '0 0 14px 1px rgba(253,164,175,0.25)'
    },
    {
        bg: 'bg-amber-50/60   dark:bg-amber-950/20',
        border: 'border-amber-200/60 dark:border-amber-800/30',
        chrome: 'bg-amber-100/60  dark:bg-amber-950/30',
        glow: '0 0 14px 1px rgba(252,211,77,0.20)'
    },
    {
        bg: 'bg-teal-50/60    dark:bg-teal-950/20',
        border: 'border-teal-200/60  dark:border-teal-800/30',
        chrome: 'bg-teal-100/60   dark:bg-teal-950/30',
        glow: '0 0 14px 1px rgba(94,234,212,0.25)'
    }
] as const

const ROTATIONS = [-1.4, 0.9, -0.6, 1.2, -1.0, 0.7] as const

interface BlogCardProps {
    post: BlogPost
    index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
    const theme = THEMES[index % THEMES.length]
    const rotation = ROTATIONS[index % ROTATIONS.length]

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.45,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{
                rotate: 0,
                scale: 1.015,
                y: -5,
                boxShadow: theme.glow,
                transition: { type: 'spring', stiffness: 300, damping: 22 }
            }}
            style={{ rotate: `${rotation}deg` }}
            className="rounded-xl"
        >
            <Link
                href={`/blog/${post.slug}`}
                className={cn(
                    'group block overflow-hidden rounded-xl border-2',
                    theme.bg,
                    theme.border
                )}
            >
                {/* Window chrome */}
                <MacWindowHeader
                    title={`${post.slug}.mdx`}
                    className={cn(theme.chrome, theme.border)}
                />

                {/* Body */}
                <div className="p-5 sm:p-6">
                    {post.meta.tags && post.meta.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                            {post.meta.tags.slice(0, 4).map(tag => (
                                <span
                                    key={tag}
                                    className="bg-background/40 border-foreground/10 text-muted-foreground/60 rounded border px-1.5 py-0.5 font-mono text-xs"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <CardHeading className="group-hover:text-primary mb-4 transition-colors">
                        {post.meta.title}
                    </CardHeading>

                    {post.meta.summary && (
                        <div className="bg-background/50 border-foreground/10 relative mb-4 overflow-hidden rounded-lg border px-3.5 py-3">
                            <MonoText className="line-clamp-3 leading-relaxed">
                                {post.meta.summary}
                            </MonoText>
                            <div className="from-background/60 pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t to-transparent" />
                        </div>
                    )}

                    <div className="text-muted-foreground/60 flex items-center gap-2 font-mono text-xs">
                        <span>{formatDate(post.meta.date)}</span>
                        <span className="text-muted-foreground/30">·</span>
                        <span>{post.readingTime} min read</span>
                        <ArrowRight className="text-muted-foreground ml-auto size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}
