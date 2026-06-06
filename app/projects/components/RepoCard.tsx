'use client'

import { Circle, CircleDot, Clock, ExternalLink, GitFork, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatCompactNumber, relativeTime } from '@/lib/utils'
import { LANGUAGE_COLORS } from './language-colors'
import type { GitHubRepo } from '@/lib/api'

interface RepoCardProps {
    repo: GitHubRepo
    index: number
}

export function RepoCard({ repo, index }: RepoCardProps) {
    const langColor = LANGUAGE_COLORS[repo.language ?? ''] ?? '#8b949e'
    const hoverGlow = `0 8px 28px 0 ${langColor}28`

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.45,
                delay: Math.min(index, 8) * 0.07,
                ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{
                y: -5,
                boxShadow: hoverGlow,
                transition: { type: 'spring', stiffness: 300, damping: 22 }
            }}
            className="rounded-xl"
        >
            <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700/50 dark:bg-zinc-900/80"
                style={{
                    backgroundImage: `radial-gradient(ellipse at top left, ${langColor}38 0%, transparent 70%)`
                }}
            >
                {/* Terminal chrome */}
                <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-100/80 px-4 py-2.5 dark:border-zinc-700/40 dark:bg-zinc-950/70">
                    <span
                        className="size-1.5 shrink-0 animate-pulse rounded-full"
                        style={{ backgroundColor: langColor }}
                    />
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500">
                        ~/repos/{repo.name}
                    </span>
                    <ExternalLink className="ml-auto size-3 text-zinc-400 transition-colors group-hover:text-zinc-600 dark:text-zinc-600 dark:group-hover:text-zinc-400" />
                </div>

                <div className="p-5">
                    {/* Topics */}
                    {repo.topics.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                            {repo.topics.slice(0, 3).map(topic => (
                                <span
                                    key={topic}
                                    className="rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800/60 dark:text-zinc-500"
                                >
                                    #{topic}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Repo name — intentional font-mono for terminal aesthetic */}
                    <h2 className="mb-2 font-mono text-xl leading-tight font-bold text-zinc-800 transition-colors group-hover:text-zinc-950 dark:text-zinc-100 dark:group-hover:text-white">
                        {repo.name}
                    </h2>

                    {/* Description — code comment style */}
                    {repo.description && (
                        <p className="mb-4 line-clamp-2 font-mono text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
                            <span className="mr-1.5 text-zinc-400 dark:text-zinc-600">{'//'}</span>
                            {repo.description}
                        </p>
                    )}

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                        {repo.language && (
                            <span className="flex items-center gap-1">
                                <Circle className="size-2.5 fill-current" style={{ color: langColor }} />
                                {repo.language}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <Star className="size-3" />
                            {formatCompactNumber(repo.stars)}
                        </span>
                        <span className="flex items-center gap-1">
                            <GitFork className="size-3" />
                            {formatCompactNumber(repo.forks)}
                        </span>
                        {repo.open_issues > 0 && (
                            <span className="flex items-center gap-1">
                                <CircleDot className="size-3" />
                                {repo.open_issues}
                            </span>
                        )}
                        <span className="ml-auto flex items-center gap-1">
                            <Clock className="size-3" />
                            {relativeTime(repo.updated_at)}
                        </span>
                    </div>
                </div>
            </a>
        </motion.article>
    )
}
