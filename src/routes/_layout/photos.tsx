import { createFileRoute } from '@tanstack/react-router'
import { PhotoGallery } from '@/components/pages/photos/photo-gallery/photo-gallery'

export const Route = createFileRoute('/_layout/photos')({
    component: PhotosRoute,
    head: () => ({ meta: [{ title: 'Photos — Nandan Patel' }, { name: 'description', content: 'A personal photo gallery.' }] }),
})

function PhotosRoute() {
    return (
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 pb-16">
            <section className="pt-16 pb-10 mb-10 border-b">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
                    [photos] — captured moments
                </p>
                <h1 className="font-hand font-bold text-5xl sm:text-6xl tracking-tight leading-[1.05] mb-3">
                    Through the Lens.
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Scenes and subjects I found worth capturing, mostly candid and always personal.
                </p>
            </section>
            <PhotoGallery />
        </div>
    )
}
