import { useState } from 'react'
import { PhotoGrid } from './components/photo-grid'
import { PhotoLightbox } from './components/photo-lightbox'
import type { Photo } from '@/lib/api'
import { usePhotos } from '@/hooks/use-photos'
import { netlifyTransformer } from '@/lib/image'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const STRIP_THEMES = [
    'bg-sky-100/80 dark:bg-sky-950/40',
    'bg-violet-100/80 dark:bg-violet-950/40',
    'bg-emerald-100/80 dark:bg-emerald-950/40',
    'bg-rose-100/80 dark:bg-rose-950/40',
    'bg-amber-100/80 dark:bg-amber-950/40',
    'bg-teal-100/80 dark:bg-teal-950/40'
]

function PhotoGallerySkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="overflow-hidden rounded-[3px] bg-white shadow-[0_3px_14px_rgba(0,0,0,0.13)] dark:bg-zinc-900 dark:shadow-[0_3px_14px_rgba(0,0,0,0.45)]"
                >
                    <div className="p-2 pb-1.5">
                        <Skeleton className="aspect-[4/3] w-full rounded-[1px]" />
                    </div>
                    <div
                        className={cn(
                            'h-8',
                            STRIP_THEMES[i % STRIP_THEMES.length]
                        )}
                    />
                </div>
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

    function prefetchPhoto(url: string) {
        const src = netlifyTransformer?.(url, { width: 1400 }) ?? url
        const img = new window.Image()
        img.src = src
    }

    function handlePrev() {
        if (currentIndex > 0) {
            setLightboxPhoto(photos[currentIndex - 1])
            if (currentIndex - 2 >= 0)
                prefetchPhoto(photos[currentIndex - 2].url)
        }
    }

    function handleNext() {
        if (currentIndex < photos.length - 1) {
            setLightboxPhoto(photos[currentIndex + 1])
            if (currentIndex + 2 < photos.length)
                prefetchPhoto(photos[currentIndex + 2].url)
        }
    }

    if (isLoading) return <PhotoGallerySkeleton />

    if (isError || photos.length === 0) {
        return (
            <div className="text-muted-foreground flex flex-col items-center gap-2 py-16">
                <p className="text-lg font-medium">No photos yet</p>
                <p className="text-sm">Check back soon.</p>
            </div>
        )
    }

    return (
        <>
            <p className="text-muted-foreground mb-6 font-mono text-xs">
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
