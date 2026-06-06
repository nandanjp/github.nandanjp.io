import { createFileRoute } from '@tanstack/react-router'
import { ProjectsPage } from '@/components/pages/projects/projects-page/projects-page'

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
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <p className="text-muted-foreground mb-4 font-mono text-xs tracking-[0.22em] uppercase">
                    [projects] — built &amp; shipped
                </p>
                <h1 className="font-hand mb-3 text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
                    Things I've Built.
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Open-source work and side projects. Stats pulled live from
                    GitHub.
                </p>
            </section>
            <ProjectsPage />
        </div>
    )
}
