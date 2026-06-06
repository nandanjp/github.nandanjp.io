'use client'

import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { MonoText } from '@/components/ui/typography'
import { EmptyHeading, EmptyBody } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { PhotoGrid } from './PhotoGrid'
import { PhotoLightbox } from './PhotoLightbox'
import type { Photo } from '@/lib/api'

const SKELETON_STRIP_THEMES = [
    'bg-sky-100/80 dark:bg-sky-950/40',
    'bg-violet-100/80 dark:bg-violet-950/40',
    'bg-emerald-100/80 dark:bg-emerald-950/40',
    'bg-rose-100/80 dark:bg-rose-950/40',
    'bg-amber-100/80 dark:bg-amber-950/40',
    'bg-teal-100/80 dark:bg-teal-950/40'
]

export function PhotoGallerySkeleton() {
    return (
        <div className="grid grid-cols-2 justify-items-center gap-6 md:grid-cols-3 lg:gap-8">
            {Array.from({ length: 8 }).map((_, skeletonIndex) => (
                <div
                    key={skeletonIndex}
                    className="w-full max-w-[280px] overflow-hidden rounded-[3px] bg-white shadow-[0_3px_14px_rgba(0,0,0,0.13)] dark:bg-zinc-900 dark:shadow-[0_3px_14px_rgba(0,0,0,0.45)]"
                >
                    <div className="p-2 pb-1.5">
                        <Skeleton className="aspect-square w-full rounded-[1px]" />
                    </div>
                    <div className={cn('h-8', SKELETON_STRIP_THEMES[skeletonIndex % SKELETON_STRIP_THEMES.length])} />
                </div>
            ))}
        </div>
    )
}

interface PhotoGalleryProps {
    photos: Photo[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
    const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null)

    if (photos.length === 0) {
        return (
            <div className="flex flex-col items-center gap-2 py-16">
                <EmptyHeading>No photos yet.</EmptyHeading>
                <EmptyBody>Check back soon.</EmptyBody>
            </div>
        )
    }

    const currentIndex = lightboxPhoto
        ? photos.findIndex(photo => photo.key === lightboxPhoto.key)
        : -1

    function prefetchPhoto(url: string) {
        const img = new window.Image()
        img.src = url
    }

    function handlePrev() {
        if (currentIndex > 0) {
            setLightboxPhoto(photos[currentIndex - 1])
            if (currentIndex - 2 >= 0) prefetchPhoto(photos[currentIndex - 2].url)
        }
    }

    function handleNext() {
        if (currentIndex < photos.length - 1) {
            setLightboxPhoto(photos[currentIndex + 1])
            if (currentIndex + 2 < photos.length) prefetchPhoto(photos[currentIndex + 2].url)
        }
    }

    return (
        <>
            <MonoText className="mb-6 block">{photos.length} photos</MonoText>
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
