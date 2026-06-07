import type { Metadata } from 'next'
import { Suspense } from 'react'
import { api } from '@/lib/api'
import { SITE } from '@/content/site'
import { SectionLabel, PageHeading, BodyText } from '@/components/ui/typography'
import { MusicContent, TrackGridSkeleton } from './components/MusicContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Music — Nandan Patel',
    description: SITE.music.sub
}

async function MusicData() {
    const result = await Promise.allSettled([api.music.list()])
    const tracks = result[0].status === 'fulfilled' ? result[0].value.tracks : []
    return <MusicContent tracks={tracks} />
}

export default function MusicPage() {
    return (
        <div className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6 md:px-8">
            <section className="mb-10 border-b pt-16 pb-10">
                <SectionLabel className="mb-4">{SITE.music.label}</SectionLabel>
                <PageHeading className="mb-3">{SITE.music.heading}</PageHeading>
                <BodyText>{SITE.music.sub}</BodyText>
            </section>
            <Suspense fallback={<TrackGridSkeleton />}>
                <MusicData />
            </Suspense>
        </div>
    )
}
