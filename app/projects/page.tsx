import type { Metadata } from 'next'
import { Suspense } from 'react'
import { api } from '@/lib/api'
import { SITE } from '@/content/site'
import { SectionLabel, PageHeading, BodyText } from '@/components/ui/typography'
import { ProjectsContent, ProjectsContentSkeleton } from './components/ProjectsContent'

export const revalidate = 3600

export const metadata: Metadata = {
    title: 'Projects — Nandan Patel',
    description: SITE.projects.sub
}

export default async function ProjectsPage() {
    const [statsResult, reposResult] = await Promise.allSettled([
        api.github.stats(),
        api.github.repos()
    ])

    const stats = statsResult.status === 'fulfilled' ? statsResult.value : null
    const repos = reposResult.status === 'fulfilled' ? reposResult.value.repos : []

    return (
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <SectionLabel className="mb-4">{SITE.projects.label}</SectionLabel>
                <PageHeading className="mb-3">{SITE.projects.heading}</PageHeading>
                <BodyText>{SITE.projects.sub}</BodyText>
            </section>
            <Suspense fallback={<ProjectsContentSkeleton />}>
                <ProjectsContent stats={stats} repos={repos} />
            </Suspense>
        </div>
    )
}
