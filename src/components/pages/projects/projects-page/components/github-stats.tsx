import { Star, BookOpen, Users, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCompactNumber } from '@/lib/utils'
import type { GitHubStats } from '@/lib/api'
import { LanguageBar } from './components/language-bar'

interface GitHubStatsCardProps {
    stats: GitHubStats
}

export function GitHubStatsCard({ stats }: GitHubStatsCardProps) {
    const total = stats.languages.reduce((acc, l) => acc + l.count, 0)
    const avatarSrc = import.meta.env.DEV
        ? stats.avatar_url
        : `/.netlify/images?url=${encodeURIComponent(stats.avatar_url)}&w=96&fit=cover&f=webp`

    return (
        <div className="rounded-xl border bg-card/40 overflow-hidden shadow-sm">
            {/* macOS window chrome */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b bg-muted/40">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-yellow-400/70" />
                <span className="size-2.5 rounded-full bg-green-400/70" />
                <a
                    href={`https://github.com/${stats.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1 font-mono text-[10px] text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors"
                >
                    github.profile
                    <ExternalLink className="size-3" />
                </a>
            </div>

            {/* Body */}
            <div className="p-5">
                {/* Profile row */}
                <div className="flex items-start gap-3">
                    <img
                        src={avatarSrc}
                        alt={stats.name}
                        className="size-12 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="font-hand font-bold text-xl leading-tight">{stats.name}</p>
                        <p className="font-mono text-xs text-muted-foreground">@{stats.username}</p>
                        {stats.bio && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                                {stats.bio}
                            </p>
                        )}
                    </div>
                </div>

                {/* Stats pills */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                    <StatPill
                        icon={<Star className="size-4 text-amber-500 dark:text-amber-400" />}
                        label="Stars"
                        value={formatCompactNumber(stats.total_stars)}
                        className="bg-amber-100/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/30"
                    />
                    <StatPill
                        icon={<BookOpen className="size-4 text-sky-500 dark:text-sky-400" />}
                        label="Repos"
                        value={formatCompactNumber(stats.public_repos)}
                        className="bg-sky-100/70 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/30"
                    />
                    <StatPill
                        icon={<Users className="size-4 text-violet-500 dark:text-violet-400" />}
                        label="Followers"
                        value={formatCompactNumber(stats.followers)}
                        className="bg-violet-100/70 dark:bg-violet-950/30 border border-violet-200/60 dark:border-violet-800/30"
                    />
                </div>

                {/* Top Languages */}
                {stats.languages.length > 0 && (
                    <div className="mt-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/40 mb-3">
                            Top Languages
                        </p>
                        <div className="flex flex-col gap-2.5">
                            {stats.languages.slice(0, 5).map(lang => (
                                <LanguageBar
                                    key={lang.name}
                                    name={lang.name}
                                    count={lang.count}
                                    total={total}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function StatPill({
    icon,
    label,
    value,
    className,
}: {
    icon: React.ReactNode
    label: string
    value: string
    className?: string
}) {
    return (
        <div className={cn('flex flex-col items-center gap-1 rounded-lg p-3', className)}>
            <div>{icon}</div>
            <p className="font-hand font-bold text-2xl leading-none">{value}</p>
            <p className="font-mono text-[10px] text-muted-foreground/60">{label}</p>
        </div>
    )
}
