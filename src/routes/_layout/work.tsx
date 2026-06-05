import { createFileRoute } from '@tanstack/react-router'
import { WorkPage } from '@/components/pages/work/work-page'
import { SITE } from '@/content/site'

export const Route = createFileRoute('/_layout/work')({
    component: WorkRoute,
    head: () => ({ meta: [{ title: 'Work — Nandan Patel' }, { name: 'description', content: 'Work experience and projects.' }] }),
})

function WorkRoute() {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
            <section className="pt-16 pb-10 mb-10 border-b">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
                    {SITE.work.label}
                </p>
                <h1 className="font-hand font-bold text-5xl sm:text-6xl tracking-tight leading-[1.05] mb-3">
                    {SITE.work.heading}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    {SITE.work.sub}
                </p>
            </section>
            <div className="max-w-2xl mx-auto pb-16">
                <WorkPage />
            </div>
        </div>
    )
}
