import { motion } from 'framer-motion'
import { Circle, GitBranch, Package, Clock } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useGitHubStats, useGitHubRepos } from '@/hooks/use-github'
import { GitHubStatsCard } from './components/github-stats'
import { RepoCard } from './components/repo-card'
import { ContributionGraph } from './components/contribution-graph'
import type { GitHubRepo } from '@/lib/api'

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Go: '#00ADD8',
    Rust: '#dea584',
    Java: '#b07219',
    'C++': '#f34b7d',
    CSS: '#563d7c',
    HTML: '#e34c26',
    Shell: '#89e051',
    Lua: '#000080',
    Kotlin: '#A97BFF',
    Swift: '#F05138',
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

function ActivityCardContent({ repos }: { repos: GitHubRepo[] }) {
    const now = Date.now()
    const activeThisMonth = repos.filter(r => now - new Date(r.updated_at).getTime() < 30 * 86400000).length
    const sorted = [...repos].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    const lastPush = sorted[0] ? relativeTime(sorted[0].updated_at) : '—'
    const recent = sorted.slice(0, 5)

    return (
        <>
            {/* Divider + quick stats */}
            <div className="mt-4 pt-4 border-t border-foreground/8 flex-1 flex flex-col">
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center gap-0.5 rounded-lg p-2 bg-background/40 border border-foreground/8">
                        <Package className="size-3.5 text-muted-foreground/50 mb-0.5" />
                        <span className="font-hand font-bold text-lg leading-none">{repos.length}</span>
                        <span className="font-mono text-[9px] text-muted-foreground/50">repos</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 rounded-lg p-2 bg-background/40 border border-foreground/8">
                        <GitBranch className="size-3.5 text-muted-foreground/50 mb-0.5" />
                        <span className="font-hand font-bold text-lg leading-none">{activeThisMonth}</span>
                        <span className="font-mono text-[9px] text-muted-foreground/50">this month</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 rounded-lg p-2 bg-background/40 border border-foreground/8">
                        <Clock className="size-3.5 text-muted-foreground/50 mb-0.5" />
                        <span className="font-hand font-bold text-lg leading-none">{lastPush}</span>
                        <span className="font-mono text-[9px] text-muted-foreground/50">last push</span>
                    </div>
                </div>

                {/* Recent activity list */}
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/40 mb-2">
                    recent activity
                </p>
                <div className="flex flex-col gap-1.5">
                    {recent.map(repo => (
                        <a
                            key={repo.name}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 group"
                        >
                            <Circle
                                className="size-2 shrink-0 fill-current"
                                style={{ color: LANGUAGE_COLORS[repo.language ?? ''] ?? '#8b949e' }}
                            />
                            <span className="font-mono text-[10px] text-foreground/70 truncate group-hover:text-foreground transition-colors">
                                {repo.name}
                            </span>
                            <span className="ml-auto font-mono text-[9px] text-muted-foreground/40 shrink-0">
                                {relativeTime(repo.updated_at)}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}

function ProjectsPageSkeleton() {
    return (
        <div className="flex flex-col gap-12 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Skeleton className="h-64 rounded-xl" />
                <Skeleton className="h-64 rounded-xl" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-44 rounded-xl" />
                ))}
            </div>
        </div>
    )
}

export function ProjectsPage() {
    const statsQuery = useGitHubStats()
    const reposQuery = useGitHubRepos()

    const isLoading = statsQuery.isLoading || reposQuery.isLoading
    const isError = statsQuery.isError && reposQuery.isError

    if (isLoading) return <ProjectsPageSkeleton />

    if (isError) {
        return (
            <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
                <p className="text-lg font-medium">GitHub data unavailable</p>
                <p className="text-sm">Check back soon.</p>
            </div>
        )
    }

    const repos = reposQuery.data?.repos ?? []

    return (
        <div className="flex flex-col gap-12 pb-16">
            {/* Stats + Graph row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
            >
                {statsQuery.data && <GitHubStatsCard stats={statsQuery.data} />}

                {/* Contribution graph in window chrome */}
                <div className="rounded-xl border bg-card/40 overflow-hidden shadow-sm h-full flex flex-col">
                    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b bg-muted/40">
                        <span className="size-2.5 rounded-full bg-red-400/70" />
                        <span className="size-2.5 rounded-full bg-yellow-400/70" />
                        <span className="size-2.5 rounded-full bg-green-400/70" />
                        <span className="ml-auto font-mono text-[10px] text-muted-foreground/50">
                            activity.svg
                        </span>
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                        {reposQuery.data ? (
                            <div className="flex flex-col flex-1">
                                <ContributionGraph repos={reposQuery.data.repos} />
                                <ActivityCardContent repos={reposQuery.data.repos} />
                            </div>
                        ) : (
                            <Skeleton className="h-28 w-full" />
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Repos */}
            {repos.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-5"
                >
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50 mb-2">
                            featured repositories
                        </p>
                        <h2 className="font-hand font-bold text-3xl sm:text-4xl tracking-tight">
                            Recent Work.
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {repos.map((repo, i) => (
                            <RepoCard key={repo.name} repo={repo} index={i} />
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    )
}
