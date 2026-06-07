import type { Metadata } from 'next'
import { Suspense } from 'react'
import { api } from '@/lib/api'
import { SITE } from '@/content/site'
import { SectionLabel, PageHeading, BodyText } from '@/components/ui/typography'
import { PhotoGallery, PhotoGallerySkeleton } from './components/PhotoGallery'

export const metadata: Metadata = {
    title: 'Photos — Nandan Patel',
    description: SITE.photos.sub
}

async function PhotosData() {
    const result = await Promise.allSettled([api.photos.list()])
    const photos = result[0].status === 'fulfilled' ? result[0].value.photos : []
    return <PhotoGallery photos={photos} />
}

export default function PhotosPage() {
    return (
        <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <SectionLabel className="mb-4">{SITE.photos.label}</SectionLabel>
                <PageHeading className="mb-3">{SITE.photos.heading}</PageHeading>
                <BodyText>{SITE.photos.sub}</BodyText>
            </section>
            <Suspense fallback={<PhotoGallerySkeleton />}>
                <PhotosData />
            </Suspense>
        </div>
    )
}
