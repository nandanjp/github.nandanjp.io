import { motion } from 'framer-motion'
import { Circle, Clock, GitBranch, Package } from 'lucide-react'
import { GitHubStatsCard } from './components/github-stats'
import { RepoCard } from './components/repo-card'
import { ContributionGraph } from './components/contribution-graph'
import type { GitHubRepo } from '@/lib/api'
import { useGitHubRepos, useGitHubStats } from '@/hooks/use-github'
import { Skeleton } from '@/components/ui/skeleton'

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
    Swift: '#F05138'
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
    const activeThisMonth = repos.filter(
        r => now - new Date(r.updated_at).getTime() < 30 * 86400000
    ).length
    const sorted = [...repos].sort(
        (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    const lastPush = sorted[0] ? relativeTime(sorted[0].updated_at) : '—'
    const recent = sorted.slice(0, 5)

    return (
        <>
            {/* Divider + quick stats */}
            <div className="border-foreground/8 mt-4 flex flex-1 flex-col border-t pt-4">
                <div className="mb-4 grid grid-cols-3 gap-2">
                    <div className="bg-background/40 border-foreground/8 flex flex-col items-center gap-0.5 rounded-lg border p-2">
                        <Package className="text-muted-foreground mb-0.5 size-3.5" />
                        <span className="font-hand text-lg leading-none font-bold">
                            {repos.length}
                        </span>
                        <span className="text-muted-foreground font-mono text-xs">
                            repos
                        </span>
                    </div>
                    <div className="bg-background/40 border-foreground/8 flex flex-col items-center gap-0.5 rounded-lg border p-2">
                        <GitBranch className="text-muted-foreground mb-0.5 size-3.5" />
                        <span className="font-hand text-lg leading-none font-bold">
                            {activeThisMonth}
                        </span>
                        <span className="text-muted-foreground font-mono text-xs">
                            this month
                        </span>
                    </div>
                    <div className="bg-background/40 border-foreground/8 flex flex-col items-center gap-0.5 rounded-lg border p-2">
                        <Clock className="text-muted-foreground mb-0.5 size-3.5" />
                        <span className="font-hand text-lg leading-none font-bold">
                            {lastPush}
                        </span>
                        <span className="text-muted-foreground font-mono text-xs">
                            last push
                        </span>
                    </div>
                </div>

                {/* Recent activity list */}
                <p className="text-muted-foreground mb-2 font-mono text-xs tracking-[0.18em] uppercase">
                    recent activity
                </p>
                <div className="flex flex-col gap-1.5">
                    {recent.map(repo => (
                        <a
                            key={repo.name}
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2"
                        >
                            <Circle
                                className="size-2 shrink-0 fill-current"
                                style={{
                                    color:
                                        LANGUAGE_COLORS[repo.language ?? ''] ??
                                        '#8b949e'
                                }}
                            />
                            <span className="text-foreground/70 group-hover:text-foreground truncate font-mono text-xs transition-colors">
                                {repo.name}
                            </span>
                            <span className="text-muted-foreground ml-auto shrink-0 font-mono text-xs">
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
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Skeleton className="h-64 rounded-xl" />
                <Skeleton className="h-64 rounded-xl" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
            <div className="text-muted-foreground flex flex-col items-center gap-2 py-16">
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
                className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2"
            >
                {statsQuery.data && <GitHubStatsCard stats={statsQuery.data} />}

                {/* Contribution graph in window chrome */}
                <div className="bg-card/40 flex h-full flex-col overflow-hidden rounded-xl border shadow-sm">
                    <div className="bg-muted/40 flex items-center gap-1.5 border-b px-4 py-2.5">
                        <span className="size-2.5 rounded-full bg-red-400/70" />
                        <span className="size-2.5 rounded-full bg-yellow-400/70" />
                        <span className="size-2.5 rounded-full bg-green-400/70" />
                        <span className="text-muted-foreground ml-auto font-mono text-xs">
                            activity.svg
                        </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                        {reposQuery.data ? (
                            <div className="flex flex-1 flex-col">
                                <ContributionGraph
                                    repos={reposQuery.data.repos}
                                />
                                <ActivityCardContent
                                    repos={reposQuery.data.repos}
                                />
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
                    transition={{
                        duration: 0.5,
                        delay: 0.15,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    className="flex flex-col gap-5"
                >
                    <div>
                        <p className="text-muted-foreground mb-2 font-mono text-xs tracking-[0.22em] uppercase">
                            featured repositories
                        </p>
                        <h2 className="font-hand text-3xl font-bold tracking-tight sm:text-4xl">
                            Recent Work.
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {repos.map((repo, i) => (
                            <RepoCard key={repo.name} repo={repo} index={i} />
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    )
}
