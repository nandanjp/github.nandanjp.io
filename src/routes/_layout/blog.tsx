import { createFileRoute } from '@tanstack/react-router'
import { BlogList } from '@/components/pages/blog/blog-list/blog-list'

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
                <p className="text-muted-foreground mb-4 font-mono text-xs tracking-[0.22em] uppercase">
                    [blog] — thoughts &amp; writing
                </p>
                <h1 className="font-hand mb-3 text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
                    Writing.
                    <br />
                    Sometimes.
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    On software, systems, and whatever else I find interesting
                    enough to write down.
                </p>
            </section>
            <BlogList />
        </div>
    )
}
