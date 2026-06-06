'use client'

import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyHeading, EmptyBody, SectionLabel, SectionHeading } from '@/components/ui/typography'
import { GitHubStatsCard } from './GitHubStatsCard'
import { ActivityCard } from './ActivityCard'
import { RepoCard } from './RepoCard'
import type { GitHubStats, GitHubRepo } from '@/lib/api'

export function ProjectsContentSkeleton() {
    return (
        <div className="flex flex-col gap-12 pb-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Skeleton className="h-64 rounded-xl" />
                <Skeleton className="h-64 rounded-xl" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, skeletonIndex) => (
                    <Skeleton key={skeletonIndex} className="h-44 rounded-xl" />
                ))}
            </div>
        </div>
    )
}

interface ProjectsContentProps {
    stats: GitHubStats | null
    repos: GitHubRepo[]
}

export function ProjectsContent({ stats, repos }: ProjectsContentProps) {
    if (!stats && repos.length === 0) {
        return (
            <div className="flex flex-col items-center gap-2 py-16">
                <EmptyHeading>GitHub data unavailable.</EmptyHeading>
                <EmptyBody>Check back soon.</EmptyBody>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-12 pb-16">
            {/* Stats + Activity row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2"
            >
                {stats && <GitHubStatsCard stats={stats} />}
                <ActivityCard repos={repos} />
            </motion.div>

            {/* Repos grid */}
            {repos.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-5"
                >
                    <div>
                        <SectionLabel className="mb-2">featured repositories</SectionLabel>
                        <SectionHeading className="text-3xl sm:text-4xl">Recent Work.</SectionHeading>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {repos.map((repo, repoIndex) => (
                            <RepoCard key={repo.name} repo={repo} index={repoIndex} />
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    )
}
