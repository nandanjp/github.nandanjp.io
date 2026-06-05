import { createFileRoute } from '@tanstack/react-router'
import { MusicPage } from '@/components/pages/music/music-page/music-page'

export const Route = createFileRoute('/_layout/music')({
    component: MusicRoute,
    head: () => ({ meta: [{ title: 'Music — Nandan Patel' }, { name: 'description', content: "Top tracks and what's on heavy rotation." }] }),
})

function MusicRoute() {
    return (
        <div className="mx-auto w-full max-w-2xl px-6 sm:px-8 md:px-10 pb-16">
            <section className="pt-16 pb-10 mb-10 border-b">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
                    [music] — on repeat
                </p>
                <h1 className="font-hand font-bold text-5xl sm:text-6xl tracking-tight leading-[1.05] mb-3">
                    On Rotation.
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    What I've been listening to. Click the album art to hear a preview.
                </p>
            </section>
            <MusicPage />
        </div>
    )
}
