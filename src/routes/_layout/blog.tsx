import { createFileRoute } from '@tanstack/react-router'
import { BlogList } from '@/components/pages/blog/blog-list/blog-list'

export const Route = createFileRoute('/_layout/blog')({
    component: BlogRoute,
    head: () => ({ meta: [{ title: 'Blog — Nandan Patel' }, { name: 'description', content: 'Writing on systems design, Go, TypeScript, Kubernetes, and web development.' }] }),
})

function BlogRoute() {
    return (
        <div className="mx-auto w-full max-w-2xl px-6 sm:px-8 md:px-10">
            <section className="pt-16 pb-10 mb-10 border-b">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50 mb-4">
                    [blog] — thoughts &amp; writing
                </p>
                <h1 className="font-hand font-bold text-5xl sm:text-6xl tracking-tight leading-[1.05] mb-3">
                    Writing.<br />Sometimes.
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    On software, systems, and whatever else I find interesting enough to write down.
                </p>
            </section>
            <BlogList />
        </div>
    )
}
