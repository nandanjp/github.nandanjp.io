import { createFileRoute } from '@tanstack/react-router'
import { ProjectsPage } from '@/components/pages/projects/projects-page/projects-page'

export const Route = createFileRoute('/_layout/projects')({ component: ProjectsRoute })

function ProjectsRoute() {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
            <section className="pt-16 pb-10 mb-10 border-b">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50 mb-4">
                    [projects] — built &amp; shipped
                </p>
                <h1 className="font-hand font-bold text-5xl sm:text-6xl tracking-tight leading-[1.05] mb-3">
                    Things I've Built.
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Open-source work and side projects. Stats pulled live from GitHub.
                </p>
            </section>
            <ProjectsPage />
        </div>
    )
}
