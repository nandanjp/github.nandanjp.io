import type { Metadata } from 'next'
import { SITE } from '@/content/site'
import { SectionLabel, PageHeading, BodyText } from '@/components/ui/typography'
import { PhotoGallery } from './components/PhotoGallery'

export const metadata: Metadata = {
    title: 'Photos — Nandan Patel',
    description: SITE.photos.sub
}

export default function PhotosPage() {
    return (
        <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 md:px-8">
            {/* Start API + image CDN connections before useQuery fires */}
            <link rel="preconnect" href="https://personal-api.nandan-hl.dev" />
            <link rel="preconnect" href="https://photos.nandan-hl.dev" />
            <section className="mb-10 border-b pt-16 pb-10">
                <SectionLabel className="mb-4">{SITE.photos.label}</SectionLabel>
                <PageHeading className="mb-3">{SITE.photos.heading}</PageHeading>
                <BodyText>{SITE.photos.sub}</BodyText>
            </section>
            <PhotoGallery />
        </div>
    )
}
