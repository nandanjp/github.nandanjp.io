import type { Metadata } from 'next'
import { SITE } from '@/content/site'
import { SectionLabel, PageHeading, BodyText } from '@/components/ui/typography'
import { ProjectsContent } from './components/ProjectsContent'

export const metadata: Metadata = {
    title: 'Projects — Nandan Patel',
    description: SITE.projects.sub
}

export default function ProjectsPage() {
    return (
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <SectionLabel className="mb-4">{SITE.projects.label}</SectionLabel>
                <PageHeading className="mb-3">{SITE.projects.heading}</PageHeading>
                <BodyText>{SITE.projects.sub}</BodyText>
            </section>
            <ProjectsContent />
        </div>
    )
}
