import { createFileRoute } from '@tanstack/react-router'
import { MusicPage } from '@/components/pages/music/music-page/music-page'
import { PageHeading, SectionLabel } from '@/components/ui/typography'

export const Route = createFileRoute('/_layout/music')({
    component: MusicRoute,
    head: () => ({
        meta: [
            { title: 'Music — Nandan Patel' },
            {
                name: 'description',
                content: "Top tracks and what's on heavy rotation."
            }
        ]
    })
})

function MusicRoute() {
    return (
        <div className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <SectionLabel className="mb-4">[music] — on repeat</SectionLabel>
                <PageHeading className="mb-3">
                    On Rotation.
                </PageHeading>
                <p className="text-muted-foreground text-sm sm:text-base">
                    What I've been listening to lately.
                </p>
            </section>
            <MusicPage />
        </div>
    )
}
