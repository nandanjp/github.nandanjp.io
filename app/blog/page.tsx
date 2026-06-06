import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { PageHeading, SectionLabel, BodyText } from '@/components/ui/typography'
import { BlogList } from './components/BlogList'

export const metadata: Metadata = {
    title: 'Blog — Nandan Patel',
    description:
        'Writing on systems design, Go, TypeScript, Kubernetes, and web development.'
}

export default async function BlogPage() {
    const posts = await getAllPosts()

    return (
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <SectionLabel className="mb-4">[blog] — thoughts &amp; writing</SectionLabel>
                <PageHeading className="mb-3">
                    Writing.
                    <br />
                    Sometimes.
                </PageHeading>
                <BodyText>
                    On software, systems, and whatever else I find interesting
                    enough to write down.
                </BodyText>
            </section>
            <BlogList posts={posts} />
        </div>
    )
}
