import { createFileRoute } from '@tanstack/react-router'
import { BlogList } from '@/components/pages/blog/blog-list/blog-list'
import { PageHeading, SectionLabel } from '@/components/ui/typography'

export const Route = createFileRoute('/_layout/blog')({
    component: BlogRoute,
    head: () => ({
        meta: [
            { title: 'Blog — Nandan Patel' },
            {
                name: 'description',
                content:
                    'Writing on systems design, Go, TypeScript, Kubernetes, and web development.'
            }
        ]
    })
})

function BlogRoute() {
    return (
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <SectionLabel className="mb-4">[blog] — thoughts &amp; writing</SectionLabel>
                <PageHeading className="mb-3">
                    Writing.
                    <br />
                    Sometimes.
                </PageHeading>
                <p className="text-muted-foreground text-sm sm:text-base">
                    On software, systems, and whatever else I find interesting
                    enough to write down.
                </p>
            </section>
            <BlogList />
        </div>
    )
}
