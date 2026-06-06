import { createFileRoute } from '@tanstack/react-router'
import { MusicPage } from '@/components/pages/music/music-page/music-page'

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
        <div className="mx-auto w-full max-w-2xl px-6 pb-16 sm:px-8 md:px-10">
            <section className="mb-10 border-b pt-16 pb-10">
                <p className="text-muted-foreground mb-4 font-mono text-xs tracking-[0.22em] uppercase">
                    [music] — on repeat
                </p>
                <h1 className="font-hand mb-3 text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
                    On Rotation.
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    What I've been listening to. Click the album art to hear a
                    preview.
                </p>
            </section>
            <MusicPage />
        </div>
    )
}
