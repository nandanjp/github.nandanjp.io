import { BookOpen, ExternalLink, Star, Users } from 'lucide-react'
import { cn, formatCompactNumber } from '@/lib/utils'
import { CardHeading, MonoText, BodyText, SubLabel } from '@/components/ui/typography'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { LanguageBar } from './LanguageBar'
import type { GitHubStats } from '@/lib/api'

interface GitHubStatsCardProps {
    stats: GitHubStats
}

function StatPill({
    icon,
    label,
    value,
    className
}: {
    icon: React.ReactNode
    label: string
    value: string
    className?: string
}) {
    return (
        <div className={cn('flex flex-col items-center gap-1 rounded-lg p-3', className)}>
            <div>{icon}</div>
            <CardHeading className="text-2xl leading-none">{value}</CardHeading>
            <MonoText className="opacity-60">{label}</MonoText>
        </div>
    )
}

export function GitHubStatsCard({ stats }: GitHubStatsCardProps) {
    const total = stats.languages.reduce((sum, lang) => sum + lang.count, 0)

    return (
        <Card className="bg-card/40 py-0 shadow-sm">
            {/* macOS window chrome */}
            <div className="bg-muted/40 flex items-center gap-1.5 border-b px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-yellow-400/70" />
                <span className="size-2.5 rounded-full bg-green-400/70" />
                <a
                    href={`https://github.com/${stats.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-muted-foreground/80 ml-auto flex items-center gap-1 font-mono text-xs transition-colors"
                >
                    github.profile
                    <ExternalLink className="size-3" />
                </a>
            </div>

            <CardContent className="p-5">
                {/* Profile row */}
                <div className="flex items-start gap-3">
                    <Avatar className="size-12 shrink-0">
                        <AvatarImage src={stats.avatar_url} alt={stats.name} />
                        <AvatarFallback>{stats.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        <CardHeading className="text-xl leading-tight">{stats.name}</CardHeading>
                        <MonoText>@{stats.username}</MonoText>
                        {stats.bio && (
                            <BodyText className="mt-0.5 line-clamp-2">{stats.bio}</BodyText>
                        )}
                    </div>
                </div>

                {/* Stat pills */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                    <StatPill
                        icon={<Star className="size-4 text-amber-500 dark:text-amber-400" />}
                        label="Stars"
                        value={formatCompactNumber(stats.total_stars)}
                        className="border border-amber-200/60 bg-amber-100/70 dark:border-amber-800/30 dark:bg-amber-950/30"
                    />
                    <StatPill
                        icon={<BookOpen className="size-4 text-sky-500 dark:text-sky-400" />}
                        label="Repos"
                        value={formatCompactNumber(stats.public_repos)}
                        className="border border-sky-200/60 bg-sky-100/70 dark:border-sky-800/30 dark:bg-sky-950/30"
                    />
                    <StatPill
                        icon={<Users className="size-4 text-violet-500 dark:text-violet-400" />}
                        label="Followers"
                        value={formatCompactNumber(stats.followers)}
                        className="border border-violet-200/60 bg-violet-100/70 dark:border-violet-800/30 dark:bg-violet-950/30"
                    />
                </div>

                {/* Top languages */}
                {stats.languages.length > 0 && (
                    <div className="mt-5">
                        <SubLabel className="mb-3">Top Languages</SubLabel>
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
            </CardContent>
        </Card>
    )
}
