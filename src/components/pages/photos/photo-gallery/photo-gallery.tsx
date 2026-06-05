import { useState } from 'react'
import { usePhotos } from '@/hooks/use-photos'
import { Skeleton } from '@/components/ui/skeleton'
import type { Photo } from '@/lib/api'
import { PhotoGrid } from './components/photo-grid'
import { PhotoLightbox } from './components/photo-lightbox'

function PhotoGallerySkeleton() {
    return (
        <div className="gap-4 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="w-full aspect-[4/3] rounded-xl" />
            ))}
        </div>
    )
}

export function PhotoGallery() {
    const { data, isLoading, isError } = usePhotos()
    const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null)

    const photos = data?.photos ?? []
    const currentIndex = lightboxPhoto
        ? photos.findIndex(p => p.key === lightboxPhoto.key)
        : -1

    function handlePrev() {
        if (currentIndex > 0) setLightboxPhoto(photos[currentIndex - 1]!)
    }

    function handleNext() {
        if (currentIndex < photos.length - 1)
            setLightboxPhoto(photos[currentIndex + 1]!)
    }

    if (isLoading) return <PhotoGallerySkeleton />

    if (isError || photos.length === 0) {
        return (
            <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
                <p className="text-lg font-medium">No photos yet</p>
                <p className="text-sm">Check back soon.</p>
            </div>
        )
    }

    return (
        <>
            <p className="font-mono text-[10px] text-muted-foreground/40 mb-6">
                {photos.length} photos
            </p>
            <PhotoGrid photos={photos} onPhotoClick={setLightboxPhoto} />
            {lightboxPhoto && (
                <PhotoLightbox
                    photo={lightboxPhoto}
                    total={photos.length}
                    currentIndex={currentIndex}
                    onClose={() => setLightboxPhoto(null)}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}
        </>
    )
}
