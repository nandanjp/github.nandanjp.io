import { createFileRoute } from '@tanstack/react-router'
import { WorkPage } from '@/components/pages/work/work-page'
import { SITE } from '@/content/site'
import { PageHeading, SectionLabel } from '@/components/ui/typography'

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
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <SectionLabel className="mb-4">{SITE.work.label}</SectionLabel>
                <PageHeading className="mb-3">
                    {SITE.work.heading}
                </PageHeading>
                <p className="text-muted-foreground text-sm sm:text-base">
                    {SITE.work.sub}
                </p>
            </section>
            <div className="pb-16">
                <WorkPage />
            </div>
        </div>
    )
}
