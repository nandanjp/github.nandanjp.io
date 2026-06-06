import { createFileRoute } from '@tanstack/react-router'
import { ProjectsPage } from '@/components/pages/projects/projects-page/projects-page'
import { PageHeading, SectionLabel } from '@/components/ui/typography'

export const Route = createFileRoute('/_layout/projects')({
    component: ProjectsRoute,
    head: () => ({
        meta: [
            { title: 'Projects — Nandan Patel' },
            {
                name: 'description',
                content: 'Open-source projects and GitHub activity.'
            }
        ]
    })
})

function ProjectsRoute() {
    return (
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <SectionLabel className="mb-4">[projects] — built &amp; shipped</SectionLabel>
                <PageHeading className="mb-3">
                    Things I've Built.
                </PageHeading>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Open-source work and side projects. Stats pulled live from
                    GitHub.
                </p>
            </section>
            <ProjectsPage />
        </div>
    )
}
