import { Circle, Clock, GitBranch, Package } from 'lucide-react'
import { CardHeading, MonoText, SubLabel } from '@/components/ui/typography'
import { MacWindowHeader } from '@/components/ui/mac-card'
import { Card, CardContent } from '@/components/ui/card'
import { relativeTime } from '@/lib/utils'
import { LANGUAGE_COLORS } from './language-colors'
import { ContributionGraph } from './ContributionGraph'
import type { GitHubRepo } from '@/lib/api'

interface ActivityCardProps {
    repos: GitHubRepo[]
}

export function ActivityCard({ repos }: ActivityCardProps) {
    // eslint-disable-next-line react-hooks/purity
    const now = Date.now()
    const activeThisMonth = repos.filter(
        repo => now - new Date(repo.updated_at).getTime() < 30 * 86_400_000
    ).length
    const sorted = [...repos].sort(
        (repoA, repoB) =>
            new Date(repoB.updated_at).getTime() - new Date(repoA.updated_at).getTime()
    )
    const lastPush = sorted[0] ? relativeTime(sorted[0].updated_at) : '—'
    const recentRepos = sorted.slice(0, 5)

    return (
        <Card className="bg-card/40 flex h-full flex-col py-0 shadow-sm">
            {/* macOS window chrome */}
            <MacWindowHeader title="activity.svg" />

            <CardContent className="flex flex-1 flex-col p-4 sm:p-5">
                <ContributionGraph repos={repos} />

                <div className="border-foreground/8 mt-4 flex flex-1 flex-col border-t pt-4">
                    {/* Quick stats */}
                    <div className="mb-4 grid grid-cols-3 gap-2">
                        <div className="bg-background/40 border-foreground/8 flex flex-col items-center gap-0.5 rounded-lg border p-2">
                            <Package className="text-muted-foreground mb-0.5 size-3.5" />
                            <CardHeading className="text-lg leading-none">{repos.length}</CardHeading>
                            <MonoText>repos</MonoText>
                        </div>
                        <div className="bg-background/40 border-foreground/8 flex flex-col items-center gap-0.5 rounded-lg border p-2">
                            <GitBranch className="text-muted-foreground mb-0.5 size-3.5" />
                            <CardHeading className="text-lg leading-none">{activeThisMonth}</CardHeading>
                            <MonoText>this month</MonoText>
                        </div>
                        <div className="bg-background/40 border-foreground/8 flex flex-col items-center gap-0.5 rounded-lg border p-2">
                            <Clock className="text-muted-foreground mb-0.5 size-3.5" />
                            <CardHeading className="text-lg leading-none">{lastPush}</CardHeading>
                            <MonoText>last push</MonoText>
                        </div>
                    </div>

                    {/* Recent activity */}
                    <SubLabel className="mb-2">recent activity</SubLabel>
                    <div className="flex flex-col gap-1.5">
                        {recentRepos.map(repo => (
                            <a
                                key={repo.name}
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2"
                            >
                                <Circle
                                    className="size-3 shrink-0 fill-current"
                                    style={{
                                        color: LANGUAGE_COLORS[repo.language ?? ''] ?? '#8b949e'
                                    }}
                                />
                                <MonoText className="text-foreground/70 group-hover:text-foreground truncate text-sm transition-colors">
                                    {repo.name}
                                </MonoText>
                                <MonoText className="ml-auto shrink-0">
                                    {relativeTime(repo.updated_at)}
                                </MonoText>
                            </a>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
