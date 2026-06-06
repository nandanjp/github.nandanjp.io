import { createFileRoute } from '@tanstack/react-router'
import { WorkPage } from '@/components/pages/work/work-page'
import { SITE } from '@/content/site'

export const Route = createFileRoute('/_layout/work')({
    component: WorkRoute,
    head: () => ({
        meta: [
            { title: 'Work — Nandan Patel' },
            { name: 'description', content: 'Work experience and projects.' }
        ]
    })
})

function WorkRoute() {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <p className="text-muted-foreground mb-4 font-mono text-xs tracking-[0.22em] uppercase">
                    {SITE.work.label}
                </p>
                <h1 className="font-hand mb-3 text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
                    {SITE.work.heading}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    {SITE.work.sub}
                </p>
            </section>
            <div className="mx-auto max-w-2xl pb-16">
                <WorkPage />
            </div>
        </div>
    )
}
