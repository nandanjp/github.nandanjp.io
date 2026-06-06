import { createFileRoute } from '@tanstack/react-router'
import { PhotoGallery } from '@/components/pages/photos/photo-gallery/photo-gallery'
import { PageHeading, SectionLabel } from '@/components/ui/typography'

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
        <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <SectionLabel className="mb-4">[photos] — captured moments</SectionLabel>
                <PageHeading className="mb-3">
                    Through the Lens.
                </PageHeading>
                <p className="text-muted-foreground text-sm sm:text-base">
                    Scenes and subjects I found worth capturing, mostly candid
                    and always personal.
                </p>
            </section>
            <PhotoGallery />
        </div>
    )
}
