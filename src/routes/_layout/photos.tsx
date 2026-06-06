import { createFileRoute } from '@tanstack/react-router'
import { PhotoGallery } from '@/components/pages/photos/photo-gallery/photo-gallery'

export const Route = createFileRoute('/_layout/photos')({
    component: PhotosRoute,
    head: () => ({
        meta: [
            { title: 'Photos — Nandan Patel' },
            { name: 'description', content: 'A personal photo gallery.' }
        ]
    })
})

function PhotosRoute() {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <p className="text-muted-foreground mb-4 font-mono text-xs tracking-[0.22em] uppercase">
                    [photos] — captured moments
                </p>
                <h1 className="font-hand mb-3 text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
                    Through the Lens.
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Scenes and subjects I found worth capturing, mostly candid
                    and always personal.
                </p>
            </section>
            <PhotoGallery />
        </div>
    )
}
