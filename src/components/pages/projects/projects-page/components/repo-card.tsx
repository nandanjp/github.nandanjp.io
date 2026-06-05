import { Star, GitFork, ExternalLink, Circle, CircleDot, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatCompactNumber } from '@/lib/utils'
import type { GitHubRepo } from '@/lib/api'

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python:     '#3572A5',
    Go:         '#00ADD8',
    Rust:       '#dea584',
    Java:       '#b07219',
    'C++':      '#f34b7d',
    C:          '#555555',
    CSS:        '#563d7c',
    HTML:       '#e34c26',
    Shell:      '#89e051',
    Ruby:       '#701516',
    Swift:      '#F05138',
    Kotlin:     '#A97BFF',
}

function relativeTime(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime()
    const days = Math.floor(diff / 86400000)
    if (days === 0) return 'today'
    if (days === 1) return 'yesterday'
    if (days < 30) return `${days}d ago`
    const months = Math.floor(days / 30)
    if (months < 12) return `${months}mo ago`
    return `${Math.floor(months / 12)}y ago`
}

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
            transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
                y: -5,
                boxShadow: hoverGlow,
                transition: { type: 'spring', stiffness: 300, damping: 22 },
            }}
            className="rounded-xl"
        >
            <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden bg-zinc-50 dark:bg-zinc-900/80"
                style={{ backgroundImage: `radial-gradient(ellipse at top left, ${langColor}38 0%, transparent 70%)` }}
            >
                {/* Terminal chrome */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-700/40 bg-zinc-100/80 dark:bg-zinc-950/70">
                    <span
                        className="size-1.5 rounded-full shrink-0 animate-pulse"
                        style={{ backgroundColor: langColor }}
                    />
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-500">
                        ~/repos/{repo.name}
                    </span>
                    <ExternalLink className="ml-auto size-3 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors" />
                </div>

                {/* Body */}
                <div className="p-5">
                    {/* Topics */}
                    {repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {repo.topics.slice(0, 3).map(topic => (
                                <span
                                    key={topic}
                                    className="font-mono text-xs px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700/60 bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-500"
                                >
                                    #{topic}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Repo name */}
                    <h2 className="font-mono font-bold text-xl text-zinc-800 dark:text-zinc-100 leading-tight mb-2 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                        {repo.name}
                    </h2>

                    {/* Description — code comment style */}
                    {repo.description && (
                        <p className="font-mono text-xs leading-relaxed mb-4 text-zinc-500 dark:text-zinc-500 line-clamp-2">
                            <span className="text-zinc-400 dark:text-zinc-600 mr-1.5">//</span>
                            {repo.description}
                        </p>
                    )}

                    {/* Stats */}
                    <div className="font-mono text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-3 flex-wrap">
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
